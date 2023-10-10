const express = require(`express`)
const app = express()
app.use(express.json())
const userController =
require(`../controller/user.controller`)
const auth =
require(`../auth/auth`)

app.get("/", auth.authVerify, userController.getAllUser)
app.get("/", auth.authVerify, userController.findUserbyId);
app.post("/add",  userController.addUser)
app.post("/login", userController.login)
app.post("/find", auth.authVerify, userController.findUser)
app.put("/:id", auth.authVerify, userController.updateUser)
app.delete("/:id", auth.authVerify, userController.deleteUser)
module.exports = app