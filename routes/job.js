const express = require("express")
const feedController = require("../controllers/job")
const {check,body} = require("express-validator/check")
const isAuth = require("../middleware/is-auth")

const router = express.Router()



router.post("/",isAuth,feedController.createJobs)
router.get("/",feedController.getJobs)
router.get("/:id",feedController.getJob)
router.delete("/:id",isAuth,feedController.deleteJob)
router.patch("/:id",isAuth,feedController.updateJob)



module.exports = router 