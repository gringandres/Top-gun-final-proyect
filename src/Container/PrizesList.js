import React, { Component } from 'react'
import axios from 'axios';
import Prize from '../Components2/Prize';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BASE_LOCAL_ENDPOINT } from "../constants";
import { Collapse, CardBody, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// Font Awesome
const element = <FontAwesomeIcon icon={faSearch} />

//Grid
const PrizesGrid = styled.div`
    margin-top: 30px;
    display: grid;
    justify-content: center;
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fill, 200px);
`;

//remove Blue line of Link
const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
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

const SeacrLabel = styled.div`
    position: absolute;
    top:27%;
    left: 61%;
    font-size: 16px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    background: #253746;
    color: #62E52C;
    border: 10px solid  #253746;
    border-radius: 50px;
    
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

const ButtonAccept = styled.div`
    padding-left:2px;
    padding-right:2px;
    border-radius: 10px;
    text-align: center;
    color: #62E52C;
    background: #253746;
    border: 2px solid #62E52C;
    transition: 0.6s;
    margin: 10px 40% 0px 40%;
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


export default class PrizesList extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);   //reactStrap
        this.state = {
            objects: {
                detail: [],
                error: false
            },
            newObject: {
                name: "",
                points: 0,
                imgSrc: "",
                description: ""
            },
            objectsError: false,
            collapse: false,         //reactStrap
            searchText: ""
        }
    }

    toggle() {     //ReactStrap
        this.setState(state => ({ collapse: !state.collapse }));
    }


    componentDidMount = () => {
        this.getPrize();
    }

    getPrize = () => {
        axios.get(`${BASE_LOCAL_ENDPOINT}/prizes`)
            .then(response => {
                this.setState({
                    objects: {
                        detail: response.data,
                        error: ''
                    },
                    objectsError: false
                })
            })
            .catch(error => {
                this.setState({
                    objects: {
                        error: error.message
                    }
                })
            })
    }

    //Handles text for search
    textChange = (e, keyText) => {
        const value = e.target.value;
        this.setState({ [keyText]: value })
    }

    // Input text for the new worker array
    inputTextChange = (value, keyText) => {
        this.setState(prevState => ({
            newObject: {
                ...prevState.newObject,
                [keyText]: value
            }
        }))
    }

    // Posts in the dataBase with Axios
    createObject = (e) => {
        e.preventDefault();
        const {
            newObject: {
                name,
                points,
                imgSrc,
                description,
            }
        } = this.state;

        axios.post(`${BASE_LOCAL_ENDPOINT}/prizes`, {
            name,
            points,
            imgSrc,
            description
        }, {
                headers: { "Content-Type": "application/json" }
            })
            .then(() => { this.getPrize() })
            .catch(() => { this.setState({ objectsError: true }) })

        this.setState(() => ({   //This sets the fields empty
            newObject: {        // the new array, Dont haco to concat because we are posting it
                name: "",
                points: 0,
                imgSrc: "",
                description: ""
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
            objectsError,
            objects: { detail, error },
            newObject: {
                name,
                points,
                imgSrc,
                description
            }
        } = this.state;

        // Error if it doesnt load : json-server --watch db.json --port 3004
        if (error) {
            return <div>Fetch Error: {error}</div>
        }

        const filteredPrizes = detail.filter(infor => infor.name.toLowerCase().includes(searchText.toLowerCase()));

        return (
            <>
                <SeacrLabel>Looking For A Prize??</SeacrLabel>
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
                                <form className="" onSubmit={(e) => this.createObject(e)}>
                                    {this.inputField(name, 'name', 'Full Name')}
                                    {this.inputField(points, 'points', 'Points')}
                                    {this.inputField(imgSrc, 'imgSrc', 'Imagen')}
                                    {this.inputField(description, 'description', 'Description')}
                                    <ButtonAccept type="submit" className="">Accept</ButtonAccept>
                                </form>
                            </CardBodys>
                        </Card>
                    </Collapse>
                </CollapseFlex>
                {/* Maps With a Sort, And if it doesn't Maps it shows error */}
                {objectsError && <p>An error ocurred creating Prizes</p>}
                <PrizesGrid>
                {filteredPrizes.sort((a, b) => a.points - b.points).map(({ id, imgSrc, name, points }) => (
                    <StyledLink key={id} to={`/prizes/${id}`}>
                        <Prize imgSrc={imgSrc} name={name} points={points} />
                    </StyledLink>
                ))}
                </PrizesGrid>
            </>
        );
    }
}
