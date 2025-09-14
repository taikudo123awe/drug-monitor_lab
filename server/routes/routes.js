    const express = require('express');// As in the server.js
    const route = express.Router(); //Allows us use express router in this file
    const services = require('../services/render');//uses the render.js file from services here

    const controller = require('../controller/controller');//uses the render.js file from services here

    const validateDrug = require('../middlewares/validateDrug');//import the validation middleware
    route.get('/', services.home);


    route.get('/manage', services.manage);
    route.get('/dosage', services.dosage);
    route.get('/purchase', services.purchase);
    route.get('/add-drug', services.addDrug);
    route.get('/update-drug', services.updateDrug);

    // Purchase page
    route.get('/purchase', controller.purchase);   // GET: hiển thị purchase.ejs với danh sách drugs
    route.post('/purchase', controller.purchase);  // POST: xử lý form khi user nhập số ngày

    // API for CRUD operations
    route.post('/api/drugs',validateDrug ,controller.create);
    route.get('/api/drugs', controller.find);
    route.put('/api/drugs/:id',validateDrug ,controller.update);
    route.delete('/api/drugs/:id', controller.delete);


    module.exports = route;//exports this so it can always be used elsewhere
