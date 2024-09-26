import { useState } from 'react';

import "../css/ToDo.css";

type oneChild = React.ReactNode

export interface Props {
    readonly id: number;
    onDeleteToDo: (id: number) => void;
    title: string;
    description?: string;
    children?: oneChild;
}

export const ToDo: React.FC<Props> = ({id, onDeleteToDo, title, children}) => {
    const [isComplete, setIsComplete] = useState<boolean>(false);

    return (
        <div className={'toDo__card ' + (isComplete && "complete")}>
            <h1>{title}</h1>
            <p>{children}</p>
            <div className='toDo__card-buttons'>
                <button onClick={() => onDeleteToDo(id)}>Delete</button>
                <button onClick={() => setIsComplete(!isComplete)}>Mark {isComplete ? "Incomplete" : "Complete"}</button>
            </div>
        </div>
    )
}