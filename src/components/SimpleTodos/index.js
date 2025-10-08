import {Component} from 'react'
import './index.css'
import TodoItem from '../TodoItem'

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening'},
  {id: 2, title: 'Rent the movie for tomorrow movie night'},
  {id: 3, title: 'Confirm the slot for the yoga session tomorrow morning'},
  {id: 4, title: 'Drop the parcel at Bloomingdale'},
  {id: 5, title: 'Order fruits on Big Basket'},
  {id: 6, title: 'Fix the production issue'},
  {id: 7, title: 'Confirm my slot for Saturday Night'},
  {id: 8, title: 'Get essentials for Sunday car wash'},
]

class SimpleTodos extends Component {
  state = {
    todoList: initialTodosList.map(todo => ({...todo, completed: false})),
    newTodo: '',
  }

  onChangeNewTodo = e => {
    this.setState({newTodo: e.target.value})
  }

  onClickAddTodo = () => {
    const {newTodo} = this.state
    const trimmedTodo = newTodo.trim()

    if (!trimmedTodo) return

    const match = trimmedTodo.match(/^(.*)\s+(\d+)$/)

    if (match) {
      const title = match[1].trim()
      const count = Number(match[2])

      if (!title || Number.isNaN(count) || count <= 0) return

      this.setState(prevState => {
        const lastId =
          prevState.todoList.length > 0
            ? prevState.todoList[prevState.todoList.length - 1].id
            : 0

        const newTodos = Array.from({length: count}, (_, i) => ({
          id: lastId + i + 1,
          title,
          completed: false,
        }))

        return {
          todoList: [...prevState.todoList, ...newTodos],
          newTodo: '',
        }
      })
      return
    }

    this.setState(prevState => {
      const idValue =
        prevState.todoList.length > 0
          ? prevState.todoList[prevState.todoList.length - 1].id + 1
          : 1

      return {
        todoList: [
          ...prevState.todoList,
          {id: idValue, title: trimmedTodo, completed: false},
        ],
        newTodo: '',
      }
    })
  }

  deleteFucntion = todoId => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => todo.id !== todoId),
    }))
  }

  updateTitle = newTodo => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo =>
        todo.id === newTodo.id ? {...todo, title: newTodo.newTitle} : todo,
      ),
    }))
  }

  toggleCompleted = todoId => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo =>
        todo.id === todoId ? {...todo, completed: !todo.completed} : todo,
      ),
    }))
  }

  render() {
    const {todoList, newTodo} = this.state

    return (
      <div className="todo-page">
        <div className="todo-card">
          <h1 className="heading">Simple Todos</h1>

          <div className="todo-add-container">
            <input
              type="text"
              className="todo-add-inputbar"
              onChange={this.onChangeNewTodo}
              value={newTodo}
            />
            <button
              type="button"
              className="todo-add-btn"
              onClick={this.onClickAddTodo}
            >
              Add
            </button>
          </div>

          <ul className="todo-list-container">
            {todoList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                eachTodo={eachTodo}
                deleteFucntion={this.deleteFucntion}
                saveNewTitle={this.updateTitle}
                toggleCompleted={this.toggleCompleted}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
