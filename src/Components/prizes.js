import React, { Component } from 'react'
import PrizesList from '../Container/PrizesList';


export default class prizes extends Component {
    render() {
        return (
            <>
                <h1>Prizes</h1>
                <div>
                    <PrizesList />
                </div>

            </>
        )
    }
}
