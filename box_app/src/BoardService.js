import update from 'immutability-helper';

export const BoardService = {
  spliceBoxes: function(board, prevIndex, newIndex){
    return update(board, {
      $splice: [
        [prevIndex, 1],
        [newIndex, 0, board[prevIndex]],
      ],
    });
  },
  getBoard: function(){
      return this.initialBoard;
  },
  initialBoard: [
      {
        id: 1,
        description: "box 1",
        tasks: [
          {
            id: 1,
            description: "task one",
            duration: 2.5
          }]
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
          }]
      },
      {
        id: 3,
        description: "box 3",
        tasks: []
      },
    ]
}

