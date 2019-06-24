import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getBooks} from '../actions'

const mapStateToProps = function (state){
	return {
		books : state.book.books
	}
}

const mapDispatchToProps = function (dispatch){
	return {
			actions :  bindActionCreators({
			getBooks
		}, dispatch)
	}
}

class BookList extends Component {
	componentDidMount(){
		this.props.actions.getBooks()
	}
  render() {
  	let {books} = this.props
    return (
      <div>
      	<h3>List of books</h3>
      	{books.map((e) => <div>{e.title}</div>)}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
