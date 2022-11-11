import { Draggable } from "react-beautiful-dnd";

import React, { useMemo } from "react";

import styled, { css } from "styled-components";

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;

const CardHeader = styled.div`
  font-weight: 500;
  text-align: start;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;

const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;

const PetCard = ({ item, provided, snapshot }) => {

  console.log("item",item)
  return (
    <DragItem
      ref={provided.innerRef}
      snapshot={snapshot}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
  <ul>
    <li>{item.name}</li>
  </ul>
  </DragItem>
  );
};

export default PetCard;
