import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {edit: false, newTitle: ''}

  onDeleteTodoItem = () => {
    const {eachTodo, deleteFucntion} = this.props
    deleteFucntion(eachTodo.id)
  }

  onClickEdit = () => {
    const {eachTodo} = this.props
    this.setState({edit: true, newTitle: eachTodo.title})
  }

  onClickSave = () => {
    const {newTitle} = this.state
    const {eachTodo, saveNewTitle} = this.props
    saveNewTitle({id: eachTodo.id, newTitle})
    this.setState({edit: false})
  }

  onChangeTitle = event => {
    this.setState({newTitle: event.target.value})
  }

  onChangeStatus = () => {
    const {eachTodo, toggleCompleted} = this.props
    toggleCompleted(eachTodo.id)
  }

  render() {
    const {edit, newTitle} = this.state
    const {eachTodo} = this.props

    return (
      <li className="eachTodo">
        <div className="checkbox-title-container">
          <input
            type="checkbox"
            checked={eachTodo.completed}
            onChange={this.onChangeStatus}
          />
          {edit ? (
            <input
              type="text"
              placeholder="Enter new todo here..."
              className="todo-title-inputbar"
              value={newTitle}
              onChange={this.onChangeTitle}
            />
          ) : (
            <p
              style={{
                textDecoration: eachTodo.completed ? 'line-through' : 'none',
              }}
              data-testid="todo-title"
            >
              {eachTodo.title}
            </p>
          )}
        </div>

        <div className="todo-btns-container">
          {edit ? (
            <button
              type="button"
              className="todo-btns"
              onClick={this.onClickSave}
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              className="todo-btns"
              onClick={this.onClickEdit}
            >
              Edit
            </button>
          )}

          <button
            type="button"
            className="todo-btns"
            onClick={this.onDeleteTodoItem}
          >
            Delete
          </button>
        </div>
      </li>
    )
  }
}

export default TodoItem
