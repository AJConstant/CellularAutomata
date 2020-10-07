import React from 'react';
import { AutomataState } from '../domain/AutomataState'
import { twoNeighborStateGeneration } from '../domain/algo/TwoNeighborAlgo'

interface AppProps {
    message: string
}

// Define props and state in Component Typing
export default class App extends React.Component<AppProps, AutomataState> {

    state: AutomataState;

    // Must call super(props) with AppProps
    constructor(props: AppProps) {
        super(props)
        this.state = {
            automata: [[true, false, true], [false, false, false], [false, false, false]],
            generationNumber: 0,
            generateForRules: twoNeighborStateGeneration
        }
    }

    // Immutable state change returns new state
    runRules = () => {
        this.setState(
            this.state.generateForRules(this.state)
        );
    }

    logState = () => {
        console.log(this.state)
    }


    render() {
        return (
            <div>
                <button onClick={this.runRules}>Generate Next State</button>
                <button onClick={this.logState}>Current State</button>
            </div>

        )
    }
}