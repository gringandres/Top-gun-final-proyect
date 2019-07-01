import React, { Component } from 'react'
import axios from 'axios';
import Achieve from '../Components2/Achieve';
import styled from 'styled-components';
import { BASE_LOCAL_ENDPOINT } from "../constants";
import { Collapse, CardBody, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// Font Awesome
const element = <FontAwesomeIcon icon={faSearch} />

//Flex
const AchieveFlex = styled.div`
    padding: 2px 16px;
    display: flex;
    flex-direction: column;
    overflow: none;
    margin: 20px 15% 20px 30%;
    border: 2px solid #253746;
    box-shadow: 0 4px 8px 0 rgba(98,229,44,1);
    width: 40%;
    border-radius: 30px;
    background-color: #253746;
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(98,229,44,5);
    }
`;


//Search
const Search = styled.input`
    border: none;
    background: none;
    outline: none;
    float: left;
    padding: 0;
    color: white;
    font-size: 16px;
    text-align: center;
    transition: 0.4s;
    width: 0px;
    
`;

const SearchBtn = styled.a`
    color: #62E52C;
    float: right;
    border-radius: 50%;
    background: #253746;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    transition: 0.4s;
`;

const SearchDiv = styled.div`
    position: absolute;
    left: 84%;
    top: 30%;
    transform: translate(-50%,-50%);
    background: #253746;
    height: 50px;
    border-radius: 40px;
    padding: 10px; 
    :hover > ${Search}{
        width: 150px;
        padding: 0 6px;
    }
    @media screen and (max-width: 768px){
        :hover > ${SearchBtn}{
        position: absolute;
        top: 22%;
        left: 80%;
        }
    }
    @media screen and (max-width: 576px){
        :hover{
            left: 84%;
            top: 32%;
        }
        left: 84%;
        top: 32%;
    }
    :hover > ${SearchBtn}{
        background: black;
        width: 30px;
    }
`;

//Agg

const ButtonAgg = styled.button`
    position: absolute;
    top: 28%;
    left: 9%;
    padding: 10px 20px;
    font-size: 15px;
    font-family: "montserrat";
    border: 1px solid #62E52C;
    cursor: pointer;
    color:transparent;
    transition: 0.8s;
    overflow: hidden;
    border-radius: 10px;
    background: white;

    &:hover{
        background: #62E52C;
        border: 1px solid #253746;
        
    }

    &::before {
        content:"Hi, Add";
        font-display:left;
        color: #62E52C;
        font-size: 25px;
        position: absolute;
        left: 0;
        width: 100%;
        height: 180%;
        background: #253746;
        transition:0.8s;
        top: 0;
        border-radius: 0 0 50% 50%;
    }

    &:hover::before{
        color: #253746;
        height: 0%;
        border-radius: 0 0 50% 50%;
    }

`;

const ButtonDel = styled.button`
    padding-left:2px;
    padding-right:2px;
    color: #253746;
    background: #62E52C;
    border: 2px solid #F67B27;
    border-radius: 10px;
    margin-bottom:10px;
    margin-left: 40%;
    margin-right: 40%;
`;

const ButtonAc = styled(ButtonDel)`
    margin: 0px;
    color: #62E52C;
    background: #253746;
    border: 2px solid #62E52C;
    transition: 0.6s;
    margin-left:5px;
    margin-right: 0;
    &:hover{
        border: 2px solid #F67B27;
    }

`;

const CollapseFlex = styled.div`
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px 20px;
    font-size: 15px;
`;

const AggInput = styled.input`
    color: #253746;
    text-align: center;
    border: 2px solid #253746;
    transition: 0.6s;
    margin-right:2px;
    font-family:Georgia, 'Times New Roman', Times, serif;
    &::placeholder{
        color: #253746;

    }
    &:active, &:focus{
        border: 2px solid #62E52C;
    }
`;

const CardBodys = styled(CardBody)`
    border: 2px solid #62E52C;
    border-radius: 10px;
    background: #253746;
`;


export default class AchievementList extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);   //ReactStrap
        this.state = {
            achievement: {
                info: [],
                error: false
            },
            newAchievement: {
                name: "",
                points: ""
            },
            achievementeEror: false,
            collapse: false,           //Reacstrap
            searchText: ""
        }
    }

    toggle() {     //ReactStrap
        this.setState(state => ({ collapse: !state.collapse }));
    }

    componentDidMount = () => {
        this.getAchievement();
    }

    getAchievement = () => {
        axios.get(`${BASE_LOCAL_ENDPOINT}/achievements`)
            .then(response => {
                this.setState({
                    achievement: {
                        info: response.data,
                        error: ''
                    },
                    achievementeEror: false
                })
            })
            .catch(error => {
                this.setState({
                    achievement: {
                        error: error.message
                    }
                })
            })
    }

    textChange = (e, keyText) => {
        const value = e.target.value;
        this.setState({ [keyText]: value })
    }

    // Posts in the dataBase with Axios
    createAchievement = (e) => {
        e.preventDefault();
        const {
            newAchievement: {
                name,
                points,
            }
        } = this.state;

        axios.post(`${BASE_LOCAL_ENDPOINT}/achievements`, {
            name,
            points,
        }, {
                headers: { "Content-Type": "application/json" }
            })
            .then(() => { this.getAchievement() })
            .catch(() => { this.setState({ achievementeEror: true }) })

        this.setState(() => ({   //This sets the fields empty
            newAchievement: {        // the new array, Dont haco to concat because we are posting it
                name: "",
                points: 0,
            },
            collapse: false
        }))
    }

    //Deleate worker form db
    deleateAchievement = (e, id) => {
        e.preventDefault();
        // const { match: { params: { id } } } = this.props;    //gets the id from the props
        axios.delete(`${BASE_LOCAL_ENDPOINT}/achievements/${id}`)  //deleats the worker with the same id
            .then(() => { this.getAchievement() })
            .catch(() => { this.setState({ achievementeEror: true }) })
    }

    // Input text for the new worker array
    inputTextChange = (value, keyText) => {
        this.setState(prevState => ({
            newAchievement: {
                ...prevState.newAchievement,
                [keyText]: value
            }
        }))
    }

    //The input
    inputField = (value, field, field2) => (
        <AggInput
            type="text"
            placeholder={field2}
            onChange={(e) => this.inputTextChange(e.target.value, field)}
            value={value}
            required
        />
    )

    render() {
        const {
            searchText,
            achievementeEror,
            achievement: { info, error },
            newAchievement: {
                name,
                points
            },
        } = this.state;

        if (error) {
            return <div>Fetch Error: {error}</div>
        }

        const filteredAchieve = info.filter(infor => infor.name.toLowerCase().includes(searchText.toLowerCase()));

        return (
            <>
                {/* Search Box */}
                <SearchDiv>
                    <Search
                        onChange={(e) => this.textChange(e, "searchText")}
                        placeholder="Search"
                        className="filter-field"
                        type="text"
                        value={searchText}
                    />
                    <SearchBtn href="#">
                        {element}
                    </SearchBtn>
                    {/* Button That Reveals Modal ReacStrap: Colapse*/}
                </SearchDiv>
                <ButtonAgg onClick={this.toggle}>¡.........................!</ ButtonAgg>
                <CollapseFlex>
                    <Collapse isOpen={this.state.collapse}>
                        <Card>
                            <CardBodys>
                                <form className="" onSubmit={(e) => this.createAchievement(e)}>
                                    {this.inputField(name, 'name', 'Name of Achievemente')}
                                    {this.inputField(points, 'points', 'Points')}
                                    <ButtonAc type="submit" className="">Accept</ButtonAc>
                                </form>
                            </CardBodys>
                        </Card>
                    </Collapse>
                </CollapseFlex>

                {/* Maps With a Sort, And if it doesn't Maps it shows error */}
                {achievementeEror && <p>An error ocurred creating Achievements</p>}
                {filteredAchieve.sort((a, b) => b.points - a.points).map(({ id, points, name }) => (
                    <AchieveFlex>
                        <Achieve points={points} name={name} />
                        <ButtonDel onClick={(e) => this.deleateAchievement(e, id)}>Delete</ButtonDel>
                    </AchieveFlex>
                ))}
            </>
        );
    }
}
