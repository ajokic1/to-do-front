export default {
  addList,
  update,
  remove,
  setLoading,
};

export function addList(todoList) {
  return {
    type: "addList",
    payload: todoList,
  };
}

export function update(todo) {
  return {
    type: "update",
    payload: todo,
  };
}

export function remove(todo) {
  return {
    type: "delete",
    payload: todo,
  };
}

export function setLoading(todo) {
  return {
    type: "setLoading",
    payload: todo,
  };
}
