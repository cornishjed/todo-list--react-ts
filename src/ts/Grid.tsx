import { ToDo } from "./ToDo"
import { ToDoItem } from "../App"

interface Props {
    toDos: Array<ToDoItem>;
    onDeleteToDo: (id: number) => void;
}

export const Grid: React.FC<Props> = ({toDos, onDeleteToDo}) => {
    return (
        <div className="toDo__grid">
            {toDos.map(({id, title, description}) => {
                return (
                    <ToDo key={id} id={id} title={title} onDeleteToDo={onDeleteToDo}>
                        {description}
                    </ToDo>
                );
            })}
        </div>
    )
}