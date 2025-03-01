const express = require('express');
const router = express.Router();
const {createItem, getItemById, getItems, updateItem, deleteItem} = require('../controller/taskController');

router.post('/items', createItem);
router.get('/items', getItems);
router.get('/items/:id', getItemById);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

module.exports = router;
