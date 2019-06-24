import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addWidget } from '../actions'


class AddWidgetForm extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>A form to add more widgets</h1>
        </header>
        <form>
        	<input type="button" value="add one" onClick={() => dispatch()} />
        </form>
      </div>
    )
  }
}

export default AddWidgetForm