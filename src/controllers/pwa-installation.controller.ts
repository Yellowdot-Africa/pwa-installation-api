import { Request, Response } from "express";
import * as service from "../services/pwa-installation.service";
import { PwaInstallationDto, PwaInstallationParamDto } from "../dtos/pwa-installation.dto";

export const createPwaInstallation = async (req: Request, res: Response) => {
  try {
    const dto = (req as any).validatedData as PwaInstallationDto;
    console.log("Creating PWA installation with data:", dto);
    
    const upsert = await service.upsertPwaInstallation(dto);
    console.log("PWA installation created successfully:", upsert);
    
    res.status(201).json(upsert);
  } catch (err) {
    console.error("Error creating PWA installation:", err);
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getPwaInstallation = async (_req: Request, res: Response) => {
  try {
    console.log("Fetching all PWA installations");
    
    const installs = await service.listPwaInstallations();
    console.log(`Fetched ${installs.length} installations`);
    
    res.json(installs);
  } catch (err) {
    console.error("Error fetching PWA installations:", err);
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getPwaInstallationByMsisdn = async (req: Request, res: Response) => {
  try {
    const dto = (req as any).validatedData as PwaInstallationParamDto;
    console.log(`Fetching PWA installation by msisdn: ${dto.msisdn}`);
    
    const install = await service.getPwaInstallationById(dto.msisdn);
    if (!install) {
      console.warn(`PWA installation not found for msisdn: ${dto.msisdn}`);
      return res.status(404).json({ error: "Installation not found" });
    }
    
    console.log("PWA installation found:", install);
    res.json(install);
  } catch (err) {
    console.error("Error fetching PWA installation by msisdn:", err);
    res.status(500).json({ error: (err as Error).message });
  }
};
