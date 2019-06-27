import React, { Component } from 'react'
import axios from 'axios';
import { BASE_LOCAL_ENDPOINT } from "../constants";
import { Redirect } from "react-router-dom";

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
            description:description2
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
        <label>
            <b>{label}</b>{value}
        </label>
    )

    //input
    inputField = (value, field, field2, look) => (
        <input
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
        }=this.state.prizes

        return (
            <div >
                {/* // Redirect so it doesn't print and leaves to employees */}
                {redirect && <Redirect to='/prizes' />}
                <form className="field-group">
                    <h1>Prize</h1>
                    <img src={imgSrc} alt="" />
                    {this.inputField(imgSrc2, imgSrc, "imgSrc2", look)}
                    {this.labelField("Name: ", name)}
                    {this.inputField(name2, name, "name2", look)}
                    {this.labelField("Description: ", description)}
                    {this.inputField(description2, description, "description2", look)}
                    {this.labelField("Points: ", points)}
                    {this.inputField(points2, name, "points2", look)}
                    <button onClick={(e) => this.deleatePrize(e)}>Delete</button>
                    <input type={lookButton} value="Edit" onClick={(e) => this.change(e)}></input>
                    <input type={lookAccept} value="Accept!" onClick={(e) => this.editPrize(e)}></input>
                </form>
            </div>
        );
    }
}
