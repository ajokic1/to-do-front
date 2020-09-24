import request from "./request";
import { API } from "../constants";
import AuthService from "./auth";
import Axios from "axios";

class TodoService {
  async loadList() {
    if (!AuthService.isAuthenticated) {
      return { todoList: [], errors: ["Not signed in."] };
    }
    try {
      const response = await request.get(API.TODOS);
      return { todoList: response.data, errors: null };
    } catch (e) {
      return { todoList: [], errors: [e.message] };
    }
  }

  async update(todo) {
    if (!AuthService.isAuthenticated) {
      return { updatedTodo: todo, errors: ["Not signed in."] };
    }
    try {
      const response = await request.patch(`${API.TODOS}/${todo.id}`, todo);
      return { updatedTodo: response.data.data, errors: [] };
    } catch (e) {
      return { updatedTodo: todo, errors: [e.message] };
    }
  } 

  async delete(todo) {
    if (!AuthService.isAuthenticated) {
      return { errors: ["Not signed in."] };
    }
    try {
      await request.delete(`${API.TODOS}/${todo.id}`);
      return { errors: [] };
    } catch (e) {
      return { errors: [e.message] };
    }
  } 
}

export default new TodoService();