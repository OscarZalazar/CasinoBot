import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../config/security.js';

export class Client {
  constructor({
    id = uuidv4(),
    name,
    email,
    password,
    whatsappNumber,
    settings = {
      amounts: [2000, 3000, 5000, 10000, 15000, 20000, 30000, 40000, 50000],
      messages: {
        welcome: '¡Hola! Bienvenido, ¿en qué te puedo servir?',
        withdrawal: 'Por favor indica el monto a retirar y tu CVU/Alias de Mercado Pago.'
      },
      casinos: []
    },
    active = true,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.whatsappNumber = whatsappNumber;
    this.settings = settings;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async create({ name, email, password, whatsappNumber }) {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(password, salt);
    
    return new Client({
      name,
      email,
      password: hashedPassword,
      whatsappNumber
    });
  }

  toJSON() {
    const { password, ...client } = this;
    return client;
  }
}