import knex from 'knex';
import config from '../../knexfile';

const environment = process.env.NODE_ENV || 'development';

if (!config[environment]) {
  throw new Error(`Configuração para ambiente '${environment}' não encontrada`);
}

const db = knex(config[environment]);

export default db;

// Função para testar conexão
export const testConnection = async (): Promise<boolean> => {
  try {
    await db.raw('SELECT 1');
    console.log('✅ Conexão com banco de dados estabelecida');
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar com banco de dados:', error);
    return false;
  }
};

// Função para fechar conexão
export const closeConnection = async (): Promise<void> => {
  await db.destroy();
  console.log('🔌 Conexão com banco de dados fechada');
};