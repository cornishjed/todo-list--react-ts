import { ToDo } from "./ToDo"
import { Props  as ToDoProps } from "./ToDo" ;

interface Props {
    toDos: Array<ToDoProps>;
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