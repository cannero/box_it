import { useCallback, useState } from 'react';
import update from 'immutability-helper';
import Box from './Box';
import { BoardService } from './BoardService';
const style = {
  width: 350,
}

function Board() {
  const [boxes, setBoxes] = useState(BoardService.getBoard());
  const moveBox = useCallback((dragIndex, hoverIndex) => {
    setBoxes((prevBoxes) =>
      update(prevBoxes, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevBoxes[dragIndex]],
        ],
      }),
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
      />
    );
  }, [moveBox]);

  return (
    <>
      <div style={style}>{boxes.map((box, i) => renderBox(box, i))}</div>
    </>
  );
};

export default Board;
