import React, { Component } from 'react'
import axios from 'axios';
import { BASE_LOCAL_ENDPOINT } from "../constants";

export default class employeesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: {
                imgSrc: "",
                name: "",
                job: "",
                area: "",
                points: 0
            },
            error: ""
        }
    }

    componentDidMount = () => {
        const { match: { params: { id } } } = this.props;
        axios.get(`${BASE_LOCAL_ENDPOINT}/employees/${id}`)
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

    render() {
        const {
            employees: {
                imgSrc,
                name,
                job,
                area,
                points
            }
        } = this.state;
        return (
            <div >
                <img src={imgSrc} alt="" />
                <p><b>name: </b>{name}</p>
                <p><b>job: </b>{job}</p>
                <p><b>area: </b>{area}</p>
                <p><b>points: </b>{points}</p>
            </div>
        );
    }
}
