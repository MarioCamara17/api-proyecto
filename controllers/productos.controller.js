const fs = require("fs");
const path = require("path");
const Producto = require("../models/producto.models");
const imagen = require("../utils/image");

async function createProducto(req, res) {
    const productos = new Producto(req.body);

    try {
        if (req.files && req.files.imagep) {
            const imagePath = imagen.getFilePath(req.files.imagep);
            productos.imagep = imagePath;
        }
        const datos = await productos.save();
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
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).send({ msg: "Producto no encontrado" });
        }

        // Eliminar la imagen asociada si existe
        if (producto.imagep) {
            const imagePath = path.join(__dirname, "..", producto.imagep);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log(`Archivo eliminado: ${imagePath}`);
            } else {
                console.log(`Archivo no encontrado: ${imagePath}`);
            }
        }

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
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).send({ msg: "Producto no encontrado" });
        }

        // Si se recibe una nueva imagen, eliminar la anterior
        if (req.files && req.files.imagep) {
            if (producto.imagep) {
                const oldImagePath = path.join(__dirname, "..", producto.imagep);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateproducto.imagep = imagen.getFilePath(req.files.imagep);
        }

        await Producto.findByIdAndUpdate(id, updateproducto);
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
