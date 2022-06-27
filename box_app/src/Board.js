import { useCallback } from 'react';
import Box from './Box';
import './assets/Board.css';

function Board({ boxes, moveBox, moveTask, onDurationChange }) {

  const renderBox = useCallback((box, index) => {
    return (
      <Box
        key={box.id}
        indexBox={index}
        id={box.id}
        text={box.description}
        moveBox={moveBox}
        tasks={box.tasks}
        moveTask={moveTask}
        onDurationChange={onDurationChange}
      />
    );
  }, [moveBox, moveTask, onDurationChange]);

  return (
    <div className='Board'>
      {boxes.map((box, i) => renderBox(box, i))}
    </div>
  );
};

export default Board;
