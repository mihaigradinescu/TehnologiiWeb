import axios from 'axios'
import {EventEmitter} from 'fbemitter'

const SERVER = 'http://localhost:8080'

class BookStore{
	constructor(){
		this.emitter = new EventEmitter()
		this.content = []
		this.selected = null
	}
	async addOne(book){
		try{
			let response = await axios.post(`${SERVER}/books`, book)
			await this.getAll()
			this.emitter.emit('ADD_SUCCESS')
		}
		catch(ex){
			console.warn(ex)
			this.emitter.emit('ADD_ERROR')
		}
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
	async deleteOne(id){
        try {
            await axios.delete(`${SERVER}/books/${id}`)
            await this.getAll()
            this.emitter.emit('DELETE_SUCCESS')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('DELETE_ERROR')
        }
	}
	async saveOne(id, book){
        try {
            await axios.put(`${SERVER}/books/${id}`, book)
            await this.getAll()
            this.emitter.emit('SAVE_SUCCESS')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('SAVE_ERROR')
        }
	}
	async getOne(id){
        try {
            let response = await axios(`${SERVER}/books/${id}`)
            this.selected = response.data
            this.emitter.emit('GET_ONE_SUCCESS')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('GET_ONE_ERROR')
        }
	}

}

export default BookStore