export default function todoReducer(state, action) {
  switch (action.type) {
    case "addList":
      return addList(state, action);
    case "update":
      return updateTodo(state, action);
    case "setLoading":
      return setLoading(state, action);
    case "delete":
      return deleteTodo(state, action);
    default:
      throw new Error("Invalid action.");
  }
}

function updateTodo(state, action) {
  return { ...state, [action.payload.id]: action.payload };
}

function deleteTodo(state, action) {
  const newState = { ...state }
  console.log("deleting " + action.payload.id);
  delete newState[action.payload.id];
  return newState;
}

function setLoading(state, action) {
  const newState = { ...state }
  newState[action.payload.id].isLoading = true;
  return newState;
}

function addList(state, action) {
  const newState = {};
  action.payload.map(todo => newState[todo.id] = todo);
  return { ...state, ...newState };
}