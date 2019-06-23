import React, { Component } from 'react'
import axios from 'axios';
import Person from '../Components2/Person';
import { Link } from 'react-router-dom';
import { BASE_LOCAL_ENDPOINT } from "../constants";
import { Collapse, Button, CardBody, Card } from 'reactstrap';

export default class EmployeesList extends Component {

    // Constructer with props
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
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

    // Input text post 
    inputTextChange = (value, keyText) => {
        this.setState(prevState => ({
            newWorker: {
                ...prevState.newWorker,
                [keyText]: value
            }
        }))
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
    }

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
                <div>
                    <input
                        onChange={(e) => this.textChange(e, "searchText")}
                        placeholder="Search"
                        className="filter-field"
                        type="text"
                        value={searchText}
                    />
                </div>

                {/* Button That Reveals Modal ReacStrap: Colapse*/}
                <div>
                    <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>+</Button>
                    <Collapse isOpen={this.state.collapse}>
                        <Card>
                            <CardBody>
                                <form className="" onSubmit={(e) => this.createWorker(e)}>
                                    <input
                                        type="text"
                                        placeholder="Full name"
                                        onChange={(e) => this.inputTextChange(e.target.value, "name")}
                                        value={name}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Job"
                                        onChange={(e) => this.inputTextChange(e.target.value, "job")}
                                        value={job}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Area"
                                        onChange={(e) => this.inputTextChange(e.target.value, "area")}
                                        value={area}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Points"
                                        onChange={(e) => this.inputTextChange(e.target.value, "points")}
                                        value={points}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Image"
                                        onChange={(e) => this.inputTextChange(e.target.value, "imgSrc")}
                                        value={imgSrc}
                                    />
                                    <button type="submit" className="">Accept</button>
                                </form>
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>

                {/* Maps With a Sort, And if it doesn't Maps it shows error */}
                {workerEror && <p>An error ocurred Creating or Loading Employees</p>}
                {filteredWorker.sort((a, b) => b.points - a.points).map(({ id, imgSrc, name, points }) => (
                    <Link key={id} to={`/employees/${id}`}>
                        <Person imgSrc={imgSrc} name={name} points={points} />
                    </Link>
                ))}
            </>
        );
    }
}
