const { getUsers, sortUsersByCommentCount } = require('../user');
const { limitTo } = require('../utils');


module.exports = (id, limit = 10) =>
  getUsers(id).then(sortUsersByCommentCount).then(limitTo(limit));
