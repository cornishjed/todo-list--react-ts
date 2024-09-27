import { useState } from 'react';

import "../css/ToDo.css";

type oneChild = React.ReactNode

interface Props {
    readonly id: number | undefined;
    title: string;
    children: oneChild; // description
    onEditToDo: Function;
    onDeleteToDo: Function;
}

export const ToDo: React.FC<Props> = ({id, onEditToDo, onDeleteToDo, title, children}) => {
    const [isComplete, setIsComplete] = useState<boolean>(false);

    return (
        <div className={'toDo__card ' + (isComplete && "complete")}>
            <h1>{title}</h1>
            <p>{children}</p>
            <div className='toDo__card-buttons'>
                <button onClick={() => onDeleteToDo(id)}>Delete</button>
                <button onClick={() => onEditToDo(id)}>Edit</button>
                <button onClick={() => setIsComplete(!isComplete)}>Mark {isComplete ? "Incomplete" : "Complete"}</button>
            </div>
        </div>
    )
}