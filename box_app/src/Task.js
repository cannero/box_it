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

export const Task= ({ id, indexBox, indexTask, description, duration, moveTask }) => {
  const taskRef = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.TASK,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!taskRef.current) {
        return;
      }

      if (item.id === id){
        return;
      }

      const dragIndexBox = item.indexBox;
      const dragIndexTask = item.indexTask;
      const hoverIndexBox = indexBox;
      const hoverIndexTask = indexTask;

      const hoverBoundingRect = taskRef.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndexTask < hoverIndexTask && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndexTask > hoverIndexTask && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveTask(dragIndexBox, dragIndexTask, hoverIndexBox, hoverIndexTask);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.indexBox = hoverIndexBox;
      item.indexTask = hoverIndexTask;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: () => {
      return { id, indexBox, indexTask };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(taskRef));

  return (
    <div ref={taskRef} style={{ ...style, opacity}} data-handler-id={handlerId}>
      {description}
      <br/>
      duration: {duration}
    </div>
  );
};

