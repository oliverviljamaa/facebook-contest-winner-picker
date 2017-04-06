const { getUsers, sortUsersByCommentCount } = require('./');

const comments = [
  {
    id: 101,
    message: 'message 1',
    created_time: new Date(2017, 0, 1),
    from: {
      id: 1,
      name: 'Uku',
    },
  },
  {
    id: 102,
    message: 'message 2',
    created_time: new Date(2017, 0, 2),
    from: {
      id: 2,
      name: 'Rain',
    },
  },
  {
    id: 103,
    message: 'message 3',
    created_time: new Date(2017, 0, 3),
    from: {
      id: 1,
      name: 'Uku',
    },
  },
];

jest.mock('../facebook-api-client');

const { getComments } = require('../facebook-api-client');

getComments.mockImplementation(() => Promise.resolve(comments));

describe('Users getter', () => {
  it('gets all comments', () => getUsers(12345).then(() => {
    expect(getComments).toHaveBeenCalledWith(12345);
  }));

  it('returns users with comments', () => getUsers(12345).then((users) => {
    expect(users).toEqual([
      {
        id: 1,
        name: 'Uku',
        comments: [
          { id: 101, message: 'message 1', time: new Date(2017, 0, 1) },
          { id: 103, message: 'message 3', time: new Date(2017, 0, 3) },
        ],
      },
      {
        id: 2,
        name: 'Rain',
        comments: [
          { id: 102, message: 'message 2', time: new Date(2017, 0, 2) },
        ],
      },
    ]);
  }));
});

describe('Users by comment count sorter', () => {
  it('sorts users by comment count', () => {
    const users = [
      { id: 1, comments: [{}, {}] },
      { id: 2, comments: [{}, {}, {}] },
      { id: 3, comments: [{}] },
    ];

    const sortedUsers = sortUsersByCommentCount(users);

    expect(sortedUsers).toEqual([
      { id: 2, comments: [{}, {}, {}] },
      { id: 1, comments: [{}, {}] },
      { id: 3, comments: [{}] },
    ]);
  });
});
