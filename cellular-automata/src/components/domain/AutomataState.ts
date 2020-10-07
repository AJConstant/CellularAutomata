export interface AutomataState {
    automata: Array<Array<boolean>>,
    generationNumber: number,
    
    generateForRules: (previousState: AutomataState) => AutomataState 
}