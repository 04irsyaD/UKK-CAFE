const express = require(`express`)
const app = express()
app.use(express.json())
const transaksiController =
require(`../controller/transaksi.controller`)
const auth =
require(`../auth/auth`)

app.get("/",  transaksiController.getAllTransaksi)
app.get("/user/:id",  transaksiController.getTransactionsByid_user)
app.post("/add", auth.authVerify, transaksiController.addTransaksi)
app.post("/find", auth.authVerify, transaksiController.findTransaksi)
app.put("/:id", auth.authVerify, transaksiController.updateTransaksi)
app.delete("/:id", auth.authVerify, transaksiController.deleteTransaksi)
module.exports = app

