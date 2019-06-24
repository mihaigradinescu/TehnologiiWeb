import React, { Component } from 'react';
import BookStore from './BookStore'
import BookAddForm from './BookAddForm'
import Book from './Book'

class BookList extends Component {
	constructor(){
		super()
		this.state = {
			books : []
		}
		this.store = new BookStore()
		this.add = (book) => {
			this.store.addOne(book)
		}
		this.delete = (id) => {
			this.store.deleteOne(id)
		}
		this.save = (id, book) => {
			this.store.saveOne(id, book)
		}
	}
	componentDidMount(){
		this.store.getAll()
		this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
			this.setState({
				books : this.store.content
			})
		})
	}
  render() {
    return (
    	<div>
	      <div>
	        {
	        	this.state.books.map((e, i) => <Book item={e} key={i} onDelete={this.delete} onSave={this.save} />)
	        }
	      </div>
	      <BookAddForm onAdd={this.add}/>
      </div>
    );
  }
}

export default BookList
