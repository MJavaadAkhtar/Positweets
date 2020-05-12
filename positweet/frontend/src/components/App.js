import React from 'react';
import '../styles/App.css';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
// import 'react-awesome-button/dist/themes';
import {
  Redirect
} from "react-router-dom";

class App extends React.Component {

  constructor(props){
    super(props)
    this.state={
      'msg':this.props.msg,
      search:"",
      err:"",
      userData:{},
      redirect_to_feed: false
      
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  submitSearch(event){
    var data_req = ""
    fetch("/api/SearchUser",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'username':this.state.search})
    }).then(res => res.json())
      .then((data) => {
        data_req = data
        if (data_req.error) {
          console.log(data)
          console.log(data_req)
          this.setState({
            err:data_req.error
          })
        }else{
          this.setState({
            err: "",
            userData:data_req,
            redirect_to_feed:true
          })
        }
      }).catch(err => {
        console.log(err)
      })

     
  }


  render() {

    if (this.state.redirect_to_feed){
      const redirect_url = '/tweeterFeed/' + this.state.userData.username
        return (< Redirect to={{
          pathname: redirect_url,
          state:this.state.userData
        }} />)
    }

    return (
      <div className="App">

        <div className="neo center_header">

          <div className="center_header">
            <h2>{this.state.msg.title}</h2>
          </div>

          <div className="center_header mt-5">
            <p>
              {this.state.msg.monologue}
            </p>
            <ul>
              <li>Can we use sentiment analysis to filter out negative contents using an LSTM. More detail regarding my trained LSTM can be found <a target="_blank" href="https://github.com/MJavaadAkhtar/sentiment-analysis-LSTM">here</a>.</li>
              <li>Can we use generative auto encoders to create positive contents. More information regarding my autoencoder coming soon.</li>
            </ul>
          </div>

        </div>

        {this.state.err == "" ? <p></p> : <p className="error center mt-1">Please enter a valid username</p>}

        <div className="center neo mt-5">
          <div className="search-container">
            <input type="text" placeholder="Search.." name="search" valid={this.state.search} onChange={this.handleChange} />
            <AwesomeButton size="icon" type="primary" onPress={this.submitSearch}><i className="fa fa-search" /></AwesomeButton>
          </div>
        </div>

        <div className="center mt-5">
          <AwesomeButton className="sign mr-1" type="primary" href="/login" size="large">{this.state.msg.login}</AwesomeButton>
          <AwesomeButton className="sign ml-1" type="secondary" href="/signup" size="large">Sign up</AwesomeButton>
          
        </div>

      </div>
    );
  }
 
 
}

export default App;
