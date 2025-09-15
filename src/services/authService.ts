import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken'
import db from '../config/database'
import { User, CreateUserData, LoginData, UserResponse, AuthResponse } from '../models/User';

export class AuthService {
    private generateToken(userId: string): string {
        const payload = {
            userId, 
            iat: Math.floor(Date.now() / 1000)// issued at (timestamp)
        };

        // Assinar o token com a chave secreta
        // Opções: algoritmo e tempo de expiração
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET não definido');
        } 

        const options: SignOptions = {
            algorithm: 'HS256',
            expiresIn: "7d"
        };

        return jwt.sign(payload, secret, options);
    }

      /**
   * Remove dados sensíveis do objeto User
   * @param user - Objeto User completo
   * @returns UserResponse sem campos sensíveis
   */
    private sanitizeUser(user: User): UserResponse {
        // Desestruturação para remover a senha do objeto retornado
        const { senha_hash, ...sanitizedUser } = user;
        return sanitizedUser;
    }


    /**
   * Registra um novo usuário no sistema
   * @param userData - Dados do usuário (name, email, password)
   * @returns Promise com os dados do usuário criado e token JWT
   */

    async register(userData: CreateUserData): Promise<AuthResponse> {
        const { nome, email, senha_hash } = userData

        // verificar se email já existe 
        const existingUser = await db('usuarios').where({ email }).first();
        if (existingUser) {
            throw new Error("Usuario já cadastrado")
        }

        // 2 criptografar a senha usando bcrypt
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
        const hasedPassword = await bcrypt.hash(senha_hash, saltRounds)

        //3 inserir o user no banco de dados 
        const [newUser] = await db('usuarios')
            .insert({
                nome,
                email,
                senha_hash: hasedPassword
            })
            .returning('*') as User[]

        //4 Gerar token JWT para o usuario

        if (!newUser) {
            throw new Error('Falha ao criar usuário');
        }

        const token = this.generateToken(newUser.id);

        //5 retornar dados sem a asnha 
        return {
            user: this.sanitizeUser(newUser),
            token,
            expires_in: process.env.JWT_EXPIRES_IN || '7d' 
        };
    };
}