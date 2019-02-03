const express = require('express');
const router = express.Router();

const consultoresController = require('../controlles/consultor');

router.get('/cons', consultoresController.prueba);

router.post('/rotatorio',consultoresController.Rotatorio);

// router.post('/custo_fixo',consultoresController.custo_fixo);

// router.post('/comissao',consultoresController.Comissao);






module.exports = router;