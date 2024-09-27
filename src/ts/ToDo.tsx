import { useState } from "react";

import "../css/ToDo.css";

type oneChild = React.ReactNode;

interface Props {
  readonly id: number | undefined;
  title: string;
  editing: boolean;
  children: oneChild; // description
  onEditToDo: Function;
  onDeleteToDo: Function;
}

export const ToDo: React.FC<Props> = ({ id, editing, onEditToDo, onDeleteToDo, title, children }) => {
  const [isComplete, setIsComplete] = useState<boolean>(false);

  return (
    <div className={"toDo__card " + (editing ? "editing" : "") + " " + (isComplete ? "complete" : "")}>
      <h1>{title}</h1>
      <p>{children}</p>
      <div className="toDo__card__buttons">
        <button className="delete" onClick={() => onDeleteToDo(id)}>X</button>
        <button onClick={() => onEditToDo(id)}>{editing ? "Cancel" : "Edit"}</button>
        <button onClick={() => setIsComplete(!isComplete)}>Mark {isComplete ? "Incomplete" : "Complete"}</button>
      </div>
    </div>
  );
};
