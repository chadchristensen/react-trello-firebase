import React from 'react';
import List from './List';

class Board extends React.Component {

    render() {
        return (
            <React.Fragment>
                <p>{this.props.board.title}</p>
            </React.Fragment>
        )
    }
}

export default Board;