import React from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import ReactHtmlParser from 'react-html-parser';


const client = new W3CWebSocket('ws://127.0.0.1:5000');
class ChatBox extends React.Component{
    constructor(props){
        super(props)


        this.state = {
            webMsg:[],
            msgUser:"",
            uname:this.props.uname
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitMsg=this.submitMsg.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    componentDidMount(){
        client.onopen = () => {
            console.log('Websocket Client Connected');
            client.send(JSON.stringify({
                msgType:"connection",
                uname:this.state.uname,
                content: ""
            }));
        };

        client.onmessage = (message) => {
            let msg = JSON.parse(message.data);
            switch (msg.type){
                case 'UserMsg':
                    let prevMsg = this.state.webMsg;
                    prevMsg.push(msg.data)
                    this.setState({
                        webMsg:prevMsg
                    });
                    break;
                default:
                    console.log("no message")
            }
            
            
        };

        client.onclose = e => {
            console.log('closed');
        };
    }


    submitMsg(event){
        event.preventDefault();
        client.send(JSON.stringify({
            msgType:"msg",
            uname:this.state.uname,
            content: this.state.msgUser
        }))
        this.setState({
            msgUser:""
        })
    }

    render(){
        const msg = this.state.webMsg
        return (
            <div className="sticky-bottom" style={{bottom:'10px',position:'fixed', right:'10px'}}>
                
                <div 
                style={{padding:'10px',overflow:'auto',height:'300px', backgroundColor:'white', whiteSpace:'break-spaces'}}>
                    {msg.map( (message, id) => {
                        return (<div style={{whiteSpace:'normal'}} key={id}> {ReactHtmlParser(message)} </div>);
                    }) }
                </div>

                <form onSubmit={this.submitMsg}>
                    <div className="input-group">
                        <input type="text" 
                        style={{height:'auto'}}
                        name="msgUser" value={this.state.msgUser} onChange={this.handleChange} className="form-control form-control-sm" placeholder="Search"></input>
                        <div className="input-group-btn">
                        <button className="btn btn-default" type="submit">
                                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                        </button>
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}

export default ChatBox;