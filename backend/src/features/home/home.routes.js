import express from "express";
import HomeController from "./home.controller.js";
import {authMiddleware} from "../../middlewares/authenticate.js";

const router = express.Router();
const homeController = new HomeController();

router.get("/", authMiddleware, (req, res) => homeController.getAllScannedUsers(req, res));
router.post("/scan", (req, res) => homeController.saveScannedUser(req, res));
router.get("/search", authMiddleware, (req, res) => homeController.getAllScannedUsers(req, res));

// router.get("/", authMiddleware, (req, res) => homeController.getAllScannedUsers(req, res));
router.post("/", authMiddleware, (req, res) => homeController.saveScannedUser(req, res));

// router.post("/scan", authMiddleware, (req, res) => HomeController.scan(req, res));
// router.get("/", authMiddleware, (req, res) => HomeController.getAll(req, res));
router.delete("/email/:email", authMiddleware, (req, res) => HomeController.deleteByEmail(req, res));


export default router;
