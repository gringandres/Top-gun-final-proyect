import React, { Component } from 'react'
import PrizesList from '../Container/PrizesList';
import Navbar from '../Components2/Navbar';


export default class prizes extends Component {
    render() {
        return (
            <>
                <h1>Prizes</h1>
                <Navbar />
                <div>
                    <PrizesList />
                </div>

            </>
        )
    }
}
