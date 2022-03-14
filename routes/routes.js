var exprees = require('express');

var venom = require('../modules/venom');

var api = exprees.Router();

api.get('/',venom.f);

module.exports = api;