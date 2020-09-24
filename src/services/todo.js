import request from "./request";
import { API } from "../constants";
import AuthService from "./auth";

class TodoService {
  async action(asyncCallback) {
    if (!AuthService.isAuthenticated) {
      return { response: null, errors: ["Not signed in."] };
    }
    try {
      const response = await asyncCallback();
      return { response, errors: null };
    } catch (e) {
      return { response: null, errors: [e.message] };
    }
  }

  async loadList() {
    const { response, errors } = await this.action(async () => (
      await request.get(API.TODOS)
    ));
    return { todoList: response && response.data, errors }
  }

  async update(todo) {
    const { response, errors } = await this.action(async () => (
      await request.patch(`${API.TODOS}/${todo.id}`, todo)
    ));
    return { updatedTodo: response && response.data.data, errors }
  }
  
  async create(todo) {
    const { response, errors } = await this.action(async () => (
      await request.post(`${API.TODOS}`, todo)
    ));
    return { newTodo: response && response.data.data, errors }
  }

  async get(id) {
    const { response, errors } = await this.action(async () => (
      await request.get(`${API.TODOS}/${id}`)
    ));
    return { todo: response && response.data, errors }
  }

  async delete(todo) {
    const { errors } = await this.action(async () => (
      request.delete(`${API.TODOS}/${todo.id}`)
    ));
    return { errors }
  } 
}

export default new TodoService();