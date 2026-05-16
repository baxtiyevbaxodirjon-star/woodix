import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./User.js";
import { CuttingPlan } from "./CuttingPlan.js";

export enum FurnitureType {
  CABINET = "cabinet",
  TABLE = "table",
  DESK = "desk",
  BOOKSHELF = "bookshelf",
  WARDROBE = "wardrobe",
  TV_STAND = "tv_stand",
  SIDEBOARD = "sideboard",
  CUSTOM = "custom",
}

@Entity("furniture_templates")
export class FurnitureTemplate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "enum", enum: FurnitureType })
  type: FurnitureType;

  @Column()
  description: string;

  @Column({ type: "json" })
  specifications: {
    height: number; // cm
    width: number; // cm
    depth: number; // cm
    material: string;
    thickness: number; // mm
    color: string;
  };

  @Column({ type: "json", nullable: true })
  parts: Array<{
    name: string;
    width: number;
    height: number;
    depth: number;
    quantity: number;
  }>;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  materialCost: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  laborCost: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalPrice: number;

  @Column({ default: false })
  isTemplate: boolean;

  @Column({ default: false })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.templates, { eager: true })
  @JoinColumn()
  creator: User;

  @OneToMany(() => CuttingPlan, (plan) => plan.furniture)
  cuttingPlans: CuttingPlan[];
}
