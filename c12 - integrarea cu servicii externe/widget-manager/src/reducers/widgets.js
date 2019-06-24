const DEFAULT_STATE = []

const widgets = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'ADD_WIDGET':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          description: action.description
        }
      ]
    default:
      return state
  }
}

export default widgets
