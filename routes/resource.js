var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var squirrel_controller = require('../controllers/squirrel');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// squirrel ROUTES ///
// POST request for creating a squirrel.
router.post('/squirrels', squirrel_controller.squirrel_create_post);
// DELETE request to delete squirrel.
router.delete('/squirrels/:id', squirrel_controller.squirrel_delete);
// PUT request to update squirrel.
router.put('/squirrels/:id', squirrel_controller.squirrel_update_put);
// GET request for one squirrel.
router.get('/squirrels/:id', squirrel_controller.squirrel_detail);
// GET request for list of all squirrel items.
router.get('/squirrels', squirrel_controller.squirrel_list);
module.exports = router;