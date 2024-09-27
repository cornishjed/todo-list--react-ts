import "../css/Form.css";

interface Props {
  title: string | undefined;
  description: string | undefined;
  setTitle: Function;
  setDescription: Function;
    onSubmitToDo: Function
}

export const Form: React.FC<Props> = ({title, description, setTitle, setDescription, onSubmitToDo}) => {
  

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setDescription(e.target.value);
  }

  function clearForm(): void {
    setTitle("");
    setDescription("");
  }

  return (
    <div className="todo__form">
      <h3>Create To-Do</h3>
      <label htmlFor="title">Title</label>
      <input type="text" value={title} onChange={handleTitleChange} />
      <label htmlFor="desc">Description</label>
      <textarea value={description} onChange={handleDescriptionChange} />
      <button disabled={title?.length ? false : true} onClick={() => {onSubmitToDo(title, description), clearForm()}}>Create</button>
    </div>
  );
}
