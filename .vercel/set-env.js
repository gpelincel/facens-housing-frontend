const fs = require('fs');
const path = require('path');

// Caminho onde o arquivo deve ser criado
const dir = path.join(__dirname, 'src', 'environments');
const filePath = path.join(dir, 'environment.ts');

// Cria o diretório se não existir
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Conteúdo do arquivo usando variáveis de ambiente do sistema
const content = `
export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL || ""}',
  supabaseUrl: '${process.env.SUPABASE_URL || ""}',
  supabaseKey: '${process.env.SUPABASE_KEY || ""}'
};
`;

fs.writeFileSync(filePath, content, { encoding: 'utf8' });
console.log(`✅ environment.ts gerado com sucesso em: ${filePath}`);