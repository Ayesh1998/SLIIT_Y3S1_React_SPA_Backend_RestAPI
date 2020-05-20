const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const HttpError = require('./models/http-errors')
const UserRoutes = require('./routes/user-routes')
const AdminRoutes = require('./routes/admin-routes')
const PaymentRoutes = require('./routes/payment-routes')

require('dotenv').config()

const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(bodyParser.json())
app.use(cors())

app.use('/users', UserRoutes)
app.use('/admin', AdminRoutes)
app.use('/payments', PaymentRoutes)

app.use((req, res, next) => {
  throw new HttpError('Could not find this route.', 404)
})

const uri = process.env.ATLAS_URI
const port = process.env.PORT

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}

mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(port)
    console.log(`Server is running on port: ${port}`)
  })
  .catch((error) => {
    console.log(error)
  })
