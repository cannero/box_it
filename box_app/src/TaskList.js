import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Task } from './Task';
import { ItemTypes } from './ItemTypes';
import './assets/TaskList.css';
const styleTasks = {
  width: 300,
};

const TaskList = ({ indexBox, tasks, moveTask, onDataChange, onAddOrRemove }) => {

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.TASK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!monitor.isOver({ shallow: true })){
        return;
      }

      const dragIndexBox = item.indexBox;
      const dragIndexTask = item.indexTask;

      // handle only drop in empty task lists
      if (dragIndexBox === indexBox || tasks.length > 0) {
        return;
      }

      // list is empty, set the task on the first position
      moveTask(dragIndexBox, dragIndexTask, indexBox, 0);
      item.indexBox = indexBox;
      item.indexTask = 0;
    },
  });

  const renderTask = useCallback((task, indexTask) => {
    return (
      <Task
        key={task.id}
        task={task}
        indexBox={indexBox}
        indexTask={indexTask}
        moveTask={moveTask}
        onDataChange={onDataChange}
        onAddOrRemove={onAddOrRemove}
      />
    );
  }, [moveTask, indexBox, onDataChange, onAddOrRemove]);

  return (
    <div ref={drop} className='TaskList' data-handler-id={handlerId}>
      <div>Tasks</div>
      <div style={{styleTasks}}>{tasks.map((t, i) => renderTask(t, i))}</div>
      <button
        onClick={() => onAddOrRemove.onTaskAdd(indexBox)}
        className='AddTask'>
        ➕ task
      </button>
    </div>
  );  
};

export default TaskList;
