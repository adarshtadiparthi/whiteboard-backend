const Board = require("../persistence/models/Board");

const findBoardsForUser = async (userId) => {
  return Board.find({
    $or: [
      { owner: userId },
      { "shared.userId": userId }
    ]
  });
};

const create = async (boardData) => {
    const board = new Board(boardData);
    return board.save();
};

const findBoardById = async (boardId, userId) => {
  return Board.findOne({
    _id: boardId,
    $or: [
      { owner: userId },
      { "shared.userId": userId }
    ]
  });
};

async function deleteBoardById(boardId, ownerId) {
  return Board.findOneAndDelete({ _id: boardId, owner: ownerId });
};

async function shareBoardWithUser(boardId, ownerId, sharedWith) {
//   sharedWith: { userId, email }
  return Board.findOneAndUpdate(
    {
      _id: boardId,
      "shared.email": { $ne: sharedWith.email } // prevent duplicate email
    },
    { $push: { shared: sharedWith } },
    { new: true }
  );
};

async function unshareBoardWithUser(boardId, ownerId, sharedWith) {
  return Board.findOneAndUpdate(
    { _id: boardId, owner: ownerId },
    { $pull: { shared: { email: sharedWith.email } } },
    { new: true }
  );
};

async function updateBoardById(boardId, userId, updateData) {
    return Board.findOneAndUpdate(
        {
            _id: boardId,
            $or: [
                { owner: userId },
                { "shared.userId": userId }
            ]
        },
        { $set: updateData },
        { new: true }
    );
}

module.exports = { findBoardsForUser, create, findBoardById, deleteBoardById, shareBoardWithUser, unshareBoardWithUser, updateBoardById };