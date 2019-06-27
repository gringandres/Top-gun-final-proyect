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
            imgSrc2: "",
            name2: "",
            job2: "",
            area2: "",
            points2: 0,
            error: "",
            look: "hidden",
            lookButton: "button",
            lookAccept: "hidden",
            workerEror: false
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
            imgSrc2,
            name2,
            job2,
            area2,
            points2

        } = this.state;

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

    // Input text for the update worker 
    inputTextChange = (e, keyText) => {
        const value = e.target.value;
        this.setState({ [keyText]: value })
    }

    //Label 
    labelField = (label, value , look) => (
        <label type={look}>
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
            look,
            lookButton,
            lookAccept
        } = this.state;

        //Destructuring with a object
        const {
            imgSrc2,
            name2,
            job2,
            area2,
            points2
        } = this.state.employees

        return (
            // Prints the employee that has been selected
            <div>
                {/* // Redirect so it doesn't print and leaves to employees */}
                {redirect && <Redirect to='/employees' />}
                <form className="field-group">
                    <h1>Employee</h1>
                    <img src={imgSrc} alt="" />
                    {this.inputField(imgSrc2, imgSrc, "imgSrc2", look)}
            
                    {this.labelField("Name: ", name)}
                    {this.inputField(name2, name, "name2", look)}

                    {this.labelField("Job: ", job)}
                    {this.inputField(job2, job, "job2", look)}
                   
                    {this.labelField("Area: ", area)}
                    {this.inputField(area2, area, "area2", look)}

                    {this.labelField("Points: ", points)}
                    {this.inputField(points2, points, "points2", look)}

                    <button onClick={(e) => this.deleateWorker(e)}>Delete</button>
                    <input type={lookButton} value="Edit" onClick={(e) => this.change(e)}></input>
                    <input type={lookAccept} value="Accept!" onClick={(e) => this.editWorker(e)}></input>
                </form>
            </div>

        );
    }

}
