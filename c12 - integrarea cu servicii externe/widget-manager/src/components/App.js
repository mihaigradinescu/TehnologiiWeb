import React, { Component } from 'react'
import WidgetList from '../containers/WidgetList'
import AddWidgetForm from '../containers/AddWidgetForm'


class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Widget manager</h1>
          <WidgetList />
          <AddWidgetForm />
        </header>
      </div>
    )
  }
}

export default App