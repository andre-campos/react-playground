import React, { Component } from 'react';
import Moment from 'moment';

import { Row, Col, Button } from 'react-bootstrap';


class MessageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };
    }
    showMessage(){
        var _this = this;
        var item = this.state.item;
        if (this.state.loaded){
            this.setState({item: item, showDetails:!this.state.showDetails, loaded: true});
        }else{
            fetch(this.state.item.url).then( (result) => result.json().then( (data) => {
                data.url = this.state.item.url;
                _this.setState({item: data, showDetails:true, loaded: true});
            }));    
        }
    }
    render() {
        return (
        	<Row className="mt-10">
                <Col xs={12} md={8} className="text-left">
                    <p>{this.state.item.text}<br/>
                        <a onClick={() => this.showMessage()} href="#">Show {this.state.showDetails ? 'less' : 'more...'}</a>
                    </p>
                    <div className={this.state.showDetails ? '' : 'hidden'}>
                        <p><strong>Id</strong>: {this.state.item.id}<br/>
                        <strong>Author</strong>: {this.state.item.author}<br/>
                        <strong>Created at</strong>: {Moment(this.state.item.created_at).format('DD/MM/YYYY HH:mm')}<br/>
                        <strong>Updated at</strong>: {Moment(this.state.item.updated_at).format('DD/MM/YYYY HH:mm')}</p>
                        <Button className="pull-right" bsStyle="danger" bsSize="xsmall" onClick={() => this.props.onDelete(this.state.item)}>
                            <i className="fa fa-trash"></i> Delete
                        </Button>
                    </div>
                </Col>
                <Col xs={12} md={4}>
                    <p className="text-right"><small>Created at {Moment(this.state.item.created_at).format('DD/MM/YYYY HH:mm')}</small></p>               
                </Col>
        	</Row>
        )
    }
};

export default MessageItem;