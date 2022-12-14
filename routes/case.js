import express from "express";
import { createCase, getAllCase } from "../controllers/case.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = express.Router();

// create a user
// Dont need this anymore. Now user can register
router.post("/", checkAuth, createCase);

// get all user
router.get("/", checkAuth, getAllCase);

// // get own profile
// router.get("/me", checkAuth, getOwnProfile);

// // get a user by id
// router.get("/:userId", checkAuth, getUser);

// // update a user by id
// router.patch("/:userId", checkAuth, updatedUser);

// // delete a user by id
// router.delete("/:userId", checkAuth, deleteUser);

export default router;