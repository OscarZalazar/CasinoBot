import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../config/auth.js';

export class User {
  constructor({
    id = uuidv4(),
    email,
    password,
    role,
    name,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async create({ email, password, role, name }) {
    const hashedPassword = await hashPassword(password);
    return new User({
      email,
      password: hashedPassword,
      role,
      name
    });
  }

  toJSON() {
    const { password, ...user } = this;
    return user;
  }
}