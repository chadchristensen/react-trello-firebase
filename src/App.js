import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import data from './sampleData';
import Home from './components/pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageNotFound from './components/pages/PageNotFound';

class App extends React.Component {

  state = {
    boards: []
  }

  componentDidMount() {
    this.setState({ boards: data.boards })
  }

  createNewBoard = board => {
    this.setState({ boards: [...this.state.boards, board]})
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              path="/:userId/boards"
              exact
              render={(props) => (
                <Home
                  boards={this.state.boards}
                  createNewBoard={this.createNewBoard}
                  {...props}
                />
              )}
            />
            <Route
              path='/board/:boardId'
              render={(props) => (
                <Board
                  {...props}
                />
              )}
            />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
