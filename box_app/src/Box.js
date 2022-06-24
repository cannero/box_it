import { useRef, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import TaskList from './TaskList';
import { BoardService } from './BoardService';
import './assets/Box.css';

const Box = ({ id, text, indexBox, moveBox, tasks, moveTask }) => {
  const boxRef = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.BOX,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!boxRef.current) {
        return;
      }

      const dragIndex = item.indexBox;
      const hoverIndex = indexBox;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = boxRef.current?.getBoundingClientRect();
      // Get horizontal middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging leftwards or rightwards, only move when the cursor is 50%
      // over the middle.
      // Dragging rightwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      // Dragging leftwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      // Time to actually perform the action
      moveBox(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.indexBox = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOX,
    item: () => {
      return { id, indexBox };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(boxRef));

  const totalDuration = useMemo(() => BoardService.getTotalDuration(tasks), [tasks] );

  return (
    <div ref={boxRef} style={{ opacity }} data-handler-id={handlerId} className='Box'>
      <div className='Box-header'>
        <div className='Header-column'>{text}</div>
        <div className='Header-column'>total: {totalDuration}</div>
      </div>
      <TaskList
        indexBox={indexBox}
        tasks={tasks}
        moveTask={moveTask}
      />
    </div>
  );
};

export default Box;
