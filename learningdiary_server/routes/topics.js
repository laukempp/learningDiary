var express = require("express");
var router = express.Router();
const query = require("../controllers/query");
const db = require("../config/config");

/* GET users listing. */
// router.get("/", function(req, res, next) {
//   res.send("yhteys toimii");
// });

// router.get("/", (req, res) => res.send("hello world"));
router.get("/", (req, res) => query.getTableData(req, res, db));
router.post("/", (req, res) => query.postTableData(req, res, db));
router.put("/", (req, res) => query.putTableData(req, res, db));
router.delete("/", (req, res) => query.deleteTableData(req, res, db));

module.exports = router;
