const router = require('express').Router();

const getRandomUsers = require('../services/random-users-getter');
const getUsersWithMostComments = require('../services/users-with-most-comments-getter');


router.get('/', (req, res) => {
  const { query: { postId, limit, choice } } = req;

  const choiceToMethodMap = {
    random: getRandomUsers,
    popular: getUsersWithMostComments,
  };

  choiceToMethodMap[choice](postId, limit)
    .then((posters) => {
      res.render('pages/index', {
        posters,
        error: null,
      });
    })
    .catch(() => {
      res.render('pages/index', {
        posters: null,
        error: 'Cannot get posters, please check the post ID and try again.',
      });
    });
});

module.exports = router;
