import React, { Component } from 'react'
import axios from 'axios';
import Prize from '../Components2/Prize';
import { Link } from 'react-router-dom';
import { BASE_LOCAL_ENDPOINT } from "../constants";
import { Collapse, Button, CardBody, Card } from 'reactstrap';


export default class PrizesList extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);   //reactStrap
        this.state = {
            objects: {
                detail: [],
                error: false
            },
            newObject: {
                name: "",
                points: 0,
                imgSrc: "",
                description: ""
            },
            objectsError: false,
            collapse: false,         //reactStrap
            searchText: ""
        }
    }

    toggle() {     //ReactStrap
        this.setState(state => ({ collapse: !state.collapse }));
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

    //Handles text for search
    textChange = (e, keyText) => {
        const value = e.target.value;
        this.setState({ [keyText]: value })
    }

    // Input text for the new worker array
    inputTextChange = (value, keyText) => {
        this.setState(prevState => ({
            newObject: {
                ...prevState.newObject,
                [keyText]: value
            }
        }))
    }

    // Posts in the dataBase with Axios
    createObject = (e) => {
        e.preventDefault();
        const {
            newObject: {
                name,
                points,
                imgSrc,
                description,
            }
        } = this.state;

        axios.post(`${BASE_LOCAL_ENDPOINT}/prizes`, {
            name,
            points,
            imgSrc,
            description
        }, {
                headers: { "Content-Type": "application/json" }
            })
            .then(() => { this.getPrize() })
            .catch(() => { this.setState({ objectsError: true }) })

        this.setState(() => ({   //This sets the fields empty
            newObject: {        // the new array, Dont haco to concat because we are posting it
                name: "",
                points: 0,
                imgSrc: "",
                description: ""
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
            objectsError,
            objects: { detail, error },
            newObject: {
                name,
                points,
                imgSrc,
                description
            }
        } = this.state;

        // Error if it doesnt load : json-server --watch db.json --port 3004
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
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>+</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <form className="" onSubmit={(e) => this.createObject(e)}>
                                {this.inputField(name, 'name', 'Full Name')}
                                {this.inputField(points, 'points', 'Points')}
                                {this.inputField(imgSrc, 'imgSrc', 'Imagen')}
                                {this.inputField(description, 'description', 'Description')}
                                <button type="submit" className="">Accept</button>
                            </form>
                        </CardBody>
                    </Card>
                </Collapse>

                {/* Maps With a Sort, And if it doesn't Maps it shows error */}
                {objectsError && <p>An error ocurred creating Prizes</p>}
                {filteredPrizes.sort((a, b) => a.points - b.points).map(({ id, imgSrc, name, points }) => (
                    <Link key={id} to={`/prizes/${id}`}>
                        <Prize imgSrc={imgSrc} name={name} points={points} />
                    </Link>
                ))}
            </>
        );
    }
}
