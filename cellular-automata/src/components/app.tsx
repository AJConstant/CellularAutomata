import React from 'react';

interface AppProps {
    message: string
}
interface AppState {
    message: string,
}

// Define props and state in Component Typing
export default class App extends React.Component<AppProps, AppState> {

    state: AppState;

    // Must call super(props) with AppProps
    constructor(props: AppProps) {
        super(props)
        this.state = {
            message: this.props.message
        }
    }

    // Immutable state change returns new state
    changeMessage = () => {
        this.setState({
            message: "Changed son"
        });
    }

    render() {
        return (
            <div>
                <div>{this.state.message}</div>
                <button onClick={this.changeMessage}>Click Me!</button>
            </div>

        )
    }
}