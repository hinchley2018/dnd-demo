import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import {getItems,reorder,move} from './utils'
import DragList from './DragList';
class App extends Component {
  state = {
    items: getItems(10),
    selected: getItems(5, 10)
  };

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
      droppable: 'items',
      droppable2: 'selected'
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
        state = { selected: items };
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
          items: result.droppable,
          selected: result.droppable2
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
              id='droppable'
              items={this.state.items}
            />
            <DragList
              id='droppable2'
              items={this.state.selected}
            />
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default App;
