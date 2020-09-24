import request from "./request";
import { API } from "../constants";
import AuthService from "./auth";

function TodoService() {
  async function catchErrors (asyncCallback, ...params) {
    if (!AuthService.isAuthenticated) {
      return { errors: ["Not signed in."] };
    }
    try{
      const response = await asyncCallback(...params);
      return { ...response, done: true, errors: [] }
    } catch (e) {
      return { errors: [e.message] }
    }
  }

  async function loadList() {
    const response = await request.get(API.TODOS.INDEX)
    return { todoList: response ? response.data : [] }
  }

  async function update(todo) {
    const response = await request.put(API.TODOS.SINGLE_TODO.replace(':id', todo.id), todo);
    return { updatedTodo: response && response.data.data }
  }
  
  async function create(todo) {
    const response = await request.post(API.TODOS.INDEX, todo);
    return { newTodo: response && response.data.data }
  }

  async function get(id) {
    const response = await request.get(API.TODOS.SINGLE_TODO.replace(':id', id));
    return { todo: response && response.data }
  }

  async function remove(todo) {
    await request.delete(API.TODOS.SINGLE_TODO.replace(':id', todo.id));
  }
  
  return {
    loadList: (...params) => catchErrors(loadList, ...params), 
    update: (...params) => catchErrors(update, ...params), 
    create: (...params) => catchErrors(create, ...params), 
    get: (...params) => catchErrors(get, ...params), 
    delete: (...params) => catchErrors(remove, ...params), 
  }
}

export default TodoService();