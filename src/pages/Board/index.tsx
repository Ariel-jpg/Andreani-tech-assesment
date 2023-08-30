import { useState } from "react"
import { DraggableController } from "../../components";
import { DraggableItem } from "../../shared";
import { BoardWrapper } from "./styled";


export function Board({ titlesList }: { titlesList: string[] }){
    const [draggableLists, setDraggableLists] = useState<{ listTitle: string, itemList: DraggableItem[] }[]>(titlesList.map(listTitle => ({ listTitle, itemList: [] })))
    const [description, setDescription] = useState<string>("");
    const [title, setTitle] = useState<string>("");


    return <BoardWrapper>
        <h1>Simple Kanban Board</h1>
        <DraggableController 
            draggableControllerWrapperClassName="listsWrapper" 
            draggableLists={draggableLists}
        />
        <div>
            <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
            <input placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} />
            <button onClick={() => {
                let L = structuredClone(draggableLists);

                L[0].itemList.push({ title, description })

                setDraggableLists(L)
                setTitle("")
                setDescription("");
            }}    
                children="ADD TASK" />
        </div>
    </BoardWrapper>
}