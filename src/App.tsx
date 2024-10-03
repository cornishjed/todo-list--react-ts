import { useEffect, useReducer, useState } from "react";

import data from "./data.json";
import "./css/App.css";

import { Header } from "./ts/Header.tsx";
import { Form } from "./ts/Form.tsx";
import { Grid } from "./ts/Grid.tsx";

import {initialFormState, formReducer } from "./formReducer.tsx";
import {initialEditState, editReducer} from "./editReducer.tsx";

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
  const [editState, editDispatch] = useReducer(editReducer, initialEditState);
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  // create a useEffect() that updates data file on change of toDos
  useEffect(() => {
    // may have to save until routing
    console.log(toDos);
  }, [toDos]);

  // keep state altering functions close to state then pass as props
  function handleSubmit() {
    if (!editState.editing) {
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
        id: editState.editId,
        title: formState.title,
        description: formState.description,
        completed: false,
      };

      let toDosCpy: ToDoItem[] = [...toDos].filter(
        (item) => item.id !== editState.editId
      );

      toDosCpy.push(updatedToDo);

      // sort By Id
      toDosCpy.sort((a, b) => a.id! - b.id!); // '!' tells TS you're sure it's defined

      setToDos(toDosCpy);
      editDispatch({type: "end"})
      formDispatch({ type: "clear"})
    }
  }

  function handleEdit<T>(id: T) {
    if (editState.editing && id === editState.editId) {
      editDispatch({type: "end"});
      formDispatch({ type: "clear"})
    } else {
      const index: number = toDos.findIndex((item) => item.id === id);

      editDispatch({id: toDos[index].id, type: "start"})
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
            editing={editState.editing}
            formState={formState}
            formDispatch={formDispatch}
            onSubmitToDo={handleSubmit}
          />
        </div>
        <div className="content__right">
          <Grid
            toDos={toDos}
            editState={editState}
            onDeleteToDo={handleDelete}
            onEditToDo={handleEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
