const { orderBy } = require('lodash');

const { getComments } = require('../facebook-api-client');


const convertCommentsToUsers = comments => comments.reduce((users, comment) => {
  const id = comment.from.id;
  const name = comment.from.name;

  const newComment = {
    id: comment.id,
    message: comment.message,
    time: comment.created_time,
  };

  const existingUser = users.find(user => user.id === id);

  if (!existingUser) {
    return [...users, { id, name, comments: [newComment] }];
  }

  existingUser.comments.push(newComment);

  return users;
}, []);

const getUsers = id => getComments(id).then(convertCommentsToUsers);

const sortUsersByCommentCount = users => orderBy(users, user => user.comments.length, 'desc');

module.exports = { getUsers, sortUsersByCommentCount };
