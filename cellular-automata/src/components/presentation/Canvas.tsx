import React from 'react';
import { AutomataState } from '../domain/AutomataState'
import { twoNeighborStateGeneration } from '../domain/algo/TwoNeighborAlgo'
import { createTextChangeRange, isForInStatement } from 'typescript';

/**
 * These are minimum/maximum allowed columns and rows
 */
const MIN_ROWS: number = 10;
const MAX_ROWS: number = 100;
const MIN_COLS: number = 10;
const MAX_COLS: number = 100;

interface AutomataCell {
    xMin: number,
    yMin: number,
    xMax: number,
    yMax: number,
}

interface CanvasState {
    automata: Map<number, Array<boolean>>
}

interface CanvasProps {
    automata: Map<number, Array<boolean>>,
    firstGeneration: number,
    lastGeneration: number,
    // Type of Automata to set canvas Cell drawing rules
    // Rule #
    // Initial conditions
    // Min/Max (user set)
    // Etc.
}

// Define props and state in Component Typing
export class Canvas extends React.Component<CanvasProps, CanvasState> {

    state: CanvasState;
    cells?: Array<AutomataCell>;
    ref: React.RefObject<HTMLCanvasElement>; // Canvas ref

    // Must call super(props) with AppProps
    constructor(props: CanvasProps) {
        super(props)
        this.state = {
            automata: this.props.automata
        };
        this.ref = React.createRef();
    }
    
    componentDidMount = () => {
        this.cells = this.initializeCells();
        this.drawGrid();
        this.updateCanvas();
    }

    componentWillReceiveProps(nextProps: CanvasProps) {
        this.setState({
            ...this.state,
            automata: nextProps.automata
        });  
    }

    updateCanvas = () => {
        let canvas: HTMLCanvasElement | null = this.ref.current;
        let context: CanvasRenderingContext2D | null;
        if(this.cells){
            if (this.ref.current) {
                context = this.ref.current.getContext('2d');
                if (context && canvas) {
                    this.cells.forEach(c => {
                        context?.fillRect(c.xMin, c.yMin, c.xMax - c.xMin, c.yMax - c.yMin);
                    })
                }
            }
        }
    }

    drawGrid = () => {
        let canvas: HTMLCanvasElement | null = this.ref.current;
        let context: CanvasRenderingContext2D | null;
        let canvasHeight: number;
        let canvasWidth: number;
        let widthStep: number;
        let heightStep: number;

        if (this.ref.current) {
            context = this.ref.current.getContext('2d');
            if (context && canvas) {
                canvasWidth = canvas.width;
                canvasHeight = canvas.height;
                widthStep = canvasWidth / 10;
                heightStep = canvasHeight / 10;

                for (let xpx = 0; xpx <= canvasWidth; xpx += widthStep) {
                    context.beginPath();
                    context.moveTo(xpx, 0);
                    context.lineTo(xpx, canvasHeight);
                    context.stroke();
                }

                for (let ypx = 0; ypx <= canvasHeight; ypx += heightStep) {
                    context.beginPath();
                    context.moveTo(0, ypx);
                    context.lineTo(canvasWidth, ypx);
                    context.stroke();
                }
            }
        }
    }

    initializeCells = (): Array<AutomataCell> => {
        let cells = new Array<AutomataCell>();
        let canvas: HTMLCanvasElement | null = this.ref.current;
        let canvasHeight: number;
        let canvasWidth: number;
        let widthStep: number;
        let heightStep: number;

        if(canvas){
            canvasWidth = canvas.width;
            canvasHeight = canvas.height;
            widthStep = canvasWidth / 10;
            heightStep = canvasHeight / 10;
        }
        
        this.state.automata.forEach((value, generation) => {
            value.forEach((living, idx) => {
                if(living){
                    cells.push({
                        xMin: widthStep * idx,
                        yMin: heightStep * (generation - this.props.firstGeneration),
                        xMax: widthStep* (idx + 1), 
                        yMax: heightStep * (generation - this.props.firstGeneration + 1)
                    })
                }
            })
        })
        return cells;
    }

    /** Fake function for testing purposes DO NOT STEAL */
    gimmeFakeAutomataPls = (): Map<number, Array<boolean>> => {
        let automata = new Map<number, Array<boolean>>();
        for (let i: number = 0; i < 10; i++) {
            let currentGen = new Array<boolean>(10);
            for (let j: number = 0; j < currentGen.length; j++) {
                currentGen[j] = Math.random() <= 0.5;
            }
            automata.set(i, currentGen);
        }
        return automata;
    }

    render() {
        this.cells = this.initializeCells();
        this.updateCanvas();
        return (
            <div>
                <canvas ref={this.ref} width={500} height={500}></canvas>
            </div>
        )
    }
}