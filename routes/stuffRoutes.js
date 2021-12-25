const express = require("express");
const router = express.Router();
const stuffController = require("../controllers/stuffControllers");

router.post("/", stuffController.createThing);
router.put("/:id", stuffController.modifyThing);
router.delete("/:id", stuffController.deleteThing);
router.get("/", stuffController.getAllThings);
router.get("/:id", stuffController.getOneThing);

module.exports = router;
