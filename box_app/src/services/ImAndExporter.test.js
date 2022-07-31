import { ImAndExporter } from './ImAndExporter';

test('export adds version', () => {
  const board = [
    {
      id: 'box1',
      tasks: [
      ],
    },
  ];

  const exportBoard = {
    version: {major: 0, minor: 2,},
    board: [
      {
        id: 'box1',
        tasks: [
        ],
      },
    ],
  };
  expect(ImAndExporter.prepareExport(board)).toEqual(exportBoard);
});

test('get boxes from import checks version', () => {
  const importState = {
    NoVersionDefined: 'nono',
    boxes: [
     {
        id: 'box1',
        tasks: [
        ],
      },
    ],
  };

  expect(ImAndExporter.getBoxesFromImport(importState)).toEqual(null);
});

test('get boxes from import returns board', () => {
  const importState = getVersion0_2State();

  const board = getVersion0_2State().board;
  expect(ImAndExporter.getBoxesFromImport(importState)).toEqual(board);
});

test('max duration is added to boxes in version 0.1', () => {
  const importState = getVersion0_1State();
  const board =
    [
    {
      id: 'box1',
      descr: 'descr box',
      maxDuration: 0,
      tasks: [
      ],
    },
    ];
  expect(ImAndExporter.getBoxesFromImport(importState)).toEqual(board);
});

const getVersion0_1State = () => {
  return {
    version: {major: 0, minor: 1,},
    board: [
    {
      id: 'box1',
      descr: 'descr box',
      tasks: [
      ],
    },
    ],
  };
}

const getVersion0_2State = () => {
  return {
    version: {major: 0, minor: 2,},
    board: [
    {
      id: 'box1',
      descr: 'descr box',
      maxDuration: 22.3,
      tasks: [
      ],
    },
    ],
  };
}
