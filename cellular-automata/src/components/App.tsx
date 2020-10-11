import React from "react";
import { Canvas } from "./presentation/Canvas";
import { AutomataState } from "./domain/AutomataState";
import { twoNeighborStateGeneration } from "./domain/algo/TwoNeighborAlgo";

export class App extends React.Component<{}, {}> {

    state: AutomataState;

    constructor(props: Readonly<{}>){
        super(props);

        let zerothGen = new Map<number, Array<boolean>>();
        let booleanArray = new Array<boolean>();
        for(let i: number = 0; i < 10; i++){
            booleanArray.push(Math.random() <= 0.5);
        }
        zerothGen.set(0, booleanArray);

        this.state = {
            automata: zerothGen,
            generationNumber: 0,    
            generateForRules: twoNeighborStateGeneration
        }

        console.log(`InitialStateAutomata: `, this.state.automata);
    }

    advanceGeneration = () => {
        const nextState = this.state.generateForRules(this.state);
        this.setState({
            ...nextState
        });
        console.log(`Generation ${this.state.generationNumber}: `, this.state.automata);
        this.render();  
    }

    /**
     * Unused
     */
    initializeFirstGen = () => {
        let zerothGen = new Map<number, Array<boolean>>();
        let booleanArray = new Array<boolean>();
        for(let i: number = 0; i < 10; i++){
            booleanArray.push(Math.random() <= 0.5);
        }
        zerothGen.set(0, booleanArray);
        this.setState({
            generationNumber: 0,
            automata: zerothGen, 
            generateForRules: this.state.generateForRules
        });
    }

    render() {
        return(
            <div>
                <Canvas automata = {this.state.automata} firstGeneration={0} lastGeneration={10}></Canvas>
                <button onClick={this.advanceGeneration}>ADVANCE GENERATION</button>
            </div>
        )
    }
}