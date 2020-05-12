import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/Login.css';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { Redirect } from 'react-router';


class Login extends React.Component{

    constructor(props){
        super(props)
        this.state={
            'msg':this.props.msg,
            username:"",
            pwd:"",
            is_login:false,
            err:"",
            id:"",
            fullname:""
        }
        this.submitForm = this.submitForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }

    submitForm(event) {
        event.preventDefault();
        const dict = {
            "username": this.state.username,
            "password": this.state.pwd
        }
        fetch("api/loginUser/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dict)
        }).then(res => res.json())
            .then((data) => {
                this.setState({
                    is_login:data.login,
                    err: data.login? "": "Wrong username or password",
                    id: data.login? data.id : "",
                    fullname: data.login? data.fullname:""

                })
            }).catch(err => {
                console.log(err)
            })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render(){

        if (this.state.is_login){
            const redirect_url = '/blog/' + this.state.username
            return (
                <Redirect to={{
                    pathname: redirect_url,
                    state: { 
                        username: this.state.username, 
                        msg: this.state.msg, 
                        is_login: this.state.is_login,
                        id:this.state.id,
                        fullname:this.state.fullname
                    }
                }} />
            )
        }

        return(
            <div className="login">
                <div className="center">
                    <AwesomeButton className="size" size="icon" type="primary" href="/" ><i className="fa fa-home" /></AwesomeButton>
                    <br></br>
                    <h2>{this.state.msg.name}</h2>
                    <br></br>
                    <h5>{this.state.msg['login-screen']}</h5>
                </div>

                <div className="search-container center">
                    <p className="text-danger">{this.state.err}</p>
                    <form onSubmit={this.submitForm}>
                        <input type="text" placeholder="Username" name="username" valid={this.state.username} onChange={this.handleChange}/>
                        <input className="mt-3" type="password" placeholder="Password" name="pwd" valid={this.state.pwd} onChange={this.handleChange}/>
                        <AwesomeButton className="mt-3" type="primary submit"  size="large">Sign In</AwesomeButton>
                    </form>
                    <div>
                        If you do not have an account, please <a href="/signup">sign up</a>.
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;