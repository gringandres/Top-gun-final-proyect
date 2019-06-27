import React, { Component } from 'react'
import axios from 'axios';
import Achieve from '../Components2/Achieve';
import { BASE_LOCAL_ENDPOINT } from "../constants";
import { Collapse, Button, CardBody, Card } from 'reactstrap';

export default class AchievementList extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);   //ReactStrap
        this.state = {
            achievement: {
                info: [],
                error: false
            },
            newAchievement: {
                name: "",
                points: ""
            },
            achievementeEror: false,
            collapse: false,           //Reacstrap
            searchText: ""
        }
    }

    toggle() {     //ReactStrap
        this.setState(state => ({ collapse: !state.collapse }));
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

    textChange = (e, keyText) => {
        const value = e.target.value;
        this.setState({ [keyText]: value })
    }

    // Posts in the dataBase with Axios
    createAchievement = (e) => {
        e.preventDefault();
        const {
            newAchievement: {
                name,
                points,
            }
        } = this.state;

        axios.post(`${BASE_LOCAL_ENDPOINT}/achievements`, {
            name,
            points,
        }, {
                headers: { "Content-Type": "application/json" }
            })
            .then(() => { this.getAchievement() })
            .catch(() => { this.setState({ achievementeEror: true }) })

        this.setState(() => ({   //This sets the fields empty
            newAchievement: {        // the new array, Dont haco to concat because we are posting it
                name: "",
                points: 0,
            }
        }))
    }

    //Deleate worker form db
    deleateAchievement = (e, id) => {
        e.preventDefault();
        // const { match: { params: { id } } } = this.props;    //gets the id from the props
        axios.delete(`${BASE_LOCAL_ENDPOINT}/achievements/${id}`)  //deleats the worker with the same id
            .then(() => { this.getAchievement() })
            .catch(() => { this.setState({ achievementeEror: true }) })
    }

    // Input text for the new worker array
    inputTextChange = (value, keyText) => {
        this.setState(prevState => ({
            newAchievement: {
                ...prevState.newAchievement,
                [keyText]: value
            }
        }))
    }

    //The input
    inputField = (value, field, field2) => (
        <input
            type="text"
            placeholder={field2}
            onChange={(e) => this.inputTextChange(e.target.value, field)}
            value={value}
            required
        />
    )

    render() {
        const {
            searchText,
            achievementeEror,
            achievement: { info, error },
            newAchievement: {
                name,
                points
            },
        } = this.state;

        if (error) {
            return <div>Fetch Error: {error}</div>
        }

        const filteredAchieve = info.filter(infor => infor.name.toLowerCase().includes(searchText.toLowerCase()));

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

                {/* Button That Reveals Modal ReacStrap: Colapse*/}
                <div>
                    <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>+</Button>
                    <Collapse isOpen={this.state.collapse}>
                        <Card>
                            <CardBody>
                                <form className="" onSubmit={(e) => this.createAchievement(e)}>
                                    {this.inputField(name, 'name', 'Name of Achievemente')}
                                    {this.inputField(points, 'points', 'Points')}
                                    <button type="submit" className="">Accept</button>
                                </form>
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>

                {/* Maps With a Sort, And if it doesn't Maps it shows error */}
                {achievementeEror && <p>An error ocurred creating Achievements</p>}
                {filteredAchieve.sort((a, b) => a.points - b.points).map(({ id, points, name }) => (
                    <>
                        <Achieve points={points} name={name} />
                        <button onClick={(e) => this.deleateAchievement(e, id)}>Delete</button>
                    </>
                ))}
            </>
        );
    }
}
