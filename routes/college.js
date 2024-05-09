const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create, listAll, remove, read, update, list, collegesCount,listRelated, searchFilters, allColleges } = require("../controllers/college");

// routes
router.post("/college", authCheck, adminCheck, create);
router.get("/colleges/total", collegesCount);
router.get("/colleges/:count", listAll);
router.delete("/college/:slug", authCheck, adminCheck, remove);
router.get("/college/:slug", read);
router.put("/college/:slug", authCheck, adminCheck, update);
router.post("/colleges", list);
router.get("/college/related/:collegeId", listRelated);
router.post("/search/filters", searchFilters);
router.get("/allcolleges",allColleges)
module.exports = router;
