import axios from 'axios'
import {EventEmitter} from 'fbemitter'

const SERVER = 'http://localhost:8080'

class ChapterStore{
	constructor(){
		this.emitter = new EventEmitter()
		this.content = []
		this.selected = null
	}
	async addOne(bookId, chapter){
		try{
			let response = await axios.post(`${SERVER}/books/${bookId}/chapters`, chapter)
			await this.getAll(bookId)
			this.emitter.emit('ADD_SUCCESS')
		}
		catch(ex){
			console.warn(ex)
			this.emitter.emit('ADD_ERROR')
		}
	}
	async getAll(bookId){
		try{
			let response = await axios(`${SERVER}/books/${bookId}/chapters`)
			this.content = response.data
			this.emitter.emit('GET_ALL_SUCCESS')
		}
		catch(ex){
			console.warn(ex)
			this.emitter.emit('GET_ALL_ERROR')
		}
	}
	async deleteOne(bookId, chapterId){
        try {
            await axios.delete(`${SERVER}/books/${bookId}/chapters/${chapterId}`)
            await this.getAll(bookId)
            this.emitter.emit('DELETE_SUCCESS')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('DELETE_ERROR')
        }
	}
	async saveOne(bookId, chapterId, chapter){
        try {
            await axios.put(`${SERVER}/books/${bookId}/chapters/${chapterId}`, chapter)
            await this.getAll(bookId)
            this.emitter.emit('SAVE_SUCCESS')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('SAVE_ERROR')
        }
	}
	async getOne(bookId, chapterId){
        try {
            let response = await axios(`${SERVER}/books/${bookId}/chapters/${chapterId}`)
            this.selected = response.data
            this.emitter.emit('GET_ONE_SUCCESS')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('GET_ONE_ERROR')
        }
	}

}

export default ChapterStore