import React, { Component } from 'react'
import axios from 'axios';
import { BASE_LOCAL_ENDPOINT } from "../constants";

export default class AchievementDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            achieve: {
                name: "",
                points: 0
            },
            error: ""
        }
    }

    componentDidMount = () => {
        const { match: { params: { id } } } = this.props;
        axios.get(`${BASE_LOCAL_ENDPOINT}/achievements/${id}`)
            .then(response => {
                this.setState({
                    achieve: response.data,
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
            achieve: {
                name,
                points
            }
        } = this.state;
        return (
            <div >
                <p><b>name: </b>{name}</p>
                <p><b>points: </b>{points}</p>
            </div>
        );
    }
}
