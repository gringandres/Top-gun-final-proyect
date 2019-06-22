import React, { Component } from 'react'
import axios from 'axios';
import Person from '../Components2/Person';
import { Link } from 'react-router-dom';
import { BASE_LOCAL_ENDPOINT } from "../constants";

export default class EmployeesList extends Component {
    state = {
        workers: {
            info: [],
            error: false
        },
        workerEror: false,
        searchText: ""
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

    textChange = (e, keyText) => {
        const value = e.target.value;
        this.setState({ [keyText]: value })
    }

    render() {
        const {
            searchText,
            workerEror,
            workers: { info, error }

        } = this.state;

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

                {/* Button That Reveals Modal  */}
                <input type="submit" value="+" />

                {/* Maps With a Sort, And if it doesn't Maps it shows error */}
                {workerEror && <p>An error ocurred creating Workers</p>}
                {filteredWorker.sort((a, b) => b.points - a.points).map(({ id, imgSrc, name, points }) => (
                    <Link key={id} to={`/employees/${id}`}>
                        <Person imgSrc={imgSrc} name={name} points={points} />
                    </Link>
                ))}
            </>
        );
    }
}
