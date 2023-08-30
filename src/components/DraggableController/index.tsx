import { useEffect, useState } from "react";
import { DraggableList } from "..";
import { DraggableItem, DraggedElementData } from "../../shared";
import { DraggableControllerWrapper } from "./styled";

type DraggableControllerProps = {
    draggableLists: {
        listTitle: string,
        itemList: DraggableItem[]
    }[],
    draggableControllerWrapperClassName?: string
}

type DraggableItemControllerState = {
    fromDragStart: number, // list number where the item was start
    droppedIn: number // list number where the item was left
}

export function DraggableController({ draggableLists, draggableControllerWrapperClassName }: DraggableControllerProps){
    const [draggableListsCopy, setDraggableListsCopy] = useState(structuredClone(draggableLists));
    const [draggableItemController, setDraggableItemController] = useState<DraggableItemControllerState>({ fromDragStart: -1, droppedIn: -1 });
    
    const draggedOutOfList = (draggableItemController: DraggableItemControllerState): boolean => 
        (draggableItemController.fromDragStart !== draggableItemController.droppedIn) 
        && (draggableItemController.fromDragStart !== -1 && draggableItemController.droppedIn !== -1);
    

    const handleOnDragStart = (fromDragStart: number) => { setDraggableItemController(prevState => ({ ...prevState, fromDragStart })); }

    const handleOnDragEnd = async (elementDragged: DraggedElementData) => {
        if(draggedOutOfList(draggableItemController)){
            const draggableListsTmp = structuredClone(draggableListsCopy);
            const { fromDragStart, droppedIn } = draggableItemController;
            
            draggableListsTmp[fromDragStart].itemList = draggableListsTmp[fromDragStart].itemList.filter((_, index) => index !== elementDragged.index);
            draggableListsTmp[droppedIn].itemList.push(elementDragged.itemData);
            
            setDraggableListsCopy(structuredClone(draggableListsTmp));
        }
    }

    useEffect(() => setDraggableListsCopy(draggableLists), [draggableLists])

    return <DraggableControllerWrapper className={draggableControllerWrapperClassName}>
        {
            draggableListsCopy.map(({ listTitle, itemList }, index) => {
                return <section 
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); console.log("ACABAO 2"); setDraggableItemController(prevState => ({ ...prevState, droppedIn: index })) }}
                >
                    <h2>{listTitle}</h2>
                    <DraggableList 
                        itemList={itemList}
                        onDragStart={() => handleOnDragStart(index)}
                        onDragEnd={(_, draggedElementData) => handleOnDragEnd(draggedElementData)}
                    />
                </section>
        })}
    </DraggableControllerWrapper>
}