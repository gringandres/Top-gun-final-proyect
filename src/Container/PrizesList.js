import React, { Component } from 'react'
import axios from 'axios';
import Prize from '../Components2/Prize';
import { Link } from 'react-router-dom';
import { BASE_LOCAL_ENDPOINT } from "../constants";


export default class PrizesList extends Component {
    state = {
        objects: {
            detail: [],
            error: false
        },
        objectsError: false,
        searchText: ""
    }

    componentDidMount = () => {
        this.getPrize();
    }

    getPrize = () => {
        axios.get(`${BASE_LOCAL_ENDPOINT}/prizes`)
            .then(response => {
                this.setState({
                    objects: {
                        detail: response.data,
                        error: ''
                    },
                    objectsError: false
                })
            })
            .catch(error => {
                this.setState({
                    objects: {
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
            objectsError,
            objects: { detail, error }

        } = this.state;

        if (error) {
            return <div>Fetch Error: {error}</div>
        }

        const filteredPrizes = detail.filter(infor => infor.name.toLowerCase().includes(searchText.toLowerCase()));

        return (
            <>
                <div>
                    <input
                        onChange={(e) => this.textChange(e, "searchText")}
                        placeholder="Search"
                        className="filter-field"
                        type="text"
                        value={searchText}
                    />
                </div>
                {objectsError && <p>An error ocurred creating Prizes</p>}
                {filteredPrizes.sort((a, b) => a.points - b.points).map(({ id, imgSrc, name, points}) => (
                    <Link key={id} to={`/prizes/${id}`}>
                        <Prize imgSrc={imgSrc} name={name} points={points} />
                    </Link>
                ))}
            </>
        );
    }
}
