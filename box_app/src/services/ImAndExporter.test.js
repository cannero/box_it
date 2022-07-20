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
    version: {major: 0, minor: 1,},
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
  const importState = {
    version: {major: 0, minor: 1,},
    board: [
     {
        id: 'box1',
        tasks: [
        ],
      },
    ],
  };

  const board = [
   {
      id: 'box1',
      tasks: [
      ],
    },
  ];
  expect(ImAndExporter.getBoxesFromImport(importState)).toEqual(board);
});

