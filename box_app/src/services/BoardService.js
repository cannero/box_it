import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';

const boardKey = 'boardKey';

export const BoardService = {
  moveBox: function(board, prevIndex, newIndex) {
    return update(board, {
      $splice: [
        [prevIndex, 1],
        [newIndex, 0, board[prevIndex]],
      ],
    });
  },
  moveTask: function(board, prevBoxIndex, prevTaskIndex, newBoxIndex, newTaskIndex) {
    if (prevBoxIndex === newBoxIndex){
      return update(board, {
        [newBoxIndex]: {tasks: {$splice: [
          [prevTaskIndex, 1],
          [newTaskIndex, 0, board[prevBoxIndex].tasks[prevTaskIndex]],
        ]}}
      });
    }
    else {
      return update(board, {
        [prevBoxIndex]: {tasks: {$splice: [
          [prevTaskIndex, 1],
        ]}},
        [newBoxIndex]: {tasks: {$splice: [
          [newTaskIndex, 0, board[prevBoxIndex].tasks[prevTaskIndex]],
        ]}}
      });
    }
  },
  getBoard: function() {
    const board = localStorage.getItem(boardKey);
    console.log('getting', board);
    if (board !== undefined && board !== null) {
      return JSON.parse(board);
    } else {
      return this.initialBoard;
    }
  },
  getTotalDuration: function(tasks) {
    return tasks.reduce((acc, task) => acc + task.duration, 0);
  },
  setBoxMaxDuration: function(board, indexBox, newDuration) {
    return update(board, {
      [indexBox]: {maxDuration: {$set: newDuration}}
    });
  },
  setBoxDescription: function(board, indexBox, newDescription) {
    return update(board, {
      [indexBox]: {description: {$set: newDescription}}
    });
  },
  setTaskDuration: function(board, indexBox, indexTask, newDuration) {
    return update(board, {
      [indexBox]: {tasks: {[indexTask]: {duration: {$set: newDuration}}}}
    });
  },
  setTaskDescription: function(board, indexBox, indexTask, newDescription) {
    return update(board, {
      [indexBox]: {tasks: {[indexTask]: {description: {$set: newDescription}}}}
    });
  },
  addBox: function(board) {
    const newBox = {id: uuidv4(), description: '', tasks: []};
    return update(board, {$push: [newBox]});
  },
  removeBox: function(board, indexBox) {
    return update(board, {$splice: [
        [indexBox, 1]
    ]});
  },
  addTask: function(board, indexBox) {
    const newTask = {id: uuidv4(), description: '', duration: 0};
    return update(board, {[indexBox]: {tasks: {$push: [newTask]}}});
  },
  removeTask: function(board, indexBox, indexTask) {
    return update(board, {[indexBox]: {tasks: {$splice: [
      [indexTask, 1]
    ]}}});
  },
  saveBoard: function(board) {
    console.log('saving', board);
    localStorage.setItem(boardKey, JSON.stringify(board));
  },
  initialBoard: [
      {
        id: 1,
        description: "box 1",
        maxDuration: 10,
        tasks: [
          {
            id: 1,
            description: "task one",
            duration: 2.5
          }
        ]
      },
      {
        id: 2,
        description: "box 2",
        maxDuration: 20,
        tasks: [
          {
            id: 2,
            description: "task two",
            duration: 1.5
          },
          {
            id: 3,
            description: "task three",
            duration: 4.0
          }
        ]
      },
      {
        id: 3,
        description: "box 3",
        maxDuration: 12,
        tasks: []
      },
    ]
}

