import { useCallback } from 'react';
import { Task } from './Task';

const styleTasks = {
  width: 300,
};

const TaskList = ({ indexBox, tasks, moveTask }) => {

  const renderTask = useCallback((task, indexTask) => {
    return (
      <Task
        key={task.id}
        id={task.id}
        indexBox={indexBox}
        indexTask={indexTask}
        description={task.description}
        duration={task.duration}
        moveTask={moveTask}
      />
    );
  }, [moveTask, indexBox]);

  return (
    <div>
      <div style={{styleTasks}}>{tasks.map((t, i) => renderTask(t, i))}</div>
    </div>
  );  
};

export default TaskList;
