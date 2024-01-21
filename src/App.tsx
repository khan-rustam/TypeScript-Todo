/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AppBar,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { getTodos, saveTodos } from "./utils/features";
import { ListChecks } from "lucide-react";

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());

  const [title, setTitle] = useState<TodoItemType["title"]>("");

  const completeHandler = (id: TodoItemType["id"]): void => {
    const newTodo: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.isCompleted = !i.isCompleted;
      return i;
    });
    setTodos(newTodo);
  };
  const updateHandler = (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"]
  ): void => {
    const newTodo: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.title = newTitle;
      return i;
    });
    setTodos(newTodo);
  };

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodo: TodoItemType[] = todos.filter((i) => i.id !== id);
    setTodos(newTodo);
  };

  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.floor(Math.random() * 1000)),
    };

    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <Container maxWidth="sm" sx={{ height: "95vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Stack direction={"row"} alignItems={"center"} spacing={".5rem"}>
            <Typography fontSize={"1.5rem"}>Todo</Typography>

            <Typography fontSize={"1.5rem"} style={{ marginTop: "10px" }}>
              <ListChecks />
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>

      <Stack
        height={"80%"}
        direction={"column"}
        spacing={"1rem"}
        p={"1rem"}
        overflow={"scroll"}
        sx={{ "::-webkit-scrollbar": { display: "none" } }}
      >
        {todos.map((i) => (
          <TodoItem
            completeHandler={completeHandler}
            deleteHandler={deleteHandler}
            updateHandler={updateHandler}
            key={i.id}
            todo={i}
          />
        ))}
      </Stack>

      <TextField
        fullWidth
        label={"New Task"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && title != "") submitHandler();
        }}
      />
      <Button
        sx={{ marginTop: "1rem" }}
        variant="contained"
        fullWidth
        onClick={submitHandler}
        disabled={title === ""}
      >
        ADD
      </Button>
    </Container>
  );
};

export default App;
