const getRandomUsers = require('./');

const testUsers = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
];

jest.mock('shuffle-array');
jest.mock('../user');
jest.mock('../utils');

const shuffle = require('shuffle-array');
const { getUsers } = require('../user');
const { limitTo } = require('../utils');

getUsers.mockImplementation(() => Promise.resolve(testUsers));
shuffle.mockImplementation(arr => arr.slice().reverse());
limitTo.mockImplementation(limit => arr => arr.slice(0, limit));

describe('Random users getter', () => {
  it('gets users', () => getRandomUsers(12345).then(() => {
    expect(getUsers).toHaveBeenCalledWith(12345);
  }));

  it('shuffles users', () => getRandomUsers(12345).then(() => {
    expect(shuffle).toHaveBeenCalledWith(testUsers);
  }));

  it('returns 10 users if no limit', () =>
    getRandomUsers(12345).then((users) => {
      expect(users).toEqual([
        { id: 11 },
        { id: 10 },
        { id: 9 },
        { id: 8 },
        { id: 7 },
        { id: 6 },
        { id: 5 },
        { id: 4 },
        { id: 3 },
        { id: 2 },
      ]);
    })
  );

  it('returns specified number of users if set limit', () =>
    getRandomUsers(12345, 3).then((users) => {
      expect(users).toEqual([
        { id: 11 },
        { id: 10 },
        { id: 9 },
      ]);
    })
  );
});
