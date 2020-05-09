import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/Login.css';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

class Login extends React.Component{

    constructor(props){
        super(props)
        this.state={
            'msg':this.props.msg,
            username:"",
            pwd:""
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
                console.log(data)
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
        return(
            <div className="login">
                <div className="center">
                    <h2>{this.state.msg.title}</h2>
                    <br></br>
                    <h5>{this.state.msg['login-screen']}</h5>
                </div>

                <div className="search-container center">
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