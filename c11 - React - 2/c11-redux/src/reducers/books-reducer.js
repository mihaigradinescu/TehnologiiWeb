const INITIAL_STATE = {
	books : [],
	error : null,
	fetching : false,
	fetched : false
}

export default function reducer(state = INITIAL_STATE, action){
	switch(action.type){
		case 'GET_BOOKS_PENDING':
			return {...state, error : null, fetching : true, fetched : false}
		case 'GET_BOOKS_FULFILLED':
			return {...state, books : action.payload.data, error : null, fetching : false, fetched : true}
		case 'GET_BOOKS_REJECTED':				
			return {...state, books : [], error : action.payload, fetching : false, fetched : false}
		default:
			return state
	}
}