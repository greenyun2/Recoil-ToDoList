import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { toDoState } from './Atoms';
import DraggableCard from './Components/DraggableCard';
import Board from './Components/Board';

const Wrapper = styled.div`
	display: flex;
	max-width: 680px;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Boards = styled.div`
	display: grid;
	width: 100%;
	gap: 10px;
	grid-template-columns: repeat(3, 1fr);
`;



function App() {
	const [toDos, setToDos] = useRecoilState(toDoState);

	const onDragEnd = (info: any) => {
		const { destination, draggableId, source } = info;
		console.log('info', info)
		if(!destination) return;

		if(destination.droppableId === source.droppableId) {
			//같은 보드에서 움직이는 경우
			setToDos((oldToDos) => {
				const copyToDos = [...oldToDos[source.droppableId]];
				const taskObj = copyToDos[source.index];
				copyToDos.splice(source.index, 1);
				copyToDos.splice(destination?.index, 0, taskObj);
				return {
					...oldToDos,
					[source.droppableId]: copyToDos,
				};
		});
		};

		if(destination.droppableId !== source.droppableId) {
			// 서로 다른 보드로 움직이는 경우
			setToDos((oldToDos) => {
				const sourceBoard = [...oldToDos[source.droppableId]];
				const taskObj = sourceBoard[source.index];
				const destinationBoard = [...oldToDos[destination.droppableId]]
				sourceBoard.splice(source.index, 1);
				destinationBoard.splice(destination?.index, 0, taskObj);
				return {
					...oldToDos,
					[source.droppableId]: sourceBoard,
					[destination.droppableId]: destinationBoard,
				};
		});
		}
	};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					{Object.keys(toDos).map((boardId) => (
						<Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
					))}
				</Boards>
			</Wrapper>
    </DragDropContext>
  );
};

export default App;
