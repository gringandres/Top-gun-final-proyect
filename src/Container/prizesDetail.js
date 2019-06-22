import React, { Component } from 'react'
import axios from 'axios';
import { BASE_LOCAL_ENDPOINT } from "../constants";
import Navbar from '../Components2/Navbar';

export default class prizesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prizes: {
                imgSrc: "",
                name: "",
                description: "",
                points: 0
            },
            error: ""
        }
    }

    componentDidMount = () => {
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

    render() {
        const {
            prizes: {
                imgSrc,
                name,
                description,
                points
            }
        } = this.state;
        return (
            <div >
                <h1>Prize</h1>
                <Navbar />
                <img src={imgSrc} alt="" />
                <p><b>name: </b>{name}</p>
                <p><b>Description: </b>{description}</p>
                <p><b>points: </b>{points}</p>
            </div>
        );
    }
}
