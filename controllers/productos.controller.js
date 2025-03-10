const Producto = require("../models/producto.models");
const imagen = require("../utils/image");

async function createProducto(req, res) {
    const productos = new Producto(req.body);

    try {
        if (req.files.imagep) {
            const imagePath = imagen.getFilePath(req.files.imagep);
            productos.imagep = imagePath; // Asignar el valor a la propiedad imagep
        }
        const datos = await productos.save(); // Cambiar producto a productos
        res.status(200).send(datos);
    } catch (error) {
        res.status(500).send({ msg: "Error al crear el producto" });
        console.log(error);
    }
}

async function getProducto(req, res) {
    try {
        const buscarProducto = await Producto.find();
        res.status(200).send(buscarProducto);
    } catch (error) {
        res.status(500).send({ msg: "Error al buscar el producto" });
        console.log(error);
    }
}

async function delProducto(req, res) {
    const { id } = req.params;
    try {
        await Producto.findByIdAndDelete(id);
        res.status(200).send({ msg: "Producto eliminado" });
    } catch (error) {
        res.status(500).send({ msg: "Error al eliminar el producto" });
        console.log(error);
    }
}

async function updateProducto(req, res) {
    const { id } = req.params;
    const updateproducto = req.body;
    try {
        const update = await Producto.findByIdAndUpdate({ _id: id }, updateproducto);
        res.status(200).send({ msg: "Producto actualizado" });
    } catch (error) {
        res.status(400).send({ msg: "Error al actualizar el producto" });
        console.log(error);
    }
}

module.exports = {
    createProducto,
    getProducto,
    delProducto,
    updateProducto
};