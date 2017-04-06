const shuffle = require('shuffle-array');

const { getUsers } = require('../user');
const { limitTo } = require('../utils');


module.exports = (id, limit = 10) =>
  getUsers(id).then(shuffle).then(limitTo(limit));
