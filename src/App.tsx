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

  // keep state altering functions close to state then pass as props
  function handleSubmit(title: string, description: string): void {
    let newToDo: ToDoItem = {
      id: ++nextId,
      title: title,
      description: description,
    };

    setToDos([...toDos, newToDo]);
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
        <Form onSubmitToDo={handleSubmit} />
        <Grid toDos={toDos} onDeleteToDo={handleDelete} />
      </div>
    </div>
  );
}

export default App;
