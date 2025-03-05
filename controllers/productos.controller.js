async function createProducto(req,res) {
    res.status(200).send({message: "Crear productos"});
}

async function getProducto(req,res) {
    res.json({message: "Obtener productos"});
    
}

async function delProducto(req,res){
    res.status(200).send({message: "Eliminar"});
}

async function updateProducto(req,res){
    res.status(200).send({message: "producto actualizado"});
}

module.exports = {
    createProducto,
    getProducto,
    delProducto,
    updateProducto
}