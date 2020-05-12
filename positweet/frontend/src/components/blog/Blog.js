import React from 'react';
import '../../styles/feed.css';
import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
// import 'react-awesome-button/dist/themes';
import {
    Redirect
} from "react-router-dom";
import { func } from 'prop-types';
import { PushSpinner, RotateSpinner } from "react-spinners-kit";

class UserProperty extends React.Component {
    constructor(props){
        super(props)
        this.state={
            username:this.props.props.username,
            fullname: this.props.props.fullname,
            score:0,
            id: this.props.props.id
        }
    }

    render(){

    return (
        <div className="position-fixed">
            <div className="font-weight-bold">
                PosiTweet Username:
                </div>

            <div>
                {'@' + this.state.username}
            </div>

            <br></br>

            <div className="font-weight-bold">
                Full Name:
                </div>
            <div>
                {this.state.fullname}
            </div>
            <br></br>
        </div>
    )
    }
}

function PostFeed(props) {
    console.log(props.props)
    return (
        <div className="neo mt-3 mb-3 p-2">
            
            <div> 
                <small>{'@'+props.props[3]}</small> 
            </div>

            <div> 
                {props.props[0]}
            </div>
            {/* <div className="text-secondary">{props.props[2]}</div> */}
            <hr></hr>
            <div className="right_align">
                <small> {props.props[1]}</small>
                <span className="left_align col3" >
                    {props.props[2] == 0 ? <small className="text-danger">&#128533; negative</small> : props.props[2] == 1 ? <small className="text-success">&#128512; positive</small> : <small className="text-secondary">&#x2753; unknown</small>}

                </span>
            </div>
        </div>
    )

}

class Trending extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text_area:"",
            id:this.props.id,
            getTweet: this.props.data_fun
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    onSubmit(next){
        console.log('comeshhere');
        fetch("api/addPost",{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'id':this.state.id,
                'post':this.state.text_area,
                'sentiment':0
            })
        }).then(res => res.json())
            .then((data) => {
                console.log(data)
            })

        setTimeout(function (st=this.state) {
            st.getTweet()
            next()
            this.setState({
                text_area: ""
            })
        }.bind(this), 2000);

       
        
    }

    render() {

        return (
            <div>
                {/* <form onSubmit={this.onSubmit}> */}
                    <textarea rows="10" name="text_area" value={this.state.text_area} onChange={this.handleChange}></textarea>
                <AwesomeButtonProgress
                resultLabel="Posted" loadingLabel="Posting..." size='large' type='primary' 
                action={(element, next) => this.onSubmit(next)}
                >
                    Post
                </AwesomeButtonProgress>
                {/* </form> */}
                
            </div>
        )
    }
}

class Blog extends React.Component {

    constructor(props) {
        super(props)
        console.log(this.props.location)
        if (this.props.location.state == undefined){
            this.temp_userdata = {
                username: "",
                refresh_required: false,
                fullname: "",
                id: ""}
            this.login = false,
            this.msg = ""
        } 
        else{
            this.username = this.props.location.state.username
            this.url_uname = this.props.match.params.name
            this.temp_userdata = {
                username: this.url_uname,
                refresh_required: this.username == this.url_uname ? false : true,
                fullname: this.props.location.state.fullname,
                id: this.props.location.state.id
            }
            this.login = this.props.location.state.is_login,
            this.msg = this.props.location.state.msg
        }
       

        // this.state = {
        //     userdata: {
        //         username: this.url_uname,
        //         refresh_required: this.username == this.url_uname ? false : true,
        //         fullName: "",
        //         id: this.props.location.state.id
        //     },
        //     is_login: this.props.location.state.is_login,
        //     msg: this.props.location.state.msg,
        //     posts:[]
        // }
        this.state = {
            userdata: this.temp_userdata,
            is_login: this.login,
            msg: this.msg,
            posts: []
        }
        this.handleChange = this.handleChange.bind(this)
        
        // this.submitSearch = this.submitSearch.bind(this)
        this.getTweets = this.getTweets.bind(this)
        this.logoutSubmit = this.logoutSubmit.bind(this)
    }

    getTweets() {
        console.log('getTweet()')
        fetch("/api/getBlogs", {
            method: 'GET'
        }).then(res => res.json())
            .then((data) => {
                this.setState({
                    posts: data
                })
            })
    }

    componentDidMount() {

        this.getTweets()

    }

    // submitSearch(event) {
    //     var data_req = ""

    //     this.setState({ loader: true })

    //     fetch("/api/SearchUser", {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ 'username': this.state.search })
    //     }).then(res => res.json())
    //         .then((data) => {
    //             data_req = data
    //             if (data_req.error) {
    //                 this.setState({
    //                     err: data_req.error,
    //                     loader: false
    //                 })
    //             } else {
    //                 this.setState({
    //                     err: "",
    //                     userdata: {
    //                         username: data.username,
    //                         refresh_required: this.username == this.url_uname ? false : true,
    //                         fullName: data.name,
    //                         followr_count: data.follower_count,
    //                         friend_count: data.friend_count
    //                     },
    //                     loader: false
    //                 })
    //             }
    //         }).catch(err => {
    //             console.log(err)
    //         })
    //     this.getTweets()
    // }
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    logoutSubmit(event){
        const temp_userdata = {
            username: "",
            refresh_required: false,
            fullname: "",
            id: ""
        }
        this.setState({
            userdata:temp_userdata,
            is_login:false
        })
    }

    render() {
        if (this.state.is_login == false){
            return(
            <Redirect to={{
                pathname:'/login',
                state:{
                    is_login:this.state.is_login
                }
            }}
            />)
        }
        const obj_post = this.state.posts
        // obj_post.map((data)=> console.log(data))
        // Object.keys(obj_post).map((data) => console.log(obj_post[data]))
        // console.log(Object.keys(obj_post).length)

        return (
            <div className="main">

                <nav className="navbar navbar-light neo fixed-top">
                    <a className="navbar-brand" href="#">
                        Positweet
                    </a>
                    <div className="center_navbar">
                        <div className="search-container">
                            <input type="text" placeholder="Search .." name="search" value={this.state.search} onChange={this.handleChange} />
                            <AwesomeButton size="icon" type="primary"  ><i className="fa fa-search" /></AwesomeButton>
                        </div>
                    </div>
                    <div className="form-inline">
                        <AwesomeButton size="medium" type="secondary" onPress={this.logoutSubmit} >Logout</AwesomeButton>
                    </div>
                    
                </nav>

                <div className="row mt-5">

                    <div className="col user mt-5">
                        <UserProperty props={this.state.userdata} />
                    </div>

                    <div className="col-7 feed mt-4">
                        {/* <RotateSpinner className="center" size={70} color="#686769" loading={this.state.loader} /> */}
                        {Object.keys(obj_post).map((post,i) => <PostFeed props={obj_post[post]} key={i} />)}
                    </div>

                    <div className="col common mt-5">
                        <Trending id={this.state.userdata.id} data_fun={this.getTweets}/>
                    </div>

                </div>
            </div>
        )
    }
}

export default Blog