const express = require(`express`)
const app = express()
app.use(express.json())
const detail_transaksiController =
require(`../controller/detail.transaksi.controller`)
const auth =
require(`../auth/auth`)

app.get("/",  detail_transaksiController.getAllDetail)
app.post("/add", auth.authVerify, detail_transaksiController.addDetail)
app.post("/find", auth.authVerify, detail_transaksiController.findDetail)
app.put("/:id", auth.authVerify,detail_transaksiController.updateDetail)
app.delete("/:id", auth.authVerify, detail_transaksiController.deleteDetail)
module.exports = app