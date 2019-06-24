import React, { Component } from 'react';

class ChapterAddForm extends Component {
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
        	<label htmlFor="title">Title</label>
        	<input type="text" name="title" id="title" onChange={this.handleChange}/>
        	<label htmlFor="content">Content</label>

        	<input type="text" name="content" id="content" onChange={this.handleChange}/>
        	<input type="button" value="+" onClick={() => this.props.onAdd({
        		title : this.state.title,
        		content : this.state.content
        	})}/>
        </form>
      </div>
    )
  }
}

export default ChapterAddForm
