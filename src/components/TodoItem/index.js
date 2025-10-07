// Write your code here
import './index.css'

const TodoItem = props => {
  const {eachTodo, deleteFucntion} = props
  const onDeleteTodoItem = () => {
    deleteFucntion(eachTodo.id)
  }
  return (
    <li className="eachTodo">
      <p className="title">{eachTodo.title}</p>
      <button type="button" className="button" onClick={onDeleteTodoItem}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
