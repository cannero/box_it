import { BoardService } from './BoardService';

it('returns items', () => {
  expect(BoardService.getBoard()).toBeDefined();
});

it('moves box to front', () => {
  const board = [
    {
      id: 'box1'
    },
    {
      id: 'box2'
    },
    {
      id: 'box3'
    },
    {
      id: 'box4'
    }
  ];
  const boardBox3MovedToFront = [
    {
      id: 'box3'
    },
    {
      id: 'box1'
    },
    {
      id: 'box2'
    },
    {
      id: 'box4'
    }
  ];
  expect(BoardService.moveBox(board, 2, 0)).toEqual(boardBox3MovedToFront);
});

it('moves box to back', () => {
  const board = [
    {
      id: 'box1'
    },
    {
      id: 'box2'
    },
    {
      id: 'box3'
    },
    {
      id: 'box4'
    }
  ];
  const boardBox2MovedToBack = [
    {
      id: 'box1'
    },
    {
      id: 'box3'
    },
    {
      id: 'box2'
    },
    {
      id: 'box4'
    }
  ];
  expect(BoardService.moveBox(board, 1, 2)).toEqual(boardBox2MovedToBack);
});

it('moves task in box', () => {
  const board = [
    {
      id: 'box1',
      tasks: [
        {
          id: 'task1',
        },
        {
          id: 'task2',
        },
      ],
    },
    {
      id: 'box2',
      tasks: [
        {
          id: 'task3',
        },
        {
          id: 'task4',
        },
      ],
    }
  ];

  const boardTaskMovedInBox2 = [
    {
      id: 'box1',
      tasks: [
        {
          id: 'task1',
        },
        {
          id: 'task2',
        },
      ],
    },
    {
      id: 'box2',
      tasks: [
        {
          id: 'task4',
        },
        {
          id: 'task3',
        },
      ],
    }
  ];
  const boxIndex = 1;
  const taskIndexFrom = 0;
  const taskIndexTo = 1;
  expect(BoardService.moveTask(board, boxIndex, taskIndexFrom, boxIndex, taskIndexTo))
    .toEqual(boardTaskMovedInBox2);
});

it('moves task between boxes', () => {
  const board = [
    {
      id: 'box1',
      tasks: [
        {
          id: 'task1',
        },
        {
          id: 'task2',
        },
      ],
    },
    {
      id: 'box2',
      tasks: [
        {
          id: 'task3',
        },
        {
          id: 'task4',
        },
      ],
    }
  ];

  const boardTaskMovedFrom2To1 = [
    {
      id: 'box1',
      tasks: [
        {
          id: 'task1',
        },
        {
          id: 'task3',
        },
        {
          id: 'task2',
        },
      ],
    },
    {
      id: 'box2',
      tasks: [
        {
          id: 'task4',
        },
      ],
    }
  ];
  const boxIndexFrom = 1;
  const boxIndexTo = 0
  const taskIndexFrom = 0;
  const taskIndexTo = 1;
  expect(BoardService.moveTask(board, boxIndexFrom, taskIndexFrom, boxIndexTo, taskIndexTo))
    .toEqual(boardTaskMovedFrom2To1);
});

test('duration is summed correctly', () => {
  const tasks = [
      {
        id: 'task1',
        duration: 1.2,
      },
      {
        id: 'task3',
        duration: 0.1,
      },
      {
        id: 'task2',
        duration: 2.2,
      },
    ];

  expect(BoardService.getTotalDuration(tasks)).toBeCloseTo(3.5);
});

test('duration for empty tasks is zero', () => {
  const emptyTasks = [ ];

  expect(BoardService.getTotalDuration(emptyTasks)).toBeCloseTo(0);
});

test('changes box description', () => {
  const indexBox = 1;
  const newDescription = 'new box 2 description';

  const changedBoard = BoardService.setBoxDescription(getInitialBoard(), indexBox, newDescription);
  expect(changedBoard[indexBox].description).toEqual(newDescription);
});

test('task duration is changed', () => {
  const board = [
    {
      id: 'box1',
      tasks: [
      ],
    },
    {
      id: 'box2',
      tasks: [
        {
          id: 'task1',
          duration: 1.3,
        },
        {
          id: 'task2',
          duration: 3.3,
        },
        {
          id: 'task3',
          duration: 2.5,
        },
      ],
    }
  ];

  const boardDurationChanged = [
    {
      id: 'box1',
      tasks: [
      ],
    },
    {
      id: 'box2',
      tasks: [
        {
          id: 'task1',
          duration: 1.3,
        },
        {
          id: 'task2',
          duration: 3.3,
        },
        {
          id: 'task3',
          duration: 9.4,
        },
      ],
    }
  ];

  const indexBox = 1;
  const indexTask = 2;
  const duration = 9.4;

  expect(BoardService.setTaskDuration(board, indexBox, indexTask, duration))
    .toEqual(boardDurationChanged);
});

test('changes task description', () => {
  const indexBox = 1;
  const indexTask = 2;
  const newDescription = 'new task 3 description';

  const changedBoard = BoardService.setTaskDescription(getInitialBoard(), indexBox, indexTask, newDescription);
  expect(changedBoard[indexBox].tasks[indexTask].description).toEqual(newDescription);
});

test('a new box with an id is added', () => {
  const emptyBoard = [];
  const boardWithBoxAdded = BoardService.addBox(emptyBoard);
  expect(boardWithBoxAdded.length).toEqual(1);
  expect(boardWithBoxAdded[0].id).toEqual(expect.stringContaining('-'));
});

test('box is removed', () => {
  const indexBox = 0;
  const boardWithBoxRemoved = BoardService.removeBox(getInitialBoard(), indexBox);
  expect(boardWithBoxRemoved[0].id).toEqual('box2');
});

test('a new task with an id is added', () => {
  const indexBox = 0;
  const boardWithTaskAdded = BoardService.addTask(getInitialBoard(), indexBox);
  expect(boardWithTaskAdded[indexBox].tasks.length).toEqual(1);
  expect(boardWithTaskAdded[0].tasks[0].id).toEqual(expect.stringContaining('-'));
});

test('task is removed', () => {
  const indexBox = 1;
  const indexTask = 1;
  const boardWithTaskRemoved = BoardService.removeTask(getInitialBoard(), indexBox, indexTask);
  expect(boardWithTaskRemoved[indexBox].tasks[0].id).toEqual('task1');
  expect(boardWithTaskRemoved[indexBox].tasks[1].id).toEqual('task3');
});

test('max duration is updated', () => {
  const board = getInitialBoard();
  const indexBox = 1;
  const newDuration = 2345.123;
  const boardWithNewDuration = BoardService.setBoxMaxDuration(board, indexBox, newDuration);
  expect(boardWithNewDuration[indexBox].maxDuration).toBeCloseTo(newDuration);
});

const getInitialBoard = () => {
  const board = [
    {
      id: 'box1',
      description: 'descr box 1',
      maxDuration: 1.0,
      tasks: [
      ],
    },
    {
      id: 'box2',
      description: 'descr box 2',
      maxDuration: 2.0,
      tasks: [
        {
          id: 'task1',
          description: 'descr task 1',
          duration: 1.3,
        },
        {
          id: 'task2',
          description: 'descr task 2',
          duration: 3.3,
        },
        {
          id: 'task3',
          description: 'descr task 3',
          duration: 2.5,
        },
      ],
    }
  ];
  return board;
};
