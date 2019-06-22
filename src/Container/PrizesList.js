import React, { Component } from 'react'
import axios from 'axios';
import Prize from '../Components2/Prize';
import { Link } from 'react-router-dom';
import { BASE_LOCAL_ENDPOINT } from "../constants";


export default class PrizesList extends Component {
    state = {
        objects:{
            detail:[],
            error: false
        },
        objectsError:false
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

    render(){
        const {
            objectsError,
            objects: { detail, error }
            
        } = this.state;

        if (error) {
            return <div>Fetch Error: {error}</div>
        }

        return (
            <>
                {objectsError && <p>An error ocurred creating Character</p>}
                {detail.sort((a, b) => a.points - b.points).map(({ id, imgSrc, name }) => (
                    <Link key={id} to={`/prizes/${id}`}>
                        <Prize imgSrc={imgSrc} name={name} />
                    </Link>
                ))}
            </>
        );
    }
}
