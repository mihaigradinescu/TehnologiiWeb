import axios from 'axios'
import {EventEmitter} from 'fbemitter'

const SERVER = 'http://localhost:8080'

class BookStore{
	constructor(){
		this.content = []
		this.emitter = new EventEmitter()
	}
	async getAll(){
		try{
			let response = await axios(`${SERVER}/books`)
			this.content = response.data
			this.emitter.emit('GET_ALL_SUCCESS')			
		}
		catch(ex){
			console.warn(ex)
			this.emitter.emit('GET_ALL_ERROR')
		}
	}
	async addOne(book){
		try{
			let response = await axios.post(`${SERVER}/books`, book)
			this.getAll()
			this.emitter.emit('ADD_SUCCESS')			
		}
		catch(ex){
			console.warn(ex)
			this.emitter.emit('ADD_ERROR')
		}
	}
	async deleteOne(id){
		try{
			let response = await axios.delete(`${SERVER}/books/${id}`)
			this.getAll()
			this.emitter.emit('DELETE_SUCCESS')			
		}
		catch(ex){
			console.warn(ex)
			this.emitter.emit('DELETE_ERROR')
		}
	}
	async saveOne(id, book){
		try{
			let response = await axios.put(`${SERVER}/books/${id}`, book)
			this.getAll()
			this.emitter.emit('SAVE_SUCCESS')			
		}
		catch(ex){
			console.warn(ex)
			this.emitter.emit('SAVE_ERROR')
		}		
	}
}

export default BookStore