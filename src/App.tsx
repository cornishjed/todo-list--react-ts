import { useState } from "react";

import data from "./data.json";
import "./css/App.css";

import { Header } from "./ts/Header.tsx";
import { Form } from "./ts/Form.tsx";
import { Grid } from "./ts/Grid.tsx";

let nextId: number = data.length;
type oneChild = React.ReactNode;

export interface ToDoItem {
  id: number | undefined;
  title: string;
  description?: string;
  children?: oneChild;
}

function App() {
  const [toDos, setToDos] = useState<ToDoItem[]>(data);
  const [title, setTitle] = useState<string>(""); // Initialize to avoid "Component Changing Uncontrolled" error
  const [description, setDescription] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>();

  // keep state altering functions close to state then pass as props
  function handleSubmit(title: string, description: string): void {
    if (!editing) {
      let newToDo: ToDoItem = {
        id: ++nextId,
        title: title,
        description: description,
      };
      setToDos([...toDos, newToDo]);
    } else {
      let updatedToDo: ToDoItem = {
        id: editId,
        title: title,
        description: description,
      };

      let toDosCpy: ToDoItem[] = [...toDos].filter((item) => item.id !== editId);

      toDosCpy.push(updatedToDo);

      // sort By Id
      toDosCpy.sort((a, b) => a.id! - b.id!); // '!' tells TS you're sure it's defined

      setToDos(toDosCpy);
      setEditId(undefined);
      setEditing(false);
    }
  }

  function handleEdit(id: number | boolean): void {
    if (editing) {
      setEditing(false);
      setTitle("");
      setDescription("");
    } else {
      const index: number = toDos.findIndex((item) => item.id === id);

      setEditing(true);
      setEditId(toDos[index].id);
      setTitle(toDos[index].title);
      setDescription(toDos[index].description!);
    }
  }

  function handleDelete(id: number): void {
    const toDosCpy: Array<ToDoItem> = [...toDos];
    const index: number = toDosCpy.findIndex((item) => item.id === id);

    toDosCpy.splice(index, 1);
    setToDos(toDosCpy);
  }

  return (
    <div className="app">
      <Header />
      <div className="content">
        <Form id={editId} title={title} description={description} editing={editing} setTitle={setTitle} setDescription={setDescription} onSubmitToDo={handleSubmit} />
        <Grid toDos={toDos} editing={editing} editId={editId} onDeleteToDo={handleDelete} onEditToDo={handleEdit} />
      </div>
    </div>
  );
}

export default App;
