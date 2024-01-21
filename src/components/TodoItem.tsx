/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface PropsType {
  todo: TodoItemType;
  deleteHandler: (id: TodoItemType["id"]) => void;
  completeHandler: (id: TodoItemType["id"]) => void;
  updateHandler: (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"]
  ) => void;
}

const TodoItem = ({
  todo,
  completeHandler,
  deleteHandler,
  updateHandler,
}: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>(todo.title);

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Stack direction={"row"} alignItems={"center"}>
        {editActive ? (
          <TextField
            sx={{ marginRight: "auto" }}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textValue !== "") {
                updateHandler(todo.id, textValue);
                setEditActive(false);
              }
            }}
          />
        ) : (
          <Typography
            sx={{
              marginRight: "auto",
              textDecoration: todo.isCompleted ? "line-through" : "none",
              color: todo.isCompleted ? "gray" : "inherit",
            }}
          >
            {todo.title}
          </Typography>
        )}
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeHandler(todo.id)}
        />
        <Button
          variant="text"
          onClick={() => setEditActive((prev) => !prev)}
          onMouseDown={() => {
            if (textValue !== "") {
              updateHandler(todo.id, textValue);
            }
          }}
        >
          {editActive ? "Done" : "Edit"}
        </Button>
        <Button variant="contained" onClick={() => deleteHandler(todo.id)}>
          <Trash2 />
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
