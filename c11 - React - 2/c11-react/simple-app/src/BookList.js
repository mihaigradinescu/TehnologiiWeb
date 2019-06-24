import React, { Component } from 'react';
import Book from './Book'
import BookAddForm from './BookAddForm'
import BookDetails from './BookDetails'

import BookStore from './BookStore'

class BookList extends Component {
	constructor(){
		super()
		this.state ={
			books : [],
			detailsFor : -1,
			selected : null
		}
		this.store = new BookStore()
		this.emitter = this.store.emitter
		this.add = (book) => {
			this.store.addOne(book)
		}
		this.delete = (id) => {
			this.store.deleteOne(id)
		}
		this.save = (id, book) => {
			this.store.saveOne(id, book)
		}
		this.showDetails = (id) => {
			this.store.getOne(id)
			this.store.emitter.addListener('GET_ONE_SUCCESS', () => {
				this.setState({
					selected : this.store.selected,
					detailsFor : id
				})
			})
		}
		this.hideDetails = () => {
			this.setState({
				detailsFor : -1
			})
		}
	}
	componentDidMount(){
		this.store.getAll()
		this.emitter.addListener('GET_ALL_SUCCESS', () => {
			this.setState({
				books : this.store.content
			})
		})
	}
  render() {
  	if (this.state.detailsFor === -1){
	    return (
	      <div>
	      	<div>
		      	{
		      		this.state.books.map((e, i) => <Book item={e} key={i} onDelete={this.delete} onSave={this.save} onSelect={this.showDetails}/>
		      		)
		      	}
	      	</div>
	      	<BookAddForm onAdd={this.add} />
	      </div>
	    )  		
  	}
  	else{
  		return <BookDetails item={this.state.selected} onCancel={this.hideDetails}/>
  	}
  }
}

export default BookList
