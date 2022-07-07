import { useCallback } from 'react';
import Box from './Box';
import './assets/Board.css';
import plus from './assets/plus.png';

function Board({ boxes, moveBox, moveTask, onDataChange }) {

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
        onDataChange={onDataChange}
      />
    );
  }, [moveBox, moveTask, onDataChange]);

  return (
    <div className='Board'>
      {boxes.map((box, i) => renderBox(box, i))}
      <div className='BoxAdd'>
        <button>
          <img src={plus} alt="add a box"/>
        </button>
      </div>
    </div>
  );
};

export default Board;
