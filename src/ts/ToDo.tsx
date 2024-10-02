import { FC, ReactNode, useState } from "react";

import "../css/ToDo.css";

type oneChild = ReactNode;

interface Props {
  readonly id: number;
  title: string;
  completed: boolean;
  editing: boolean;
  listLayout: boolean;
  children: oneChild; // description
  onEditToDo: Function;
  onDeleteToDo: Function;
}

export const ToDo: FC<Props> = ({
  id,
  editing,
  completed,
  listLayout,
  onEditToDo,
  onDeleteToDo,
  title,
  children,
}) => {
  const [isComplete, setIsComplete] = useState(completed);
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={
        "toDo__card" +
        (listLayout ? "--list" : "") +
        (editing ? " editing" : "") +
        (isComplete ? " complete" : "")
      }
    >
      <h1
        className="heading"
        onClick={
          listLayout
            ? () => {
                setExpand(!expand);
              }
            : () => {}
        }
      >
        {title}
      </h1>
      <p className={"description" + (expand ? "--expand" : "")}>{children}</p>
      <div className="toDo__card__buttons">
        <button className="delete" onClick={() => onDeleteToDo(id)}>
          X
        </button>
        <button onClick={() => onEditToDo(id)}>
          {editing ? "Cancel" : "Edit"}
        </button>
        <button onClick={() => setIsComplete(!isComplete)}>
          Mark {isComplete ? "Incomplete" : "Complete"}
        </button>
      </div>
    </div>
  );
};
