import { FC } from "react";
import "../css/Form.css";

interface Props {
  title: string;
  description?: string;
  editing: boolean;
  setTitle: Function;
  setDescription: Function;
  onSubmitToDo: Function;
}

export const Form: FC<Props> = ({ title, description, editing, setTitle, setDescription, onSubmitToDo }) => {
  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
  }

  return (
    <div className="todo__form">
      <h3>{!editing ? "Create" : "Edit"} To-Do</h3>
      <label htmlFor="title">Title</label>
      <input type="text" value={title} onChange={handleTitleChange} />
      <label htmlFor="desc">Description</label>
      <textarea value={description} onChange={handleDescriptionChange} />
      <button disabled={title?.length ? false : true} onClick={() => onSubmitToDo()}>
        {editing ? "Apply" : "Create"}
      </button>
    </div>
  );
};
