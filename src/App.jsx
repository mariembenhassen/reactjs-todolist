import { useState , useEffect } from "react"
import TodoInput from "./components/Todoinput"
import TodoList from "./components/TodoList"

function App() {

  
   //statefull variable that you can interact with 
   //why we used state bc anytime we change the state : list the screen will cahnge not only the java code !
   const [todos, setTodos] = useState([])
   const [todoValue, setTodoValue] = useState('')


  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddTodos (newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index) {
   const valueToBeEdited = todos[index] 
   setTodoValue(valueToBeEdited)
   handleDeleteTodo(index)

  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    console.log(localTodos)
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

  }, []) 

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
    </>
  )
}

export default App