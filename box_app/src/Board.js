import { useCallback, useState } from 'react';
import Box from './Box';
import { BoardService } from './BoardService';
const style = {
  width: 350,
}

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
        index={index}
        id={box.id}
        text={box.description}
        moveBox={moveBox}
        tasks={box.tasks}
        moveTask={moveTask}
      />
    );
  }, [moveBox, moveTask]);

  return (
    <>
      <div style={style}>{boxes.map((box, i) => renderBox(box, i))}</div>
    </>
  );
};

export default Board;
