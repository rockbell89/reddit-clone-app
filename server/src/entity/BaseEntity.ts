import { instanceToPlain } from "class-transformer";
import {
  BaseEntity as Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export default abstract class BaseEntity extends Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
