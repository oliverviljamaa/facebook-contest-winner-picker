const getUsersWithMostComments = require('./');

const testUsers = [
  { id: 1, comments: [{}] },
  { id: 2, comments: [{}] },
  { id: 3, comments: [{}] },
  { id: 4, comments: [{}] },
  { id: 5, comments: [{}] },
  { id: 6, comments: [{}] },
  { id: 7, comments: [{}] },
  { id: 8, comments: [{}] },
  { id: 9, comments: [{}, {}] },
  { id: 10, comments: [{}, {}, {}] },
  { id: 11, comments: [{}, {}, {}] },
];

jest.mock('../user');
jest.mock('../utils');

const { getUsers, sortUsersByCommentCount } = require('../user');
const { limitTo } = require('../utils');

getUsers.mockImplementation(() => Promise.resolve(testUsers));
sortUsersByCommentCount.mockImplementation(arr => arr.slice().reverse());
limitTo.mockImplementation(limit => arr => arr.slice(0, limit));

describe('Users with most comments getter', () => {
  it('gets users', () => getUsersWithMostComments(12345).then(() => {
    expect(getUsers).toHaveBeenCalledWith(12345);
  }));

  it('sorts users by comment count', () => getUsersWithMostComments(12345).then(() => {
    expect(sortUsersByCommentCount).toHaveBeenCalledWith(testUsers);
  }));

  it('returns 10 users if no limit', () =>
    getUsersWithMostComments(12345).then((users) => {
      expect(users).toEqual([
        { id: 11, comments: [{}, {}, {}] },
        { id: 10, comments: [{}, {}, {}] },
        { id: 9, comments: [{}, {}] },
        { id: 8, comments: [{}] },
        { id: 7, comments: [{}] },
        { id: 6, comments: [{}] },
        { id: 5, comments: [{}] },
        { id: 4, comments: [{}] },
        { id: 3, comments: [{}] },
        { id: 2, comments: [{}] },
      ]);
    })
  );

  it('returns specified number of users if set limit', () =>
    getUsersWithMostComments(12345, 3).then((users) => {
      expect(users).toEqual([
        { id: 11, comments: [{}, {}, {}] },
        { id: 10, comments: [{}, {}, {}] },
        { id: 9, comments: [{}, {}] },
      ]);
    })
  );
});
