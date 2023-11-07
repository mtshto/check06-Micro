const express = require('express')
const router = express.Router();
const controller = require('../controllers/agendamentos-controller')

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.post)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router;