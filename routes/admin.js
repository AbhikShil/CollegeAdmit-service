const express = require("express");
const { auth } = require("../firebase");

const router = express.Router();

// middlewares
const { authCheck, adminCheck ,collegeAdminCheck} = require("../middlewares/auth");

const { orders, orderStatus, getUser, saveComment} = require("../controllers/admin");

// routes
router.put("/admin/userData",authCheck,collegeAdminCheck, getUser );
router.get("/admin/orders", authCheck, collegeAdminCheck, orders);
router.put("/admin/order-status", authCheck, collegeAdminCheck, orderStatus);
router.put("/admin/save-comment", authCheck, collegeAdminCheck, saveComment)

module.exports = router;
