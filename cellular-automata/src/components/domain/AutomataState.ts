export interface AutomataState {
    automata: Map<number, Array<boolean>>,
    generationNumber: number,
    
    generateForRules: (previousState: AutomataState) => AutomataState 
}