import update from 'immutability-helper';

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
    return this.initialBoard;
  },
  getTotalDuration: function(tasks) {
    return tasks.reduce((acc, task) => acc + task.duration, 0);
  },
  setTaskDuration: function(board, indexBox, indexTask, newDuration) {
    return update(board, {
      [indexBox]: {tasks: {[indexTask]: {duration: {$set: newDuration}}}}
    });
  },
  prepareExport: function(board) {
    return {
      version: this.version,
      board: board,
    };
  },
  getBoxesFromImport: function(state) {
    if (state === undefined || state.version !== this.version ||
      state.board === undefined) {
      console.log('not a valid import: ', state);
      return null;
    }
    return state.board;
  },
  version: 0.1,
  initialBoard: [
      {
        id: 1,
        description: "box 1",
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
        tasks: []
      },
    ]
}

