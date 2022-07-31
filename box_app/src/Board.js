import { useCallback } from 'react';
import Box from './Box';
import './assets/Board.css';
import plus from './assets/plus.png';

function Board({ boxes, moveBox, moveTask, onDataChange, onAddOrRemove }) {

  const renderBox = useCallback((box, index) => {
    return (
      <Box
        key={box.id}
        indexBox={index}
        box={box}
        moveBox={moveBox}
        moveTask={moveTask}
        onDataChange={onDataChange}
        onAddOrRemove={onAddOrRemove}
      />
    );
  }, [moveBox, moveTask, onDataChange, onAddOrRemove]);

  return (
    <div className='board'>
      {boxes.map((box, i) => renderBox(box, i))}
      <div className='box-add'>
        <button className='box-add-button' onClick={() => onAddOrRemove.onBoxAdd()}>
          <img src={plus} alt="add a box"/>
          <div>Add a box</div>
        </button>
      </div>
    </div>
  );
};

export default Board;
