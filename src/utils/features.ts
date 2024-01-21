/* eslint-disable @typescript-eslint/no-unused-vars */

export const saveTodos = (todos: TodoItemType[]): void => {
  localStorage.setItem("myTodos", JSON.stringify(todos));
};

export const getTodos = () => {
  const savedTodos = localStorage.getItem("myTodos");

  return savedTodos ? JSON.parse(savedTodos) : [];
};
