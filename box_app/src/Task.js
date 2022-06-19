import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'grab',
};

export const Task= ({ id, description, duration }) => {
  const taskRef = useRef(null);

  const [{canDrop, isOver}, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: () => ({id}),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: () => {
      return { id };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(taskRef));
  return (
    <div ref={taskRef} style={{ ...style}}>
      {description}
      <br/>
      duration: {duration}
    </div>
  );
};

