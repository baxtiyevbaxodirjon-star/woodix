import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { FurnitureTemplate } from "../entities/FurnitureTemplate.js";
import { Material } from "../entities/Material.js";
import { CuttingPlan } from "../entities/CuttingPlan.js";
import { CuttingPart } from "../entities/CuttingPart.js";
import { Order } from "../entities/Order.js";
import { OrderItem } from "../entities/OrderItem.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "woodix_user",
  password: process.env.DB_PASSWORD || "secure_password",
  database: process.env.DB_NAME || "woodix_db",
  synchronize: process.env.NODE_ENV !== "production",
  logging: false,
  entities: [User, FurnitureTemplate, Material, CuttingPlan, CuttingPart, Order, OrderItem],
  subscribers: [],
  migrations: [],
});
