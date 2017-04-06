const router = require('express').Router();

const commentsController = require('./comments');


router.get('/', (req, res) => {
  res.render('pages/index', {
    posters: null,
    error: null,
  });
});

router.use('/comments', commentsController);

module.exports = router;
