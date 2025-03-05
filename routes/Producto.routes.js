const express = require('express');

const ProductoController = require('../controllers/productos.controller');

const api = express.Router();

api.post("/createproducto", ProductoController.createProducto);

api.get("/getproducto", ProductoController.getProducto);

api.delete("/delproducto:id", ProductoController.delProducto);

api.put("/updateproducto:id", ProductoController.updateProducto);


module.exports = api;