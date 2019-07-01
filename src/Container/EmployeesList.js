import React, { Component } from 'react'
import axios from 'axios';
import Person from '../Components2/Person';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BASE_LOCAL_ENDPOINT } from "../constants";
import { Collapse, CardBody, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// Font Awesome
const element = <FontAwesomeIcon icon={faSearch} />

//Grid
const EmployeesGrid = styled.div`
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

const ButtonAccept = styled.button`
    padding-left:2px;
    padding-right:2px;
    border-radius: 10px;
    margin-bottom:10px;
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



export default class EmployeesList extends Component {

    // Constructer with props
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);   //ReactStrap
        this.state = {
            workers: {
                info: [],
                error: false
            },
            newWorker: {
                name: "",
                job: "",
                area: "",
                points: 0,
                imgSrc: ""
            },
            workerEror: false,
            collapse: false,              //Reacstrap
            searchText: ""
        };
    }

    toggle() {     //ReactStrap
        this.setState(state => ({ collapse: !state.collapse }));
    }

    // LifeCycle to mount the data
    componentDidMount = () => {
        this.getWorker();
    }

    // Funtion to call ando get all the employees with axios
    getWorker = () => {
        axios.get(`${BASE_LOCAL_ENDPOINT}/employees`)
            .then(response => {
                this.setState({
                    workers: {
                        info: response.data,
                        error: ''
                    },
                    workerEror: false
                })
                console.log(this.state.workers);
            })
            .catch(error => {
                this.setState({
                    workers: {
                        error: error.message
                    }
                })
            })
    }

    // Handles text for Search
    textChange = (e, keyText) => {
        const value = e.target.value;
        this.setState({ [keyText]: value })
    }

    // Posts in the dataBase with Axios
    createWorker = (e) => {
        e.preventDefault();
        const {
            newWorker: {
                name,
                job,
                area,
                points,
                imgSrc,
            }
        } = this.state;

        axios.post(`${BASE_LOCAL_ENDPOINT}/employees`, {
            name,
            job,
            area,
            points,
            imgSrc,
        }, {
                headers: { "Content-Type": "application/json" }
            })
            .then(() => { this.getWorker() })
            .catch(() => { this.setState({ workerEror: true }) })

        this.setState(() => ({   //This sets the fields empty
            newWorker: {        // the new array, Dont haco to concat because we are posting it
                name: "",
                job: "",
                area: "",
                points: 0,
                imgSrc: ""
            },
            collapse: false
        }))
    }

    // Input text for the new worker array
    inputTextChange = (value, keyText) => {
        this.setState(prevState => ({
            newWorker: {
                ...prevState.newWorker,
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

        //Destructuring 
        const {
            searchText,
            workerEror,
            workers: { info, error },
            newWorker: {
                name,
                job,
                area,
                points,
                imgSrc
            }
        } = this.state;


        // Error if it doesnt load : json-server --watch db.json --port 3004
        if (error) {
            return <div>Fetch Error: {error}</div>
        }


        const filteredWorker = info.filter(infor => infor.name.toLowerCase().includes(searchText.toLowerCase()));

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
                                <form className="" onSubmit={(e) => this.createWorker(e)}>
                                    {this.inputField(name, 'name', 'Full Name')}
                                    {this.inputField(job, 'job', 'Job')}
                                    {this.inputField(area, 'area', 'Area')}
                                    {this.inputField(points, 'points', 'Points')}
                                    {this.inputField(imgSrc, 'imgSrc', 'Imagen')}
                                    <ButtonAccept type="submit" className="">Accept</ButtonAccept>
                                </form>
                            </CardBodys>
                        </Card>
                    </Collapse>
                </CollapseFlex>

                {/* Maps With a Sort, And if it doesn't Maps it shows error */}
                {workerEror && <p>An error ocurred Creating or Loading Employees</p>}
                <EmployeesGrid>
                    {filteredWorker.sort((a, b) => b.points - a.points).map(({ id, imgSrc, name, points }) => (
                        <StyledLink key={id} to={`/employees/${id}`}>
                            <Person imgSrc={imgSrc} name={name} points={points} />
                        </StyledLink>
                    ))}
                </EmployeesGrid>
            </>
        );
    }
}
