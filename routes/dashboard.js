const express = require("express");
const router = express.Router();
const { dashboard, edit, deleteUser, update } = require("../controllers/dashboard");

router.get("/dashboard", dashboard);
router.get("/dashboard/edit/:id", edit);
router.get("/dashboard/delete/:id", deleteUser);
router.post("/dashboard/update", update);

module.exports = router;