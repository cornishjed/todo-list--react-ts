import { ToDo } from "./ToDo";
import { ToDoItem } from "../App";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGrip } from "@fortawesome/free-solid-svg-icons";

const gridIcon = <FontAwesomeIcon icon={faGrip} />;
const listIcon = <FontAwesomeIcon icon={faBars} />;

interface Props {
  toDos: Array<ToDoItem>;
  editing: boolean;
  editId: number | undefined;
  onEditToDo: Function;
  onDeleteToDo: Function;
}

export const Grid: React.FC<Props> = ({
  toDos,
  editing,
  editId,
  onEditToDo,
  onDeleteToDo,
}) => {
  const [listLayout, setListLayout] = useState<boolean>(false);

  return (
    <>
      <div className="layout-buttons">
        <button
          className={"layout-buttons__grid" + (!listLayout ? " selected" : "")}
          onClick={() => {
            setListLayout(false);
          }}
        >
          {gridIcon}
        </button>
        <button
          className={"layout-buttons__list" + (listLayout ? " selected" : "")}
          onClick={() => {
            setListLayout(true);
          }}
        >
          {listIcon}
        </button>
      </div>
      <div className={!listLayout ? "toDo--grid" : "toDo--list"}>
        {toDos.map(({ id, title, description, completed }) => {
          return (
            <ToDo
              key={id}
              id={id}
              title={title}
              completed={completed}
              editing={id === editId && editing ? true : false}
              listLayout={listLayout}
              onEditToDo={onEditToDo}
              onDeleteToDo={onDeleteToDo}
            >
              {description}
            </ToDo>
          );
        })}
      </div>
    </>
  );
};
