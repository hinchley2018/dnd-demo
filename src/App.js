import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import {getItems,reorder,move} from './utils'
import DragList from './DragList';
class App extends Component {
  state = {
    droppable1: getItems(10),
    droppable2: getItems(5, 10)
  };

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
      droppable1: 'droppable1',
      droppable2: 'droppable2'
  };

  getList = id => this.state[this.id2List[id]];

  //result is the object that moved
  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }
    //if its moving inside same droppable
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === 'droppable2') {
        state = { droppable2: items };
      }

      this.setState(state);
    } 
    else {
      //move item to the correct list
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );
      //update state with result
      this.setState({
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
      });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to DnD Demo</h1>
        </header>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div style={{display:'flex', flexDirection: 'row'}}>
            <DragList
              id='droppable1'
              items={this.state.droppable1}
            />
            <DragList
              id='droppable2'
              items={this.state.droppable2}
            />
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default App;
