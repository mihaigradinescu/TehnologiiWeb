import React, { Component } from 'react';
import BookList from './BookList'

class Book extends Component {
	constructor(props){
		super(props)
		this.state = {
			isEditing : false,
			title : this.props.item.title,
			content : this.props.item.content
		}
		this.handleChange = (evt) => {
			this.setState({
				[evt.target.name] : evt.target.value
			})
		}
	}
  render() {
  	if (this.state.isEditing){
  		return (
  			<div>
  				I am a book with title 
      		<input type="text" name="title" id="title" onChange={this.handleChange} value={this.state.title} />
	        and content
	        <input type="text" name="content" id="content" onChange={this.handleChange} value={this.state.content}/>
	        <input type="button" value="save" onClick={() => {
	        	this.props.onSave(this.props.item.id, {
	        		title : this.state.title,
	        		content : this.state.content
	        	})
	        	this.setState({
	        		isEditing : false
	        	})
	        }} />	
  				<input type="button" value="cancel" onClick={() => this.setState({isEditing : false})} />	
  			</div>
  		)
  	}
  	else{
	    return (
	      <div>
	        I am a book with title 
	        {this.props.item.title}
	        and content
	        {this.props.item.content}
	        <input type="button" value="delete" onClick={() => this.props.onDelete(this.props.item.id)} />
	        <input type="button" value="edit" onClick={() => this.setState({isEditing : true})} />	        
	      </div>
	    )  		
  	}
  }
}

export default Book
