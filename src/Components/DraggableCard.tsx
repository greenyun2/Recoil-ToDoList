import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{isDragging: boolean}>`
	background-color: ${(props) => props.isDragging ? "#74ffe9" : props.theme.cardColor};
	border-radius: 5px;
	padding: 10px;
	margin-bottom: 5px;
  box-shadow: ${(props) => props.isDragging ? '0px 2px 5px rgba(0, 0, 0, 0.5)' : 'none'};
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  idx: number;
};

const DraggableCard = ({ toDoId, toDoText, idx }: IDraggableCardProps) => {
  console.log("toDo", toDoText);
  return (
    <Draggable key={toDoId} draggableId={toDoId + ''} index={idx}>
    {(magic, snapshot) => 
    <Card 
    isDragging={snapshot.isDragging}
    ref={magic.innerRef}
    {...magic.draggableProps}
    {...magic.dragHandleProps}
    >
      {toDoText}
    </Card>
    }
  </Draggable>
  );
};

export default React.memo(DraggableCard);