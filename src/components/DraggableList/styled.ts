import { styled } from "styled-components";

export const DraggableListItem = styled.li`
    padding: 10px;
    width: 50%;
    background-color: #212b2a;
    border-radius: 10px;    
    margin: 10px;
    cursor: grab;
    display: flex;
    flex-direction: column;

    & > strong {
        padding-bottom: 10px;
        font-size: 1.2rem;
        border-bottom: solid 2px white;
        word-wrap: break-word;
    }

    & > span { padding-top: 10px; }
`

export const DraggableListWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
`