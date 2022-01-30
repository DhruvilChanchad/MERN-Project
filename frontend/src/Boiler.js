import React, { Component } from 'react';

class boiler extends Component {

    constructor(){
        super();
        this.state={
            data:"anil"
        }
    }

    updateData(){
        this.setState({data:"Peter"})
    }

  render() {
    return <div>
        <h1>{this.state.data}</h1>
        <button onClick={() => this.updateData()}>Update Data</button>
    </div>;
  }
}

export default boiler;