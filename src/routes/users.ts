import express from 'express'
const router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  const list = [{ Hello: 'respond with a resource' }, { Hello: 'respond with a resource' }, { Hello: 'respond with a resource' }, { Hello: 'respond with a resource' }]
  res.send(list)
});

export default router
