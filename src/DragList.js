import React from 'react';
import {Droppable, Draggable } from 'react-beautiful-dnd';
import {getItemStyle, getListStyle} from './utils';
const DragList = ({id, items}) => {
    return (
        <Droppable droppableId={id}>
            {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {/* This is the items inside a list */}
                {items.map((item, index) => (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}>
                                {item.content}
                            </div>
                        )}
                    </Draggable>
                ))}
                {provided.placeholder}
            </div>
            )}
        </Droppable>
    );
}
export default DragList;