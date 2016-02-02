import React, { Component } from 'react';
import { Search } from './Search';
import { Graph } from './Graph';

export class App extends Component{

  constructor(){
    super();
    this.state = {
      graphType : 'Pie',
      dataType : 'Categories',
      data : null
    };
  }

  setGType(type){
    this.setState({graphType : type});
  }

  setDType(type){
    this.setState({dataType : type});
  }

  pullData(newData){
    this.setState({data : newData});
  }

  render(){
    return(
      <div className='wrapper'>
        <h1>Data Visualization of Eventbrite Events</h1>
        <Search root={this} />
        <Graph data={this.state.data} gtype={this.state.graphType}
        dtype={this.state.dataType} size={window.innerWidth * 0.8} />
      </div>
    );
  }

}
