import React from 'react';
import '../../styles/feed.css';
import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
// import 'react-awesome-button/dist/themes';
import {
    Redirect,
    Link
} from "react-router-dom";
import { func } from 'prop-types';
import { PushSpinner, RotateSpinner } from "react-spinners-kit";
import logo from './avatar.png';


function UserFeed(props) {

    const userLink = "/user/" + props.props[3]
    return (
        <div className="neo mt-3 mb-3 p-2">
            <div >
                <div>
                    <h2 style={{ fontWeight: 'bold' }} >
                        {props.props[4]}
                    </h2>
                </div>
                {/* <hr></hr> */}
                <div style={{ marginTop: '1em', marginBottom: '0.5em', height: "148px", overflow: "hidden" }} >
                    {props.props[0]}
                </div>
                {/* <div className="text-secondary">{props.props[2]}</div> */}
                {/* <hr></hr> */}
                <div className="right_align">
                    <small> {props.props[1]}</small>
                    <span className="left_align col3" >
                        {props.props[2] == 0 ? <small className="text-danger">&#128533; negative</small> : props.props[2] == 1 ? <small className="text-success">&#128512; positive</small> : <small className="text-secondary">&#x2753; unknown</small>}

                    </span>
                </div>
            </div>
        </div>
    )

}



class UserPage extends React.Component{
    constructor(props) {
        super(props)


        // console.log({{ hello }});
        this.state={
            userID:props.location.state.clickedUser,
            loginID:props.location.state.username,
            name:"",
            image:null,
            username:"",
            edit_permission:false,
            posts:[],
            error:"",
            propUrl: props.location.pathname,
            imgsrc:logo,
        }
        this.fetchUserTweets = this.fetchUserTweets.bind(this)
    }

    fetchUserTweets(){

        fetch('/api/getUserBlog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'id':this.state.userID
            })
        }).then(res => res.json())
            .then((data) => {
                this.setState({
                    posts: data
                })
            })
    }

    

    componentDidMount(){
        fetch(`/api/Users/${this.state.userID}/`, {
            method: 'GET'
        }).then(res => res.json())
            .then((data) => {
                // console.log(data)
                this.setState({
                    name:data.full_name,
                    username:data.username
                })
            })
        this.fetchUserTweets()
    }

    render(){
        
        const obj_post = this.state.posts
        const back_ref = "/blog/"+this.state.username
        return (
            <div className="main">
                <nav className="navbar navbar-light neo fixed-top">

                    <Link to={{
                        pathname: back_ref,
                        state: { is_login: true }
                    }}> Positweet </Link>
                    <div className="center_navbar">
                        
                        <div className="search-container">
                            <input disabled type="text" placeholder="Coming soon!"/>
                            <AwesomeButton size="icon" type="primary"  ><i className="fa fa-search" /></AwesomeButton>
                        </div>
                        
                    </div>
                    <div className="form-inline">
                        <AwesomeButton size="medium" type="secondary" onPress={this.logoutSubmit} >Logout</AwesomeButton>
                    </div>

                </nav>

                <div className="row" style={{marginTop:'5rem'}}>
                    <div className="col-3"></div>
                    <div className="col-7">
                        <div style={{ textAlign: 'center' }} className="userImage">
                            <i className="fa fa-user-circle fa-4x"/>
                        </div>
                        <h1 style={{textAlign:'center'}}>
                            {this.state.username}
                        </h1>
                        <div style={{ textAlign: 'center' }}>
                            {this.state.name}
                        </div>
                        <div className=" feed mt-4">
                            {/* <RotateSpinner className="center" size={70} color="#686769" loading={this.state.loader} /> */}
                            {Object.keys(obj_post).map((post, i) => <UserFeed props={obj_post[post]} key={i} />)}
                        </div>
                    </div>
                    
                    <div className="col-3"></div>

                </div>
                

            </div>
        )
    }
}

export default UserPage