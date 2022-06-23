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
