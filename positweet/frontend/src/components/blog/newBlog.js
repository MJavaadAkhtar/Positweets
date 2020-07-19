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


class NewBlogPost extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props.location.state)
        this.state = {
            username:this.props.location.state.username,
            id:this.props.location.state.id,
            text_area: "",
            title: "",
            error: "",
            posted:false,
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

    onSubmit(next) {
        console.log(this.state);
        fetch("api/addPost", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'uname': this.state.username,
                'post': this.state.text_area,
                'sentiment': 0,
                'title': this.state.title
            })
        }).then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    error: data.error
                })
            })

        setTimeout(function (st = this.state) {
            // st.getTweet()
            next()
            this.setState({
                text_area: "",
                title: "",
                posted:true
            })
        }.bind(this), 2000);



    }


    render(){
        const back_ref = "/blog/" + this.state.username
        if (this.state.posted===true){
           return ( <Redirect to={{
                pathname: back_ref,
                state: {
                    is_login: true
                }
            }} />)
        }

        
        return(
        <div className="main">
            <nav className="navbar navbar-light neo fixed-top">

                <Link to={{
                    pathname: back_ref,
                    state: { is_login: true }
                }}> Positweet </Link>
                <div className="center_navbar">

                    <div className="search-container">
                       <h3>Write new Blogpost</h3>
                    </div>

                </div>
                <div className="form-inline">
                    <AwesomeButton size="medium" type="secondary" onPress={this.logoutSubmit} >Logout</AwesomeButton>
                </div>

            </nav>

            <div className="row" style={{ marginTop: '5rem' }}>
                <div className="col-3"></div>
                <div className="col-7">
                        <div className='sticky-top' style={{ top: '5em' }}>
                            
                            {/* <form onSubmit={this.onSubmit}> */}
                            <p style={{ color: 'red' }}>{this.state.error}</p>
                            <input style={{ height: '30px', fontSize: '10pt', width: '100%', marginBottom: '1em' }}
                                type="text" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
                            <textarea rows="10" name="text_area" value={this.state.text_area} onChange={this.handleChange}></textarea>
                            <AwesomeButtonProgress
                                resultLabel="Posted" loadingLabel="Posting..." size='large' type='primary'
                                disabled={this.state.title == '' || this.state.text_area == '' ? true : false}
                                action={(element, next) => this.onSubmit(next)}
                            >
                                Post
                </AwesomeButtonProgress>

                        </div>
                </div>

                <div className="col-3"></div>

            </div>


        </div>)
    }

}

export default NewBlogPost;