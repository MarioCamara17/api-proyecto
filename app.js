const express = require('express')

//Importar rutas
const productoRoutes = require('./routes/Producto.routes')
const bodyParser=require("body-parser")


//config express
const app = express()
const port = 3000
const cors = require('cors')

//parsear la informacion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Configurar carpeta de carga
app.use(express.static('uploads'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {

})

//Configuracion de cors
app.use(cors())

//Uso de las rutas
app.use('/api', productoRoutes)


//exportar express
module.exports=app;