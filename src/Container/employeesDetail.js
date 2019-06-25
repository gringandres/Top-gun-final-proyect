import React, { Component } from 'react'
import axios from 'axios';
import { BASE_LOCAL_ENDPOINT } from "../constants";
import { Redirect } from "react-router-dom";

export default class employeesDetail extends Component {

    // Constructer with props
    constructor(props) {
        super(props);
        this.state = {
            employees: {
                imgSrc: "",
                name: "",
                job: "",
                area: "",
                points: 0,
                redirect: false  //States false the Redirect in render
            },
            updateEmployee: {
                imgSrc2: "",
                name2: "",
                job2: "",
                area2: "",
                points2: 0,
            },
            error: "",
            look: "hidden",
            lookButton: "button",
            lookAccept: "hidden"
        };
    }

    //gets The worker with the id that was clicked from the db
    componentDidMount = () => {
        this.getEmployee();
    }

    getEmployee = () => {
        const { match: { params: { id } } } = this.props;
        axios.get(`${BASE_LOCAL_ENDPOINT}/employees/${id}`)     //gets the id from the props
            .then(response => {
                this.setState({
                    employees: response.data,
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
    editWorker = (e) => {
        e.preventDefault();
        const {
            updateEmployee: {
                imgSrc2,
                name2,
                job2,
                area2,
                points2,
            }
        } = this.state;

        // let imgSrc3=imgSrc2;
        // let name3=name2;
        // if (imgSrc2 === undefined){
        //     imgSrc3= this.state.employees.imgSrc
        // } 
        // if (name2 === undefined){
        //     name3= this.state.employees.name
        // }

        const { match: { params: { id } } } = this.props;    //gets the id from the props
        axios.put(`${BASE_LOCAL_ENDPOINT}/employees/${id}`, {
            imgSrc: imgSrc2,
            name: name2,
            job: job2,
            area: area2,
            points: points2,
        }, {
                headers: { "Content-Type": "application/json" }
            })
            .then(() => { this.getEmployee() })
            .catch(() => { this.setState({ error: true }) })

        this.setState(() => ({   //This sets the fields empty
            updateEmployee: {        // the new array, Dont have to concat because we are posting it
                name: "",
                job: "",
                area: "",
                points: 0,
                imgSrc: ""
            }
        }))
        this.setState({
            look: "hidden",
            lookButton: "button",
            lookAccept: "hidden"
        })

    }

    //Deleate worker form db
    deleateWorker = (e) => {
        e.preventDefault();
        const { match: { params: { id } } } = this.props;    //gets the id from the props
        axios.delete(`${BASE_LOCAL_ENDPOINT}/employees/${id}`)  //deleats the worker with the same id
            .then(() => {
                // this.getWorker()      //Don't need it because im redirecting
                this.setState({
                    employees: {         // When the button is used turns
                        redirect: true   // redirect in true so it leaves 
                    }
                })
            })
            .catch(() => { this.setState({ workerEror: true }) })
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

    // Input text for the update worker array
    inputTextChange = (value, keyText) => {
        this.setState(prevState => ({
            updateEmployee: {
                ...prevState.updateEmployee,
                [keyText]: value
            }
        }))
    }

    render() {

        //Destructuring 
        const {
            employees: {
                imgSrc,
                name,
                job,
                area,
                points,
                redirect
            },
            updateEmployee: {
                imgSrc2,
                name2,
                job2,
                area2,
                points2,
            },
            look,
            lookButton,
            lookAccept
        } = this.state;

        // Redirect so it doesn't print and leaves to employees
        if (redirect) {
            return <Redirect to='/employees' />
        } else {
            return (
                // Prints the employee that has been selected
                <div>
                    <form>
                        <div className="field-group">
                            <h1>Employee</h1>
                            <img src={imgSrc} alt="" />
                            <input
                                type={look}        /* Send the property (hidden o text) */
                                onChange={(e) => this.inputTextChange(e.target.value, "imgSrc2")}
                                value={imgSrc2}
                            ></input>
                            <label>
                                <b>Name: </b>{name}
                                <input
                                    type={look}        /* Send the property (hidden o text) */
                                    onChange={(e) => this.inputTextChange(e.target.value, "name2")}
                                    value={name2}
                                >
                                </input>
                            </label>
                            <label>
                                <b>Job: </b>{job}
                                <input
                                    type={look}        /* Send the property (hidden o text) */
                                    onChange={(e) => this.inputTextChange(e.target.value, "job2")}
                                    value={job2}
                                >
                                </input>
                            </label>
                            <label>
                                <b>Area: </b>{area}
                                <input
                                    type={look}        /* Send the property (hidden o text) */
                                    onChange={(e) => this.inputTextChange(e.target.value, "area2")}
                                    value={area2}
                                >
                                </input>
                            </label>
                            <label>
                                <b>Points: </b>{points}
                                <input
                                    type={look}        /* Send the property (hidden o text) */
                                    onChange={(e) => this.inputTextChange(e.target.value, "points2")}
                                    value={points2}
                                >
                                </input>
                            </label>
                            <button onClick={(e) => this.deleateWorker(e)}>Delete</button>
                            <input type={lookButton} value="Edit" onClick={(e) => this.change(e)}></input>
                            <input type={lookAccept} value="Accept!" onClick={(e) => this.editWorker(e)}></input>
                        </div>
                    </form>
                </div>

            );
        }

    }
}
