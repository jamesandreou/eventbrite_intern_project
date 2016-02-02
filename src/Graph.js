import React, { Component } from 'react';
import { Input } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { PieChart } from 'react-d3-basic';
import { Chart } from 'react-d3-core';

export class Graph extends Component{

  constructor(){
    super();
  }

  pullDataType(raw, type){
    let data = [];
    let series = [];
    let found = {};
    let count = 0;
    // Parse required type from raw data
    for(let e of raw){
      let field = '';
      switch(type){
        case 'Categories' :
          field = e.category !== null ? e.category.name : "None";
          break;
        case 'City':
          field = (e.venue !== null && e.venue.address !== null)
            ? e.venue.address.city : "None";
          break;
        case 'Country':
          field = (e.venue !== null && e.venue.address !== null)
            ? e.venue.address.country : "None";
          break;
      }
      // Count occurences of each field
      if(found[field] === undefined){
        found[field] = 1;
      }else{
        found[field]++;
      }
      data.push({
        key : count,
        name : field
      });
      count ++;
    }
    // Get rid of values that occur once
    for(let d in data){
      if(found[d.name] <= 1){
        d.name = 'Other';
        found[d.name] = 'skip';
      }
    }
    // Create chart series
    for(let f in found){
      if(found[f] === 'skip') continue;
      series.push({
        name : f,
        field : f
      });
    }
    return {data : data, series : series};
  }

  render(){
    if(this.props.data === null) return (<div></div>);
    const data = this.pullDataType(this.props.data.events, this.props.dtype);
    console.log(data);
    const width = this.props.size;
    const height = this.props.size / 2;
    const title = this.props.dtype + " " + this.props.gtype + " Chart";
    return(
      <div className='graphWrapper'>
        <h3>{title}</h3>
        {this.renderPie(data, width, height, title)}
      </div>
    );
  }

  // use d3 to render a pie chart element
  renderPie(data, width, height, title){
    const d = data.data;
    const radius = height / 3;
    const margins = {top: 0, right: 0, bottom: 0, left: 0};
    let value = function(d) {
      if(!d) return 0;
      return d.key;
    };
    let name = function(d) {
      return d.name;
    };
    const outerRadius = radius - 10;
    const innerRadius = 0;
    const series = data.series;
    const noLegend = false;

    return(
        <PieChart
          title={''}
          width={width}
          height={height}
          margins={margins}
          data={d}
          radius= {radius}
          id= {"Pie"}
          chartSeries= {series}
          legendClassName = {"no-legend"}
          showLegend = {noLegend}
          categoricalColors= {d3.scale.category10()}
          value = {value}
          name = {name}
          legendPosition= {'right'}
          outerRadius= {outerRadius}
          innerRadius= {innerRadius}
          pieSort = {d3.descending}
        />
    );
  }

}
