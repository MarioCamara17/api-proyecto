const express = require('express');
const multiparty= require('connect-multiparty');

const ProductoController = require('../controllers/productos.controller');


const md_mparty= multiparty({uploadDir:"./uploads"});
const api = express.Router();

api.post("/createproducto", [md_mparty] , ProductoController.createProducto);

api.get("/getproducto", ProductoController.getProducto);

api.delete("/delproducto/:id", ProductoController.delProducto);

api.patch("/updateproducto/:id", [md_mparty] ,ProductoController.updateProducto);


module.exports = api;