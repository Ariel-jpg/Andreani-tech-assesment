import styled from "styled-components";

export const BoardWrapper = styled.main`
    overflow: hidden;
    text-align: center;
    width: 100vw;
    height: 100vh;
    background-color: #212b2A;
    display: flex;
    flex-direction: column;

    & > h1 {
        font-size: 3rem;
        padding: 1%;
        flex: 0.1;
    }

    & > section.listsWrapper {
        width: 100%;
        background-color: #333738;
        flex: 0.85;
        display: flex;
        max-height: 78%;

        & > section {
            flex: 1;
            /* height: 100%; */
            border: solid 2px black;
            box-sizing: border-box;
            
            overflow-y: auto;
            overflow-x: hidden;
            padding-bottom: 20px;
            
            & > h2 { 
                font-size: 2rem; 
                position: sticky;
                top: 0%;
                background-color: #333738;
                width: 100%;
                padding: 10px;
            }
            
            &::-webkit-scrollbar { width: 10px; }
            &::-webkit-scrollbar-track { background-color: black; }
            &::-webkit-scrollbar-thumb { background: #888; }
            &::-webkit-scrollbar-thumb:hover { background: #555; }
        }
    }

    & > div {
        flex: 0.05;
        padding: 10px;
        
        & > button { border-left: solid 1px white; }
        & > button, & > input { padding: 5px; background-color: #555; }
        & > input, & > input::placeholder{ color: white; }
        & > input:first-child { border-right: solid 1px white; }

    }
`