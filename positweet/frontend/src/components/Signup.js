import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/Login.css';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import axios from 'axios';
import { Redirect } from 'react-router';


class Signup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'msg': this.props.msg,
            fullname:"",
            u_uid:"",
            pwd:"",
            is_login:false,
            err:"",
            id:""
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
                if (data.login){
                    this.setState({
                        is_login: true,
                        err:"",
                        id:data.id
                    })
                }else{
                    this.setState({
                        err: "username is already taken"
                    })
                }
                
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

        if (this.state.is_login){
            const redirect_url = '/blog/' + this.state.u_uid
            return (
                <Redirect to={{
                    pathname: redirect_url,
                    state: {
                        username: this.state.username,
                        msg: this.state.msg,
                        is_login: this.state.is_login,
                        id: this.state.id,
                        fullname:this.state.fullname
                    }
                }} />
            )
        }

        return (
            <div>
                <AwesomeButton className="size" size="icon" type="primary" href="/login"><i className="fa fa-arrow-left" /></AwesomeButton>
                <div className="login">
                    <div className="center">
                        <AwesomeButton className="size" size="icon" type="primary" href="/" ><i className="fa fa-home" /></AwesomeButton>
                        <br></br>
                        <h2>{this.state.msg.name}</h2>
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