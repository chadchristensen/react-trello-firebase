import React from 'react';
import List from './List';
import data from '../sampleData';
import { boardsRef, listsRef } from '../firebase';

class Board extends React.Component {
    state = {
        currentBoard: {},
        currentLists: []
    }

    componentDidMount() {
        this.getBoard(this.props.match.params.boardId)
        this.setState({ currentLists: data.lists })
    }

    getBoard = async boardId => {
        try {
            const board = await boardsRef.doc(boardId).get()
            this.setState({ currentBoard: board.data().board })
        } catch (err) {
            console.log('Error getting boards: ', err)
        }
    }

    addBoardInput = React.createRef()

    createNewList = async (e) => {
        try {
            e.preventDefault();
    
            const list = {
                title: this.addBoardInput.current.value,
                board: this.props.match.params.boardId,
                createdAt: new Date(),
            }
    
            if(list.title && list.board) {
                await listsRef.add({ list })
            }
            this.addBoardInput.current.value = ''
        } catch (err) {
            console.error('Error creating a new list: ', err)
        }
    }

    render() {
        return (
            <div
                className="board-wrapper"
                style={{
                    backgroundColor: this.state.currentBoard.background
                }}
            >
                <div className="board-header">
                    <h3>{this.state.currentBoard.title}</h3>
                    <button>Delete board</button>
                </div>
                <div className="lists-wrapper">
                    {Object.keys(this.state.currentLists).map(key => {
                        return (
                            <List
                                key={this.state.currentLists[key].id}
                                list={this.state.currentLists[key]}
                            />
                        )
                    })}
                </div>

                <form
                    onSubmit={this.createNewList}
                    className="new-list-wrapper"
                >
                    <input
                        type="text"
                        ref={this.addBoardInput}
                        name="name"
                        placeholder=" + New List"
                        id=""
                    />
                </form>
            </div>
        )
    }
}

export default Board;