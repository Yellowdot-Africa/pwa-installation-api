import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("pwa_installation_track")
export class PwaInstallationTrack {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  msisdn!: string;

  @Column()
  status!: boolean;

  @Column({ type: "int" })
  no_count!: number;

  @Column({ type: "datetime", nullable: true })
  next_prompt!: Date | null;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;
}
