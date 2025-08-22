const boardRepo = require("../repository/boardRepository");

const createBoard = async (boardData) => {
  return boardRepo.create(boardData);
};

module.exports = { createBoard };