import axios from 'axios'

const SERVER = 'http://localhost:8080'

export const GET_BOOKS = 'GET_BOOKS'

export function getBooks(){
	return {
		type : 'GET_BOOKS',
		payload : axios(`${SERVER}/books`)
	}
}