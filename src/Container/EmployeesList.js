import React, { Component } from 'react'
import axios from 'axios';
import Person from '../Components2/Person';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BASE_LOCAL_ENDPOINT } from "../constants";
import { Collapse, CardBody, Card } from 'reactstrap';


const EmployeesGrid = styled.div`
    margin-top: 10px;
    display: grid;
    justify-content: center;
    grid-gap: 40px;
    grid-template-columns: repeat(auto-fill, 200px);
`;

const Search = styled.input`
    margin: 0 0 20px 0;
    text-align: center;
`;

const SearchDiv = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ButtonAgg = styled.button`
    display: block;
    float: right;
    height: 30px;
`;
const CollapseFlex = styled(SearchDiv)`
    margin-top: 0px;
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
            }
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
        <input
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
                    {/* Button That Reveals Modal ReacStrap: Colapse*/}
                    <ButtonAgg onClick={this.toggle}>+</ ButtonAgg>
                </SearchDiv>
                <CollapseFlex>
                    <Collapse isOpen={this.state.collapse}>
                        <Card>
                            <CardBody>
                                <form className="" onSubmit={(e) => this.createWorker(e)}>
                                    {this.inputField(name, 'name', 'Full Name')}
                                    {this.inputField(job, 'job', 'Job')}
                                    {this.inputField(area, 'area', 'Area')}
                                    {this.inputField(points, 'points', 'Points')}
                                    {this.inputField(imgSrc, 'imgSrc', 'Imagen')}
                                    <button type="submit" className="">Accept</button>
                                </form>
                            </CardBody>
                        </Card>
                    </Collapse>
                </CollapseFlex>

                {/* Maps With a Sort, And if it doesn't Maps it shows error */}
                {workerEror && <p>An error ocurred Creating or Loading Employees</p>}
                <EmployeesGrid>
                    {filteredWorker.sort((a, b) => b.points - a.points).map(({ id, imgSrc, name, points }) => (
                        <Link key={id} to={`/employees/${id}`}>
                            <Person imgSrc={imgSrc} name={name} points={points} />
                        </Link>
                    ))}
                </EmployeesGrid>
            </>
        );
    }
}
