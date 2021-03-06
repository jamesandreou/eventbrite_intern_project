import React, { Component } from 'react';
import { Input } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
var $ = require('jquery');

export class Search extends Component{

  constructor(){
    super();
    this.state = {
      value : ''
    }
  }

  handleChange(){
    this.setState({
      value: this.refs.search.getValue(),
      hover : false
    });
  }

  setGraphType(){
    this.props.root.setGType(this.refs.gType.getValue());
  }

  setDataType(){
    this.props.root.setDType(this.refs.dType.getValue());
  }

  handleKeyPress(e){
    if (e.charCode == 13) {
      this.search(this.props.root);
    }
  }

  // Look up events with API
  search(app){
    const myToken = '?token=LGQ5F3PAWYCTNMMA7MIH';
    const root = 'https://www.eventbriteapi.com/v3/events/search/';
    const params = {
      'popular' : true,
      'q' : this.state.value,
      'sort_by' : 'date',
      'expand' : 'category,venue'
    };
    $.getJSON(root + myToken, params,
        function(data){
          console.log(data);
          app.pullData(data);
        }
    );
  }

  hover(isHover){
    this.setState({hover : isHover});
  }

  render(){
    const style = {
      color: !this.state.hover ? '#000' : '#ff0000'
    };
    const searchButton = (
      <Glyphicon glyph="search"
      style={style}
      onClick={this.search.bind(this, this.props.root)}
      onMouseOver={this.hover.bind(this, true)}
      onMouseOut={this.hover.bind(this, false)}/>
    );

    return (
      <div className='form'>
        <Input
          type="text"
          value={this.state.value}
          placeholder="Search..."
          label="Enter keywords of events:"
          addonAfter={searchButton}
          ref="search"
          groupClassName="group-class"
          labelClassName="label-class"
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)} />
          <Input type="select" label="Graph Type" placeholder="Pie"
            ref="gType" onChange={this.setGraphType.bind(this)}>
           <option value="Pie">Pie</option>
         </Input>
         <Input type="select" label="Data Type" placeholder="Categories"
           ref="dType" onChange={this.setDataType.bind(this)}>
          <option value="Categories">Categories</option>
          <option value="Country">Country</option>
          <option value="City">City</option>
        </Input>
      </div>
    );
  }
}
