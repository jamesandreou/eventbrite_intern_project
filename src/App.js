import React, { Component } from 'react';
import { Search } from './Search';
import { Graph } from './Graph';

export class App extends Component{

  constructor(){
    super();
    this.state = {
      graphType : 'Pie',
      data : null
    };
  }

  setType(type){
    this.setState({graphType : type});
  }

  pullData(newData){
    this.setState({data : newData});
  }

  render(){
    return(
      <div className='wrapper'>
        <h1>Data Visualization of Eventbrite Events</h1>
        <Search root={this} />
        <Graph data={this.state.data} type={this.state.graphType} size={window.width * 0.8} />
      </div>
    );
  }

}
