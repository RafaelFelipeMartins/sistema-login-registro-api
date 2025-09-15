import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import db from '../config/database'
import { User, CreateUserData, LoginData, UserResponse, AuthResponse } from '../models/User';

export class AuthService {
    /**
   * Registra um novo usuário no sistema
   * @param userData - Dados do usuário (name, email, password)
   * @returns Promise com os dados do usuário criado e token JWT
   */

    // async register(userData: CreateUserData): Promise<AuthResponse> {
    //     const { nome, email, senha_hash } = userData
    // }
}