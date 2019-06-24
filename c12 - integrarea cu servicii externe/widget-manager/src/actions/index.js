let nextId = 0

export const addWidget = (name, description) => ({
  type: 'ADD_WIDGET',
  id: nextTodoId++,
  name: name,
  description: description
})
