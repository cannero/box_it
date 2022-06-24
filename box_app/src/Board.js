import { useCallback, useState } from 'react';
import Box from './Box';
import { BoardService } from './BoardService';
import './assets/Board.css';

function Board() {
  const [boxes, setBoxes] = useState(BoardService.getBoard());
  const moveBox = useCallback((dragIndex, hoverIndex) => {
    setBoxes((prevBoxes) =>
      BoardService.moveBox(prevBoxes, dragIndex, hoverIndex)
    )
  }, []);
  const moveTask = useCallback((dragIndexBox, dragIndexTask, hoverIndexBox, hoverIndexTask) => {
    setBoxes((prevBoxes) =>
      BoardService.moveTask(prevBoxes, dragIndexBox, dragIndexTask, hoverIndexBox, hoverIndexTask)
    )
  }, []);
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
      />
    );
  }, [moveBox, moveTask]);

  return (
    <div className='Board'>
      {boxes.map((box, i) => renderBox(box, i))}
    </div>
  );
};

export default Board;
