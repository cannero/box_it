import { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ExportImportComponent from './ExportImportComponent';
import { BoardService } from './BoardService';
import Board from './Board';
import './assets/App.css';

function App() {

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

  const handleDurationChange = useCallback((indexBox, indexTask, newDuration) => {
    setBoxes((prevBoxes) =>
      BoardService.setTaskDuration(prevBoxes, indexBox, indexTask, newDuration)
    )
  }, []);

  const getStateForExport = useCallback(() => {
    return BoardService.prepareExport(boxes);
  }, [boxes]);

  const importState = useCallback((state) => {
    const boxesFromImport = BoardService.getBoxesFromImport(state);
    if (boxesFromImport === null) {
      return;
    }
    setBoxes((prevBoxes) => boxesFromImport);
  }, []);

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Board
          boxes={boxes}
          moveBox={moveBox}
          moveTask={moveTask}
          onDurationChange={handleDurationChange}
        />
      </DndProvider>
      <ExportImportComponent
        getStateForExport={getStateForExport}
        importState={importState}
      />
    </div>
  );
}

export default App;
