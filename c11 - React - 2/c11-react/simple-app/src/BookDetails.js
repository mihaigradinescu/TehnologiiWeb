import React, { Component } from 'react';
import ChapterStore from './ChapterStore'
import Chapter from './Chapter'
import ChapterAddForm from './ChapterAddForm'

class BookDetails extends Component {
	constructor(props){
		super(props)
		this.state = {
			chapters : []
		}
		this.store = new ChapterStore()
		this.emitter = this.store.emitter
		this.add = (chapter) => {
			this.store.addOne(this.props.item.id, chapter)
		}
		this.delete = (chapterId) => {
			this.store.deleteOne(this.props.item.id, chapterId)
		}
		this.save = (chapterId, chapter) => {
			this.store.saveOne(this.props.item.id, chapterId, chapter)
		}
	}
	componentDidMount(){
		this.store.getAll(this.props.item.id)
		this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
			this.setState({
				chapters : this.store.content
			})
		})
	}
  render() {
    return (
      <div>
        <h3>I will be the details for {this.props.item.title}</h3>
        <div>
        	{
        		this.state.chapters.map((e, i) => <Chapter item={e} key={i} onDelete={this.delete} onSave={this.save} />)
        	}
        </div>
        <div>
        	<ChapterAddForm onAdd={this.add} />
        </div>
        <form>
        	<input type="button" value="back" onClick={() => this.props.onCancel()} />
        </form>
      </div>
    )
  }
}

export default BookDetails
