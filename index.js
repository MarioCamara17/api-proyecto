const mongoose = require("mongoose");
const app = require('./app');
const {
    DB_USER,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    IP_SERVER
} = require("./constantes");

const port = process.env.PORT || 4000;

// Función asíncrona para conectar a la BD y levantar el servidor
async function connectDBAndStartServer() {
    try {
        await mongoose.connect(`mongodb://${IP_SERVER}:${DB_PORT}/${DB_NAME}`);
        console.log("Conexión exitosa a la base de datos");

        app.listen(port, () => {
            console.log("*****************");
            console.log("***API REST *****");
            console.log("*****************");
            console.log(`https://${IP_SERVER}:${port}/api`);
        });
    } catch (error) {
        console.error("Error al conectar a la base de datos", error);
    }
}

connectDBAndStartServer();
