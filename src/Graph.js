import React, { Component } from 'react';
import { Input } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Chart } from 'react-d3-core';
import { LineChart } from 'react-d3-basic';

export class Graph extends Component{

  constructor(){
    super();
  }

  pullDataType(raw, type){
    console.log("RAW");
    console.log(raw);
    let data = [];
    for(let e of raw){
      data.push({
        name : raw.category.name
      });
    }
    console.log("PULLED");
    console.log(data);
    return data;
  }

  render(){
    if(this.props.data === null) return (<div></div>);
    const data = this.pullDataType(this.props.data.events, this.props.type);
    return(
      <Chart
          title={this.props.type + " Chart"}
          width={this.props.size}
          height={this.props.size / 2}
          >
      </Chart>
    );
  }

  renderPie(){

  }

  renderBar(){

  }

}
