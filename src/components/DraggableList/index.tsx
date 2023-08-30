import { useState, useEffect } from "react";
import { DraggableListItem, DraggableListWrapper } from "./styled";
import { DraggableItem, DraggedElementData } from "../../shared";


type DraggleListProps = {
    itemList: DraggableItem[],
    onDragEnd: (newList: DraggableItem[], draggedElementData: DraggedElementData) => void,
    onDragStart: () => void
}

type OnDragState = { start: number, end: number, draggedElementData?: DraggedElementData }

/**
 * This component is only responsible for abstracting the relocation logic (drag and drop)
 * 
 * @param itemList For performance reasons it is recommended that there be a state
 * @param onDragEnd For consistency it is recommended that the "itemList" argument be updated with the "setState" function to "newList"
 * @implNote1 Immutability was prioritized
 * @implNote2 Since the only strict order there is is that of the items, then this component operates by relocating the indices.
 */
export function DraggableList({ itemList, onDragEnd, onDragStart }: DraggleListProps){
    const [onDrag, setOnDrag] = useState<OnDragState>({ start: -1, end: -1, draggedElementData: undefined });
    const [itemListCopy, setItemListCopy] = useState<DraggableItem[]>(structuredClone(itemList));

    const handleOnDragStart = (index: number) => {
        setOnDrag(prevState => ({ ...prevState, end: -1, start: index }));
        onDragStart();
    }

    const handleOnDragEnd = (onDrag: OnDragState, draggedElementData: DraggedElementData) => {
        const itemListTmp = itemListCopy.map((e, index) => {
            if(index === onDrag.start) return itemListCopy[onDrag.end];
            else if(index === onDrag.end) return itemListCopy[onDrag.start];
            else return e;
        })

        setOnDrag(prevOnDrag => ({ ...prevOnDrag, draggedElementData }))
        setItemListCopy(structuredClone(itemListTmp)); 
    }

    useEffect(() => { 
        if(!!onDrag.draggedElementData) {
            onDragEnd(itemListCopy, onDrag.draggedElementData);
            setOnDrag({ start: -1, end: -1, draggedElementData: undefined })
        }
    }, [itemListCopy]);
    
    useEffect(() => { setItemListCopy(structuredClone(itemList)); }, [itemList]);

    return <DraggableListWrapper>
        {
            (itemList.length !== 0) && itemListCopy.map(({ title, description }, index) => <DraggableListItem 
                draggable
                key={title + description + index}
                onDragStart={() => handleOnDragStart(index)}
                onDragEnter={() => setOnDrag(prevOnDrag => ({ ...prevOnDrag, end: index }))}
                onDragEnd={() => handleOnDragEnd(onDrag, { itemData: { title, description }, index })}
            >
                <strong>{title}</strong>
                <span>{description}</span>
            </DraggableListItem>
        )}
    </DraggableListWrapper>
}