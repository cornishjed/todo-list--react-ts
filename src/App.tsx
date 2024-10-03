import { useEffect, useReducer, useState } from "react";

import data from "./data.json";
import "./css/App.css";

import { Header } from "./ts/Header.tsx";
import { Form } from "./ts/Form.tsx";
import { Grid } from "./ts/Grid.tsx";

import {initialFormState, formReducer } from "./formReducer.tsx";

type oneChild = React.ReactNode;

export interface ToDoItem {
  readonly id: number;
  title: string;
  description?: string;
  completed: boolean;
  children?: oneChild;
}

let nextId: number = data.length;

function App() {
  const [toDos, setToDos] = useState<ToDoItem[]>(data);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(0);
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  // create a useEffect() that updates data file on change of toDos
  useEffect(() => {
    // may have to save until routing
    console.log(toDos);
  }, [toDos]);

  // keep state altering functions close to state then pass as props
  function handleSubmit() {
    if (!editing) {
      let newToDo: ToDoItem = {
        id: ++nextId,
        title: formState.title,
        description: formState.description,
        completed: false,
      };
      setToDos([...toDos, newToDo]);
      formDispatch({ type: "clear"})
    } else {
      let updatedToDo: ToDoItem = {
        id: editId,
        title: formState.title,
        description: formState.description,
        completed: false,
      };

      let toDosCpy: ToDoItem[] = [...toDos].filter(
        (item) => item.id !== editId
      );

      toDosCpy.push(updatedToDo);

      // sort By Id
      toDosCpy.sort((a, b) => a.id! - b.id!); // '!' tells TS you're sure it's defined

      setToDos(toDosCpy);
      setEditId(0);
      setEditing(false);
      formDispatch({ type: "clear"})
    }
  }

  function handleEdit<T>(id: T) {
    if (editing && id === editId) {
      setEditing(false);
      formDispatch({ type: "clear"})
    } else {
      const index: number = toDos.findIndex((item) => item.id === id);

      setEditing(true);
      setEditId(toDos[index].id);

      formDispatch({data: {title: toDos[index].title, description: toDos[index].description}, type: "edit"});
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
          <Form
            editing={editing}
            formState={formState}
            formDispatch={formDispatch}
            onSubmitToDo={handleSubmit}
          />
        </div>
        <div className="content__right">
          <Grid
            toDos={toDos}
            editing={editing}
            editId={editId}
            onDeleteToDo={handleDelete}
            onEditToDo={handleEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
