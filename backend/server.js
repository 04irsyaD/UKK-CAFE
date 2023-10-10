const express = require("express")
const app = express()
var bodyParser = require('body-parser')
const PORT = 8000
const cors = require(`cors`)
app.use(cors())
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
const userroute = require(`./routes/user.route`)
const transaksiRoute = require(`./routes/transaksi.route`)
const menuRoute = require(`./routes/menu.route`)
const mejaRoute = require(`./routes/meja.route`)
const detail_transaksiRoute = require(`./routes/detail.transaksi.route`)
app.use("/user", userroute)
app.use("/transaksi", transaksiRoute)
app.use("/menu", menuRoute)
app.use("/meja", mejaRoute)
app.use("/detail_transaksi", detail_transaksiRoute)

app.use(express.static(__dirname))
app.listen(PORT, () => {
    console.log(`UKK ${PORT}`)
})