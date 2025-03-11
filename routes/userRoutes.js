const express = require("express");
const router = express.Router();
const { createUser, getUsers, deleteUser,getUserById,updateUser } = require("../controllers/userController");

router.get("/user/:id", getUserById);
router.post("/add-user", createUser);
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);


module.exports = router;
