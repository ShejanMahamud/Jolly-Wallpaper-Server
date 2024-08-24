import express from "express";
import { createUser, deleteUser, editUser, getAllUser, getUser } from "../../controllers/user/user.js";

const router = express.Router();

router.route("/")
.get(getAllUser)
.post(createUser)

router.route("/:email")
.get(getUser)
.patch(editUser)
.delete(deleteUser)

export default router;
