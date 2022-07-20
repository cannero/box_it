export const ImAndExporter = {
  prepareExport: function(board) {
    return {
      version: this.version,
      board: board,
    };
  },
  getBoxesFromImport: function(state) {
    if (state === undefined || state.version === undefined ||
      state.version.major !== this.version.major ||
      state.version.minor !== this.version.minor || state.board === undefined) {
      console.log('not a valid import: ', state);
      return null;
    }
    return state.board;
  },
  version: {
    major: 0,
    minor: 1,
  },
};
