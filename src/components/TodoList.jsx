import React, { useState } from 'react';

const todoList = () => {
  const [activity, setActivity] = useState('');
  const [edit, setEdit] = useState({});
  const [todos, setTodos] = useState(['']);

  // generate unique id
  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  }

  // add todo item
  function saveTodoHandler(e) {
    e.preventDefault();

    if (!activity) return alert('Please enter todo item');

    if (edit.id) {
      const updateTodo = {
        id: edit.id,
        activity
      }
      const editTodoIndex = todos.findIndex(function (todo) {
        return todo.id == edit.id;
      })

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updateTodo;

      setTodos(updatedTodos);

      return cancelEditHandler();
    }

    setTodos([...todos, {
      id: generateId(),
      activity
    }]);
    setActivity('');
  }

  // delete todo item
  function deleteTodoHandler(todoId) {
    const filteredTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(filteredTodos);
    cancelEditHandler();
  }

  // edit todo item
  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }

  // cancel edit todo item
  function cancelEditHandler() {
    setActivity('');
    setEdit({});
  }

  return (
    <div className='bg-slate-900 h-screen flex justify-center items-center'>
      <div className='border bg-white lg:w-4/12 w-8/12 px-6 lg:py-4'>
        <h1 className='text-5xl text-center'>Todo List</h1>
        <h4 className='text-xl mt-10 text-slate-900/90'>Add Items</h4>
        <hr className='w-full bg-black h-1' />
        <form onSubmit={saveTodoHandler}>
          <input
            className='border w-full p-2 my-2'
            type='text'
            placeholder='Add todo item'
            value={activity}
            onChange={(e) => setActivity(e.target.value)} />
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            {
              edit.id ? 'Update' : 'Add'
            }
          </button>
          {
            edit.id && <button onClick={cancelEditHandler} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'>Cancel</button>
          }
        </form>
        <h4 className='text-xl mt-5 text-slate-900/90'>Todo Items</h4>
        <hr className='w-full bg-black h-1' />
        <div>
          {
            todos.length > 0 ? (
              <ul className='list-none list-inside'>
                {
                  todos.map(todo => {
                    return (
                      <li key={todo.id} className='p-2 my-2'>{todo.activity}
                        <button
                          id={todo.id}
                          onClick={deleteTodoHandler.bind(this, todo.id)}
                          className='bg-red-500 mx-1 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right'
                        >Delete</button>
                        <button
                          id={todo.id}
                          onClick={editTodoHandler.bind(this, todo)}
                          className='bg-red-500 mx-1 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right'
                        >Edit</button>
                      </li>
                    )
                  })
                }
              </ul>
            ) : (
              <p className='text-center py-4 px-2'>No todo item found !</p>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default todoList