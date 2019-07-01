import React, { Component } from 'react'
import axios from 'axios';
import { BASE_LOCAL_ENDPOINT } from "../constants";
import { Redirect } from "react-router-dom";
import styled from 'styled-components';

const AllPage = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    height: 100%;
`;

//Employee Card Info
const CardForm = styled.form`
    box-shadow: 0 4px 8px 0 rgba(98,229,44,1);
    transition: 0.3s;
    border: 2px solid #253746;
    border-radius: 50px;
    width: 30%;
    align-self: center;
    margin-bottom: 10px;
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(98,229,44,5);
    }
    @media screen and (max-width: 758px){
            width:50%;
    }
    @media screen and (max-width: 520px){
            width:60%;
    }
    @media screen and (max-width: 424px){
            width:60%;
    }

`;

const Img = styled.img`
    margin-top: 20px;
    margin-bottom: 20px;
    display: block;
    margin-left:auto;
    margin-right:auto;
    width: 200px;
    height: 200px;
    border: 2px solid;
    border-radius: 10px;
    &:hover{    
    border: 3px solid #62E52C;
    }
`;

const TitleStyle = styled.h1`
    text-align: center;
    color: #62E52C;
    margin-bottom: 20px;
`;

const Container = styled.div`
    padding: 2px 16px;
    display: flex;
    flex-direction: column;
    overflow: none;
    margin-bottom: 20px;
`;

const LabelStyle = styled.label`
    display: block;
    color: #253746;
    text-align: center;
    padding-right: 10px;
    text-transform: capitalize;
`;

const InputButton = styled.input`
    margin-top: 10px;
    margin-left: 25%;
    margin-right: 25%;
    color: #62E52C;
    background: #253746;
    border: 2px solid #253746;
    border-radius: 20px;
`;

const ButtonDel = styled.button`
    margin-top: 10px;
    margin-left: 25%;
    margin-right: 25%;
    color: #62E52C;
    background: #253746;
    border: 2px solid #253746;
    border-radius: 20px;
`;

const InputEdi = styled.input`
    color: #253746;
    text-align: center;
    border: 2px solid #253746;
    transition: 0.6s;
    margin-right:2px;
    font-family:Georgia, 'Times New Roman', Times, serif;
    &::placeholder{
        color: #62E52C;
        text-transform:capitalize;

    }
    &:active, &:focus{
        border: 2px solid #62E52C;
    }
`;

export default class prizesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prizes: {
                imgSrc: "",
                name: "",
                description: "",
                points: 0,
                redirect: false  //States false the Redirect in render
            },
            imgSrc2: "",
            name2: "",
            points2: "",
            description2: "",
            error: "",
            look: "hidden",
            lookButton: "button",
            lookAccept: "hidden",
            prizeError: false
        }
    }

    //gets The prize with the id that was clicked from the db
    componentDidMount = () => {
        this.getPrize();
    }

    getPrize = () => {
        const { match: { params: { id } } } = this.props;
        axios.get(`${BASE_LOCAL_ENDPOINT}/prizes/${id}`)
            .then(response => {
                this.setState({
                    prizes: response.data,
                    error: ''
                })
            })
            .catch(error => {
                this.setState({
                    error: error.message
                })
            })
    }

    //Edits the worker
    editPrize = (e) => {
        e.preventDefault();
        const {
            imgSrc2,
            name2,
            points2,
            description2
        } = this.state;

        const { match: { params: { id } } } = this.props;    //gets the id from the props
        axios.put(`${BASE_LOCAL_ENDPOINT}/prizes/${id}`, {
            imgSrc: imgSrc2,
            name: name2,
            points: points2,
            description: description2
        }, {
                headers: { "Content-Type": "application/json" }
            })
            .then(() => { this.getPrize() })
            .catch(() => { this.setState({ error: true }) })

        this.setState({
            look: "hidden",
            lookButton: "button",
            lookAccept: "hidden"
        })

    }

    //Deleate Prize form db
    deleatePrize = (e) => {
        e.preventDefault();
        const { match: { params: { id } } } = this.props;    //gets the id from the props
        axios.delete(`${BASE_LOCAL_ENDPOINT}/prizes/${id}`)  //deleats the worker with the same id
            .then(() => {
                // this.getWorker()      //Don't need it because im redirecting
                this.setState({
                    prizes: {         // When the button is used turns
                        redirect: true   // redirect in true so it leaves 
                    }
                })
            })
            .catch(() => { this.setState({ prizeError: true }) })
    }

    //Function to change visibility
    change = (e) => {
        e.preventDefault();
        if (this.state.look === "hidden") {
            this.setState({
                look: "text",
                lookButton: "hidden",
                lookAccept: "button"
            })
        } else {
            this.setState({
                look: "hidden",
                lookButton: "button",
                lookAccept: "hidden"
            })
        }
    }

    // Input text for the update worker 
    inputTextChange = (e, keyText) => {
        const value = e.target.value;
        this.setState({ [keyText]: value })
    }

    //Label 
    labelField = (label, value) => (
        <LabelStyle>
            <b>{label}</b>{value}
        </LabelStyle>
    )

    //input
    inputField = (value, field, field2, look) => (
        <InputEdi
            type={look}        /* Send the property (hidden o text) */
            onChange={(e) => this.inputTextChange(e, field2)}
            name="name"
            value={value}
            placeholder={field}
            required
        />
    )

    render() {
        const {
            prizes: {
                imgSrc,
                name,
                description,
                points,
                redirect
            },
            look,
            lookButton,
            lookAccept
        } = this.state;

        const {
            imgSrc2,
            name2,
            description2,
            points2
        } = this.state.prizes

        return (

            <AllPage>
                {/* // Redirect so it doesn't print and leaves to employees */}
                {redirect && <Redirect to='/prizes' />}
                <TitleStyle>Prize</TitleStyle>
                <CardForm className="field-group">
                    <Img src={imgSrc} alt="" />
                    <Container>
                        {this.inputField(imgSrc2, imgSrc, "imgSrc2", look)}
                        
                        {this.labelField("Name: ", name)}
                        {this.inputField(name2, name, "name2", look)}
                        
                        {this.labelField("Description: ", description)}
                        {this.inputField(description2, description, "description2", look)}
                        
                        {this.labelField("Points: ", points)}
                        {this.inputField(points2, name, "points2", look)}
                        
                        <ButtonDel onClick={(e) => this.deleatePrize(e)}>Delete</ButtonDel>
                        <InputButton type={lookButton} value="Edit" onClick={(e) => this.change(e)}></InputButton>
                        <InputButton type={lookAccept} value="Accept!" onClick={(e) => this.editPrize(e)}></InputButton>
                    </Container>
                </CardForm>
            </AllPage>
        );
    }
}
