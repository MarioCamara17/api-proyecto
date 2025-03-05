const express = require('express')

//Importar rutas
const productoRoutes = require('./routes/Producto.routes')

//config express
const app = express()
const port = 3000
const cors = require('cors')

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