const boardRepo = require("../repository/boardRepository");

const createBoard = async (boardData) => {
    return boardRepo.create(boardData);
};

const getBoardById = async (boardId, userId) => {
    return boardRepo.findBoardById(boardId, userId);
};

const deleteBoard = async (boardId, ownerId) => {
    const deleteBoard = await boardRepo.deleteBoardById(boardId, ownerId);
    return deleteBoard;
}

const shareBoard = async (boardId, userId, sharedWith) => {
    const board = await boardRepo.shareBoardWithUser(boardId, userId, sharedWith);
    return board;
}

const unshareBoard = async (boardId, userId, sharedWith) => {
    const board = await boardRepo.unshareBoardWithUser(boardId, userId, sharedWith);
    return board;
}

const updateBoard = async (boardId, userId, updateData) => {
    const board = await boardRepo.updateBoardById(boardId, userId, updateData);
    return board;
}

module.exports = { createBoard, getBoardById, deleteBoard, shareBoard , unshareBoard, updateBoard };