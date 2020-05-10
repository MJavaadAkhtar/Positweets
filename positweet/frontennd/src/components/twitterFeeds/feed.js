import React from 'react';
import '../../styles/feed.css';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
// import 'react-awesome-button/dist/themes';
import {
    Redirect
} from "react-router-dom";
import { func } from 'prop-types';
import { PushSpinner, RotateSpinner} from "react-spinners-kit";

function UserProperty(props){

        return (
            <div className="position-fixed">
                <div className="font-weight-bold">
                    Tweeter Username:
                </div>

                <div>
                    {'@'+props.props.username}
                </div>

                <br></br>


                <div className="font-weight-bold">
                    Full Name:
                </div>

                <div>
                    {props.props.fullName}
                </div>

                <br></br>


                <div className="font-weight-bold">
                    # of Followers:
                </div>

                <div>
                    {props.props.followr_count}
                </div>

                <br></br>


                <div className="font-weight-bold">
                    # of Following:
                </div>

                <div>
                    {props.props.friend_count}
                </div>
        </div>

        )
    
}

function TweeterFeed(props){
    // console.log(props.props[0])
        return (
            <div className="neo mt-3 mb-3 p-2">
                {props.props[0].is_RT ? <div className="text-secondary"> retweet < i className="fa fa-retweet" aria-hidden="true"></i> </div>:""}
                {props.props[0].text}
                {props.props[0].media ==  ""?"":<img src={props.props[0].media} className="fit-image"></img>}
                <br></br>
                {props.props[0].sentiment == 0 ? <small className="mt-1 text-danger">&#128533; negative</small> : <small className="mt-1 text-success">&#128512; positive</small>}
            </div>
        )
    
}

class Trending extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            trend:[],
        }
    }

    componentDidMount(){
        fetch("api/getTrend", {
            method: 'GET'
        }).then(res => res.json())
            .then((data) => {
                 this.setState({
                    trend:data.trend
                 })
            })
    }

    render() {
        const trend_lst = this.state.trend

        return (
            <div className="position-fixed">
                <h6 className="font-weight-bold">Trending in Canada:</h6>
                {trend_lst.map((trend, i) => <div key={i} className="mb-2 pl-3"> <a href={trend[1]} target="_blank">{trend[0]} </a> </div> ) }

            </div>
        )
    }
}

class Feed extends React.Component{

    constructor(props){
        super(props)

        this.username = this.props.location.state.username
        this.url_uname = this.props.match.params.name

        this.state={
            userdata:{
                username: this.url_uname,
                refresh_required: this.username == this.url_uname ? false : true,
                fullName: this.props.location.state.name,
                followr_count: this.props.location.state.follower_count,
                friend_count: this.props.location.state.friend_count,
            },
            tweets:[],
            search: this.url_uname,
            redirect_to_feed: false,
            err: "",
            loader:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitSearch = this.submitSearch.bind(this)
        this.getTweets = this.getTweets.bind(this)
    }

    getTweets(){
        fetch("/api/getTweets", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'username': this.state.userdata.username })
        }).then(res => res.json())
            .then((data) => {
                this.setState({
                    tweets: data.tweet
                })
            })
    }

    componentDidMount(){

       this.getTweets()

    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.userdata.username !== prevState.userdata.username) {
            // console.log(this.state.userdata.username)
            this.getTweets()
            this.setState({
                loader:false
            })
        }
    }

    submitSearch(event) {
        var data_req = ""

        this.setState({loader:true})

        fetch("/api/SearchUser", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'username': this.state.search })
        }).then(res => res.json())
            .then((data) => {
                data_req = data
                if (data_req.error) {
                    this.setState({
                        err: data_req.error,
                        loader:false
                    })
                } else {
                    this.props.history.push('/tweeterFeed/' + data.username );
                    this.setState({
                        err: "",
                        userdata: {
                            username: data.username,
                            refresh_required: this.username == this.url_uname ? false : true,
                            fullName: data.name,
                            followr_count: data.follower_count,
                            friend_count: data.friend_count
                        },
                        // loader:false
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        // this.getTweets()
    }
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {


        const tweets_user = this.state.tweets

        return (
            <div className="main">
                
                <nav className="navbar navbar-light neo fixed-top">
                    <a className="navbar-brand" href="#">
                            Bootstrap
                    </a>
                    <div className="center_navbar">
                        <div className="search-container">
                            <input type="text" placeholder="Search .." name="search" value={this.state.search} onChange={this.handleChange}/>
                            <AwesomeButton size="icon" type="primary" onPress={this.submitSearch} ><i className="fa fa-search" /></AwesomeButton>
                        </div>
                    </div>
                </nav>

                <div className="row mt-5">

                    <div className="col user mt-5">
                        <UserProperty props={this.state.userdata}/>
                    </div>

                    <div className="col-7 feed mt-4">
                        <div className="center_spinner">
                            <RotateSpinner size={70} color="#686769" loading={this.state.loader} />
                        </div>
                        
                        {tweets_user.map((tweet, i) => <TweeterFeed props={tweet} key={i} /> )}
                    </div>

                    <div className="col common mt-5">
                        <Trending />
                    </div>

                </div>
            </div>
        )
    }
}

export default Feed