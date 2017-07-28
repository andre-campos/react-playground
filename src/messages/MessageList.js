import React, { Component } from 'react';
import {Grid, Modal, Button, Row, Col, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import MessageItem from './MessageItem.js';

class MessageList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
        this.onDelete = this.onDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loadData = this.loadData.bind(this);
        this.loadData();
    }

    loadData(url){
    	url = url || this.props.url + '/messages/';
    	var _this = this;
    	fetch(url).then( (result) => result.json().then( (data) => _this.setState({list: data.results, next: data.next, previous: data.previous})));
    }
    openModal(){
    	this.setState({showModal: true});
    }
    closeModal(){
    	this.setState({showModal: false});	
    }
    save() {
    	var message = {
    		text: this.state.text,
    		author: this.state.author,
    		created_at: new Date(),
    	}
    	var _this = this;
    	fetch (this.props.url + '/messages/', {
    		method: 'POST', 
    		headers:{
    			'Content-Type': 'application/json'
    		},
    		body: JSON.stringify(message)
    	}).then( (success) => {
    		success.json().then ( (newMessage) => {
    			var list = _this.state.list;
    			list.unshift(newMessage);
    			_this.setState({list: list});
    			_this.closeModal();
    		});
    	})
    }
    //Assumes the state has the field names defined on the form
    handleChange(event) {
    	var state = {};
    	state[event.target.name] = event.target.value;
		this.setState(state);
	}
    onDelete(toDelete){
    	var _this = this;
    	if (confirm("Are you sure you want to delete this message? This cannot be undone")){
            fetch(toDelete.url, {method: 'DELETE'}).then ( () => {
            	var list = _this.state.list.filter( item => item.id !== toDelete.id);
            	_this.setState({list: list});	
            });
        }
    }
    render() {
    	return (
    		<div>
	    		<Grid>
		    		<Row>
		    			<Col xs={12} md={8}>
		    				<h3>Awesome Message Board</h3>
		    				<p className="text-left">
		    				Please feel free to view, add end remove messages. For security reasons, the delete button only appears when you view the message. Moreover, use the buttons <strong>Previous</strong> and <strong>Next</strong> to navigate through the pages.
		    				</p>
		    			</Col>
		    			<Col xs={12} md={4}>
		    				<h3>
				    		<Button className="pull-right" bsStyle="primary" bsSize="small" onClick={() => this.openModal()}>
				    			<i className="fa fa-pencil-square-o"></i> Create Message          
							</Button>
							</h3>
						</Col>
					</Row>
					<Row>
						<Col xs={6}>
							<Button  onClick={() => this.loadData(this.state.previous) } className={this.state.previous ? 'pull-left' : 'hidden'}>Previous</Button>
			    		</Col>
			    		<Col xs={6}>
			    			<Button  onClick={() => this.loadData(this.state.next) } className={this.state.next ? 'pull-right' : 'hidden'}>Next</Button>
			    		</Col>
					</Row>
		    		{
		    			this.state.list.map((item, index) => <MessageItem item={item} key={item.id} onDelete={this.onDelete}/>)
		    		}
	    		</Grid>
	    		<Modal show={this.state.showModal}>
		    		<Modal.Header closeButton>
		    			<Modal.Title>Insert Message</Modal.Title>
		    		</Modal.Header>
		    		<Modal.Body>
		    			<form>
	    			        <FormGroup controlId="formBasicText">
	    			        	<ControlLabel>Text</ControlLabel>
	    			        	<FormControl componentClass="textarea" name="text" placeholder="Enter your message" value={this.state.text} onChange={this.handleChange}/>
	    			        </FormGroup>
	    			        <FormGroup controlId="formBasicText">
	    			          <ControlLabel>Author</ControlLabel>
	    			          <FormControl type="text" name="author" value={this.state.author} placeholder="Enter author" onChange={this.handleChange}/>
	    			        </FormGroup>
	    			    </form>
		    		</Modal.Body>
		    		<Modal.Footer>
			    		<Button className="pull-left" onClick={() => this.closeModal() }>Cancel</Button>
			    		<Button onClick={() => this.save(this.state.text, this.state.author) } bsStyle="success">Save</Button>
		    		</Modal.Footer>
	    		</Modal>
    		</div>
    		)
    }
};

export default MessageList;