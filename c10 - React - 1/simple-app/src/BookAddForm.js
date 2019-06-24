import React, { Component } from 'react';

class BookAddForm extends Component {
	constructor(props){
		super(props)
		this.state = {
			title : '',
			content : ''
		}
		this.handleChange = (evt) => {
			this.setState({
				[evt.target.name] : evt.target.value
			})
		}
	}
  render() {
    return (
      <div>
      	<form>
      		<label for="title">My title</label>
      		<input type="text" name="title" id="title" onChange={this.handleChange} />
      		<label for="content">My content</label>
      		<input type="text" name="content" id="content" onChange={this.handleChange} />
      		<input type="button" value="add" onClick={() => this.props.onAdd({
      			title : this.state.title,
      			content : this.state.content
      		})} />

      	</form>
      </div>
    )
  }
}

export default BookAddForm
