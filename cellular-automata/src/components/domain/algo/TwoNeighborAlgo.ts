import {AutomataState} from '../AutomataState'

export function twoNeighborStateGeneration(previousAutomata: AutomataState): AutomataState {

    let lastGeneration : Array<boolean> = previousAutomata.automata.get(previousAutomata.generationNumber) || new Array<boolean>();

    let boolArray: Array<boolean>;

    let nextAutomata: AutomataState = {
        automata: new Map<number, Array<boolean>>(previousAutomata.automata), 
        generationNumber: previousAutomata.generationNumber + 1, 
        generateForRules: previousAutomata.generateForRules
    }

    if(lastGeneration){
        boolArray = lastGeneration.map((value, index) => {
            return getLeftNeighbor(lastGeneration, index)
                     && getRightNeighbor(lastGeneration, index)       
        });
        nextAutomata.automata.set(nextAutomata.generationNumber, boolArray)
    }

    return nextAutomata
}

function getLeftNeighbor(previousGeneration: Array<boolean>, currentIndex: number): boolean {
    return currentIndex === 0 ? false : previousGeneration[currentIndex - 1]
}

function getRightNeighbor(previousGeneration: Array<boolean>, currentIndex: number): boolean {
    return currentIndex === previousGeneration.length - 1 ? false : previousGeneration[currentIndex + 1] 
}