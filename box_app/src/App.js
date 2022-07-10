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

  const handleBoxDescriptionChange = useCallback((indexBox, newDescription) => {
    setBoxes((prevBoxes) =>
      BoardService.setBoxDescription(prevBoxes, indexBox, newDescription)
    )
  }, []);

  const handleTaskDescriptionChange = useCallback((indexBox, indexTask, newDescription) => {
    setBoxes((prevBoxes) =>
      BoardService.setTaskDescription(prevBoxes, indexBox, indexTask, newDescription)
    )
  }, []);

  const handleTaskDurationChange = useCallback((indexBox, indexTask, newDuration) => {
    setBoxes((prevBoxes) =>
      BoardService.setTaskDuration(prevBoxes, indexBox, indexTask, newDuration)
    )
  }, []);

  const handleAddBox = useCallback(() => {
    setBoxes((prevBoxes) =>
      BoardService.addBox(prevBoxes)
    )
  }, []);

  const handleRemoveBox = useCallback((indexBox) => {
    setBoxes((prevBoxes) =>
      BoardService.removeBox(prevBoxes, indexBox)
    )
  }, []);

  const handleAddTask = useCallback((indexBox) => {
    setBoxes((prevBoxes) =>
      BoardService.addTask(prevBoxes, indexBox)
    )
  }, []);

  const handleRemoveTask = useCallback((indexBox, indexTask) => {
    setBoxes((prevBoxes) =>
      BoardService.removeTask(prevBoxes, indexBox, indexTask)
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

  const onDataChange = {
    onBoxDescriptionChange: handleBoxDescriptionChange,
    onTaskDescriptionChange: handleTaskDescriptionChange,
    onTaskDurationChange: handleTaskDurationChange,
  };

  const onAddOrRemove = {
    onBoxAdd: handleAddBox,
    onBoxRemove: handleRemoveBox,
    onTaskAdd: handleAddTask,
    onTaskRemove: handleRemoveTask,
  };

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Board
          boxes={boxes}
          moveBox={moveBox}
          moveTask={moveTask}
          onDataChange={onDataChange}
          onAddOrRemove={onAddOrRemove}
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
