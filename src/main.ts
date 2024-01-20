import "./style.css";

///************Getting All The Elements************///
const todoContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

///************Creating interface for Todo Array************///
interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

///************Creating Arrays************///
// const todos: Todo[] = [  ];
const todos: Array<Todo> = [];

///************Creating OnSubmit Function on form-************///
myForm.onsubmit = (e) => {
  e.preventDefault();

  //----Creating TODO Task heree-----
  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.floor(Math.random() * 100)),
  };
  //------Pushing Created todo to Todos Array---
  todos.push(todo);
  //----After Pushing Todo we need to empty up the input field--
  todoInput.value = "";
  console.log(todos);

  renderTodo(todos);
};

///************Function for genertaing checkbox and div************///
const generateTodoItem = (title: string, id: string, isCompleted: boolean) => {
  const todo = document.createElement("Div") as HTMLDivElement;
  todo.className = "todo";

  //----Creating a Checkbox----//
  const checkBox = document.createElement("input") as HTMLInputElement;
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) item.isCompleted = checkBox.checked;
    });
    paragraph.className = checkBox.checked ? "textCut" : "";
  };

  //----Creating a p for title----//
  const paragraph = document.createElement("p") as HTMLParagraphElement;
  paragraph.innerText = title;
  paragraph.className = isCompleted ? "textCut" : "";

  //----Creating a Button ----//
  const btn = document.createElement("button") as HTMLButtonElement;
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
  };

  //----Appending All to todo ---//
  todo.append(checkBox, paragraph, btn);

  //----Appending todo to todoContainer ---//
  todoContainer.append(todo);
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);

  todos.splice(idx, 1);
  renderTodo(todos);
};

///************Function for Rendering Todo************///
const renderTodo = (todos: Todo[]) => {
  todoContainer.innerText = "";
  todos.forEach((i) => {
    generateTodoItem(i.title, i.id, i.isCompleted);
  });
};
