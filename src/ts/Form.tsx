import { ChangeEvent, FC } from "react";
import "../css/Form.css";

interface Props {
  editing: boolean;
  formState: {
    title: string,
    description?: string
  };
  formDispatch: Function;
  onSubmitToDo: Function;
}

type ChangeInputElement = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

export const Form: FC<Props> = ({ formState: {title, description}, editing, formDispatch, onSubmitToDo }) => {
  return (
    <div className="todo__form">
      <h3>{!editing ? "Create" : "Edit"} To-Do</h3>
      <label htmlFor="title">Title</label>
      <input type="text" value={title} onChange={(e: ChangeInputElement) => formDispatch({ data: e.target.value, type: "title" })} />
      <label htmlFor="desc">Description</label>
      <textarea value={description} onChange={(e: ChangeInputElement) => formDispatch({ data: e.target.value, type: "description" })} />
      <button disabled={title?.length ? false : true} onClick={() => onSubmitToDo()}>
        {editing ? "Apply" : "Create"}
      </button>
    </div>
  );
};
