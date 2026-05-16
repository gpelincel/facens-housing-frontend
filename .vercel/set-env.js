const fs = require('fs');
const path = require('path');

// process.cwd() garante que o arquivo seja criado na raiz real do projeto, fora da pasta .vercel
const dir = path.join(process.cwd(), 'src', 'environments');
const filePath = path.join(dir, 'environment.ts');

// Cria o diretório src/environments na raiz se não existir
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

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