import {AutomataState} from '../AutomataState'

export function twoNeighborStateGeneration(previousAutomata: AutomataState): AutomataState {

    let lastGeneration = previousAutomata.automata[previousAutomata.generationNumber]

    let nextAutomata: AutomataState = {
        automata: [...previousAutomata.automata], 
        generationNumber: previousAutomata.generationNumber + 1, 
        generateForRules: previousAutomata.generateForRules}

    let boolArray: Array<boolean> = lastGeneration.map((value, index) => {
        return getLeftNeighbor(lastGeneration, index)
                 && getRightNeighbor(lastGeneration, index)       
    })

    console.log("Next generation: " + boolArray)

    if (previousAutomata.generationNumber > previousAutomata.automata.length - 1) {
        nextAutomata.automata = [...nextAutomata.automata, boolArray]
    } else {
        nextAutomata.automata[nextAutomata.generationNumber] = boolArray
    }

    return nextAutomata
}

function getLeftNeighbor(previousGeneration: Array<boolean>, currentIndex: number): boolean {
    return currentIndex === 0 ? false : previousGeneration[currentIndex - 1]
        return false
}

function getRightNeighbor(previousGeneration: Array<boolean>, currentIndex: number): boolean {
    return currentIndex === previousGeneration.length - 1 ? false : previousGeneration[currentIndex + 1] 
}