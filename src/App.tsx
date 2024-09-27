import { useState } from "react";

import data from "./data.json";
import "./css/App.css";

import { Header } from "./ts/Header.tsx";
import { Form } from "./ts/Form.tsx";
import { Grid } from "./ts/Grid.tsx";

let nextId: number = data.length;
type oneChild = React.ReactNode;

export interface ToDoItem {
  readonly id: number;
  title: string;
  description?: string;
  children?: oneChild;
}

function App() {
  const [toDos, setToDos] = useState<ToDoItem[]>(data);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  // keep state altering functions close to state then pass as props
  function handleSubmit(title: string, description: string, id?: number): void {
    if (!id) {
      let newToDo: ToDoItem = {
        id: ++nextId,
        title: title,
        description: description,
      };
      setToDos([...toDos, newToDo]);
    } else {
      let updatedToDo: ToDoItem = {
        id: id,
        title: title,
        description: description,
      };
      setToDos([...toDos, updatedToDo]);
    }
  }

  function handleEdit(id: number): ToDoItem {
    const index: number = toDos.findIndex((item) => item.id === id);
    console.log("handleEdit()")
    console.log(index);
    setTitle(toDos[index].title);
    setDescription(toDos[index].description)
    return toDos[index];
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
        <Form  title={title} description={description} setTitle={setTitle} setDescription={setDescription} onSubmitToDo={handleSubmit}/>
        <Grid toDos={toDos} onDeleteToDo={handleDelete} onEditToDo={handleEdit}/>
      </div>
    </div>
  );
}

export default App;
