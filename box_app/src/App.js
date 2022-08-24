import { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import ExportImportComponent from './ExportImportComponent';
import { BoardService } from './services/BoardService';
import { ImAndExporter } from './services/ImAndExporter';
import useTimeout from './hooks/useTimeout';
import Board from './Board';
import Checkbox from './Checkbox';
import './assets/App.css';

function App() {

  const saveDelay = 0.5;
  const [useTouch, setUseTouch] = useState(true);
  const [boxes, setBoxes] = useState(() => BoardService.getBoard());

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

  const handleBoxMaxDurationChange = useCallback((indexBox, newDuration) => {
    setBoxes((prevBoxes) =>
      BoardService.setBoxMaxDuration(prevBoxes, indexBox, newDuration)
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
    return ImAndExporter.prepareExport(boxes);
  }, [boxes]);

  const importState = useCallback((state) => {
    const boxesFromImport = ImAndExporter.getBoxesFromImport(state);
    if (boxesFromImport === null) {
      return;
    }
    setBoxes((prevBoxes) => boxesFromImport);
  }, []);

  useTimeout(
    () => BoardService.saveBoard(boxes),
    saveDelay*1000);

  const onDataChange = {
    onBoxDescriptionChange: handleBoxDescriptionChange,
    onBoxMaxDurationChange: handleBoxMaxDurationChange,
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
    <div className="app">
      <div className="touchscreen">
        <Checkbox
          isChecked={useTouch}
          onCheckChange={() => setUseTouch((isChecked) => !isChecked)}
          label={"use touch screen"}
        />
      </div>
      <DndProvider backend={useTouch ? TouchBackend : HTML5Backend}>
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
