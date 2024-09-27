import { ToDo } from "./ToDo"
import { ToDoItem } from "../App"

interface Props {
    toDos: Array<ToDoItem>;
    editId: number | undefined;
    onEditToDo: Function
    onDeleteToDo: Function;
}

export const Grid: React.FC<Props> = ({toDos, editId, onEditToDo, onDeleteToDo}) => {
    return (
        <div className="toDo__grid">
            {toDos.map(({id, title, description}) => {
                return (
                    <ToDo key={id} id={id} title={title} editing={id === editId ? true : false} onEditToDo={onEditToDo} onDeleteToDo={onDeleteToDo}>
                        {description}
                    </ToDo>
                );
            })}
        </div>
    )
}