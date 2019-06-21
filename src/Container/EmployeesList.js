import React, { Component } from 'react'
import axios from 'axios';
import Person from '../Components/Person';
import { Link } from 'react-router-dom';
import { BASE_LOCAL_ENDPOINT } from "../constants";

export default class EmployeesList extends Component {
    state = {
        workers: {
            info: [],
            error: false
        },
        workerEror: false
    }


    componentDidMount = () => {
        this.getWorker();
    }

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

    render() {
        const {
            workerEror,
            workers: { info, error }
            
        } = this.state;

        if (error) {
            return <div>Fetch Error: {error}</div>
        }

        return (
            <>
                {workerEror && <p>An error ocurred creating Character</p>}
                {info.map(({ id, imgSrc, name }) => (
                    <Link key={id} to={`/employees/${id}`}>
                        <Person imgSrc={imgSrc} name={name} />
                    </Link>
                ))}
            </>
        );
    }
}
