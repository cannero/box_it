import { BoardService } from './BoardService';

it('returns items', () => {
  expect(BoardService.getBoard()).toBeDefined();
});

it('splices boxes', () => {
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
  const boardSpliced = [
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
  expect(BoardService.spliceBoxes(board, 2, 0)).toEqual(boardSpliced);
});
