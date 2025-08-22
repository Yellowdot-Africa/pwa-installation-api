import { AppDataSource } from "../config/db";
import { Repository } from "typeorm";
import { PwaInstallationTrack } from "../models/pwa-installation.entity";
import { PwaInstallationDto } from "../dtos/pwa-installation.dto";

export class PwaInstallationRepository {
  private repo: Repository<PwaInstallationTrack>;

  constructor() {
    this.repo = AppDataSource.getRepository(PwaInstallationTrack);
  }

  async createPwaInstallation(data: PwaInstallationDto): Promise<PwaInstallationTrack> {
    const user = this.repo.create(data);
    return await this.repo.save(user);
  }

  async getAllPwaInstallation(): Promise<PwaInstallationTrack[]> {
    return await this.repo.find();
  }

  async findById(id: number): Promise<PwaInstallationTrack | null> {
    return await this.repo.findOneBy({ id });
  }
}
