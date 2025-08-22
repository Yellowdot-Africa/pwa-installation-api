import { Router } from "express";
import {
  createPwaInstallation,
  getPwaInstallation,
  getPwaInstallationByMsisdn
} from "../controllers/pwa-installation.controller";
import { validationMiddleware } from "../middlewares/validation-middleware";

import { PwaInstallationDto, PwaInstallationParamDto } from "../dtos/pwa-installation.dto";

const router = Router();

router.post(
  "/",
  validationMiddleware(PwaInstallationDto, "body"),  // validate req.body for POST
  createPwaInstallation
);

router.get("/", getPwaInstallation);

router.get(
  "/msisdn/:msisdn",
  validationMiddleware(PwaInstallationParamDto, "params"),  // validate req.params for msisdn
  getPwaInstallationByMsisdn
);

export default router;
