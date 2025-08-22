import { AppDataSource } from "../config/db"; // adjust path as needed
import { PwaInstallationTrack } from "../models/pwa-installation.entity";
import { PwaInstallationDto } from "../dtos/pwa-installation.dto";

const repo = AppDataSource.getRepository(PwaInstallationTrack);

export const upsertPwaInstallation = async (data: PwaInstallationDto) => {
  const now = new Date();
  try {
    console.log(`[PWA] Upserting installation for msisdn: ${data.msisdn}`);

    const existing = await repo.findOne({ where: { msisdn: data.msisdn } });

    if (existing) {
      // --- Update existing record ---
      let noCount = existing.no_count ?? 0;
      let nextPrompt = existing.next_prompt;

      if (data.consented_to_install === false) {
        noCount += 1;
        // Accumulate +30 days from current next_prompt or now if missing
        const baseDate = existing.next_prompt ? new Date(existing.next_prompt) : now;
        nextPrompt = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000);
      } else {
        // if status is true → reset prompt to null
        nextPrompt = null;
      }

      const entity = repo.merge(existing, {
        ...data,
        no_count: noCount,
        next_prompt: nextPrompt,
        updated_at: now,
      });

      const saved = await repo.save(entity);
      console.log(
        `[PWA] Updated record for msisdn: ${data.msisdn}, no_count=${noCount}, next_prompt=${nextPrompt}`
      );
      return saved;
    }

    // --- Create new record ---
    const nextPrompt =
      data.consented_to_install === false
        ? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // +7 days for new false status
        : null;

    const entity = repo.create({
      ...data,
      consented_to_install: data.consented_to_install ?? false,
      next_prompt: nextPrompt,
      no_count: data.consented_to_install === false ? 1 : 0,
      created_at: now,
      updated_at: now,
    });

    const saved = await repo.save(entity);
    console.log(
      `[PWA] Created record for msisdn: ${data.msisdn}, no_count=${entity.no_count}, next_prompt=${nextPrompt}`
    );
    return saved;
  } catch (error) {
    console.error(`[PWA] Error upserting installation for msisdn: ${data.msisdn}`, error);
    throw error;
  }
};

export const listPwaInstallations = async () => {
  console.log("[PWA] Listing all installations");
  const installs = await repo.find();
  console.log(`[PWA] Found ${installs.length} installations`);
  return installs;
};

export const getPwaInstallationById = async (msisdn: string) => {
  console.log(`[PWA] Fetching installation by msisdn: ${msisdn}`);
  const install = await repo.findOneBy({ msisdn });
  if (!install) {
    console.warn(`[PWA] No installation found for msisdn: ${msisdn}`);
  }
  return install;
};
