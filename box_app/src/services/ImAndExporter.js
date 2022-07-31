import update from 'immutability-helper';

export const ImAndExporter = {
  prepareExport: function(board) {
    return {
      version: this.version,
      board: board,
    };
  },
  getBoxesFromImport: function(state) {
    if (state === undefined || state.version === undefined ||
      state.version.major > this.version.major ||
      state.version.minor > this.version.minor || state.board === undefined) {
      console.log('not a valid import: ', state);
      return null;
    }

    let board = state.board;
    if (state.version.major === 0 && state.version.minor === 1) {
      const numBoxes = board.length;
      for (let indexBox = 0; indexBox < numBoxes; indexBox++){
        board = update(board, {
          [indexBox]: {maxDuration: {$set: 0}}});
      }
    }

    return board;
  },
  version: {
    major: 0,
    minor: 2,
  },
};
