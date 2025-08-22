import { Router } from "express";                // 👈 import user routes
import pwaRoutes from "./routes/pwa-installation.routes";        // 👈 import pwa routes

const router = Router();

router.use("/pwainstallation", pwaRoutes);

export default router;
