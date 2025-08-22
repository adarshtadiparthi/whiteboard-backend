const Board = require("../persistence/models/Board");

const findBoardsForUser = async (userId) => {
  return Board.find({
    $or: [
      { owner: userId },
      { shared: userId }
    ]
  });
};

const create = async (boardData) => {
    const board = new Board(boardData);
    return board.save();
};

module.exports = { findBoardsForUser, create };