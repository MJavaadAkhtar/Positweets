import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/Login.css';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import axios from 'axios';


class Signup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'msg': this.props.msg,
            fullname:"",
            u_uid:"",
            pwd:"",
        }
        this.send_form = this.send_form.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    send_form(event){
        event.preventDefault();
        const dict = {
            "full_name":this.state.fullname,
            "username":this.state.u_uid,
            "password":this.state.pwd
        }
        fetch("api/addUsers/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dict)
        }).then(res => res.json())
            .then((data) => {
                console.log(data)
            }).catch(err => {
                console.log(err)
            })
    }

    handleChange(event){
        const {name,value} = event.target
        this.setState({
            [name]:value
        })
    }

    render() {
        return (
            <div>
                <AwesomeButton size="icon" type="primary" href="/"><i className="fa fa-arrow-left" /></AwesomeButton>
                <div className="login">
                    <div className="center">
                        <h2>{this.state.msg.title}</h2>
                        <br></br>
                        <h5>{this.state.msg['signup-screen']}</h5>
                    </div>

                    <div className="search-container center">
                        <form onSubmit={this.send_form}>
                            <input type="text" placeholder="Full Name" name="fullname" valid={this.state.fullname} onChange={this.handleChange}/>
                            <input className="mt-2" type="text" placeholder="username" name="u_uid" valid={this.state.u_uid} onChange={this.handleChange}/>
                            <input className="mt-2" type="password" placeholder="Password" name="pwd" valid={this.state.pwd} onChange={this.handleChange}/>
                            <AwesomeButton className="mt-3" type="primary submit" size="large">Sign Up</AwesomeButton>
                        </form>
                    </div>
                </div>
            </div>
           
        )
    }
}

export default Signup;