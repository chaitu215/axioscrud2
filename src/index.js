import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";
import axios from "axios";
import * as dataJson from './data.json'

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      data: '',
      getData : ''
    };

  }

  componentDidMount = () => {
     
    // get call 
     axios.get("https://jsonplaceholder.typicode.com/posts").then(
      RES => {
        console.log(JSON.stringify(RES.data))
        this.setState({getData : RES.data.filter(item => item.id === 1)})
        //this.setState({getData : RES.data})
        
      }
    );

    console.log('---------------post call--------')
    let payload = {
      userId: 19,
      id: 12,
      title: "Post data inserted",
      body: "pava"
    };

    // post call 
    axios.post("https://jsonplaceholder.typicode.com/posts", payload).then(
      RES => {
         console.log('post call')
        this.setState({ data: RES.data });
        console.log('RES',JSON.stringify(this.state.data).length);
      }
    );

    // delete call
    axios.delete("https://jsonplaceholder.typicode.com/posts")
    .then(res => {
      this.setState({ data: res.data }).filter(item => item.id === "1");  
    })
    
  };

  render() {
    return (
      <div>
          {Object.keys(this.state.getData).map((key) => (
          <div className="container">
            <label>get Call Data</label><br/>
            <hr/>
            <span className="left">{"userID : "+this.state.getData[key].userId}</span> <br/>
            <span className="right">{"Title : " + this.state.getData[key].title}</span> <br/>
            <span className="right">{"Body : " + this.state.getData[key].body}</span>
            <hr/>
          </div>         
        ))} 

        {Object.keys(this.state.data).map((key) => (
        <div className="container">
          <hr/>
            <div></div>
            <label>Post call data</label><br/>
           
            <span className="left">{key}</span><br/>
            <span className="right">{":   " + this.state.data[key]}</span>
            <hr/>
          </div>
        ))} 
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
