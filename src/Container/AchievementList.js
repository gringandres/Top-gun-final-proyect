import React, { Component } from 'react'
import axios from 'axios';
import Achieve from '../Components2/Achieve';
import { Link } from 'react-router-dom';
import { BASE_LOCAL_ENDPOINT } from "../constants";

export default class AchievementList extends Component {
    state = {
        achievement: {
            info: [],
            error: false
        },
        achievementeEror: false
    }


    componentDidMount = () => {
        this.getAchievement();
    }

    getAchievement = () => {
        axios.get(`${BASE_LOCAL_ENDPOINT}/achievements`)
            .then(response => {
                this.setState({
                    achievement: {
                        info: response.data,
                        error: ''
                    },
                    achievementeEror: false
                })
            })
            .catch(error => {
                this.setState({
                    achievement: {
                        error: error.message
                    }
                })
            })
    }

    render() {
        const {
            achievementeEror,
            achievement: { info, error }
            
        } = this.state;

        if (error) {
            return <div>Fetch Error: {error}</div>
        }

        return (
            <>
                {achievementeEror && <p>An error ocurred creating Character</p>}
                {info.sort((a, b) => a.points - b.points).map(({ id, points, name }) => (
                    <Link key={id} to={`/achievements/${id}`}>
                        <Achieve points={points} name={name} />
                    </Link>
                ))}
            </>
        );
    }
}
