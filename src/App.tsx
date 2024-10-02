import { useState } from "react";

import data from "./data.json";
import "./css/App.css";

import { Header } from "./ts/Header.tsx";
import { Form } from "./ts/Form.tsx";
import { Grid } from "./ts/Grid.tsx";

type oneChild = React.ReactNode;
export interface ToDoItem {
  id: number | undefined;
  title: string;
  description?: string;
  children?: oneChild;
}

let nextId: number = data.length;

function App() {
  const [toDos, setToDos] = useState<ToDoItem[]>(data);
  const [title, setTitle] = useState(""); // Initialize to avoid "Component Changing Uncontrolled" error
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState<number>();

  function clearForm() {
    setTitle("");
    setDescription("");
  }

  // keep state altering functions close to state then pass as props
  function handleSubmit() {
    if (!editing) {
      let newToDo: ToDoItem = {
        id: ++nextId,
        title: title,
        description: description,
      };
      setToDos([...toDos, newToDo]);
      clearForm();
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
      clearForm();
    }
  }

  function handleEdit<T>(id: T) {
    if (editing && id === editId) {
      setEditing(false);
      clearForm();
    } else {
      const index: number = toDos.findIndex((item) => item.id === id);

      setEditing(true);
      setEditId(toDos[index].id);
      setTitle(toDos[index].title);
      setDescription(toDos[index].description!);
    }
  }

  function handleDelete(id: number) {
    const toDosCpy: Array<ToDoItem> = [...toDos];
    const index: number = toDosCpy.findIndex((item) => item.id === id);

    toDosCpy.splice(index, 1);
    setToDos(toDosCpy);
  }

  return (
    <div className="app">
      <Header />
      <div className="content">
        <div className="content__left">
        <Form title={title} description={description} editing={editing} setTitle={setTitle} setDescription={setDescription} onSubmitToDo={handleSubmit} />
        </div>
        <div className="content__right">
          <Grid toDos={toDos} editing={editing} editId={editId} onDeleteToDo={handleDelete} onEditToDo={handleEdit} />
        </div>
        
      </div>
    </div>
  );
}

export default App;
