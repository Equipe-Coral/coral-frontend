### Página "Explorar Discussões" (Integração com Câmara)

A página `ExploreDiscussions` lista Projetos de Lei diretamente da API da Câmara.

- Endpoint: `GET https://dadosabertos.camara.leg.br/api/v2/proposicoes`
- Parâmetros utilizados:
  - `keywords`: termo digitado no campo de busca
  - `siglaTipo`: `PL`
  - `ordenarPor`: `id`
  - `ordem`: `DESC`
  - `itens`: tamanho da página (10/20/50)
  - `pagina`: número da página
- Paginação: controlada via `itens` e `pagina`. Navegação "Anterior/Próxima" e seletor de tamanho de página.
- Mapeamento dos dados para o card:
  - `id`: `p.id`
  - `title`: `${p.siglaTipo} ${p.numero}/${p.ano} - ${p.ementa}`
  - `description`: `p.ementaDetalhada || p.ementa`
  - `author`: primeiro autor (se disponível)
  - `organ`: `Câmara dos Deputados`
  - `status`: `p.statusProposicao?.sigla || 'Em tramitação'`
- Ação: ao clicar no card, navega para `/discussion/{id}`.

Observações:
- A API pode não retornar `X-Total-Count` via fetch padrão; neste caso, a paginação "Próxima" usa `items.length < pageSize` como critério.
- Filtros de **Categoria** são client-side e usam um conjunto de palavras-chave por tema (ex.: Segurança, Saúde, Educação, Transporte, Meio Ambiente, Economia, Direitos Humanos, Tecnologia). Um item entra na categoria se título/ementa conter qualquer uma das palavras configuradas.
- Filtros de **Status** são baseados em `statusProposicao.descricaoSituacao` (fallback para `sigla`) e aplicam correspondência por substring: "tramita" → Em tramitação, "aprov" → Aprovado.
- Por que poucos "Aprovado" aparecem? A maioria das proposições está em alguma fase de tramitação; "Aprovado" pode significar aprovação em etapa intermediária (ex.: comissão). Situações finais costumam ser descritas como "Transformado em Lei", "Encaminhado à sanção" ou similares. Para listar apenas leis aprovadas, considere filtrar por essas descrições ou usar endpoints complementares.
# Coral Frontend

Este é o repositório do frontend da plataforma **Coral**.

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias principais:

- **React** (Vite)
- **Styled Components** (Estilização)
- **React Router DOM** (Navegação)
- **React Leaflet** (Mapas)
- **React Icons** (Ícones)

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter o **Node.js** instalado em sua máquina.

## 🔧 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Equipe-Coral/coral-frontend.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd coral-frontend
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

## ▶️ Como Rodar

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

## 🛠️ Scripts Disponíveis

- `npm run dev`: Inicia o ambiente de desenvolvimento.
- `npm run build`: Gera a build de produção na pasta `dist`.
- `npm run preview`: Visualiza a build de produção localmente.
- `npm run lint`: Executa a verificação de código com ESLint.

## 🗺️ Funcionalidades Principais

- **Comunidade**: Visualização de demandas no mapa, estatísticas e tendências.
- **Demandas**: Listagem e detalhes de demandas da comunidade.
- **Discussões**: Acompanhamento de discussões públicas e PLs.
- **Perfil**: Painel do usuário com histórico de engajamento e impacto.

## 🔐 Sistema de Autenticação

O projeto implementa um sistema completo de autenticação que redireciona automaticamente usuários não autenticados para a página de login.

### ✨ Funcionalidades Implementadas

- ✅ Login com e-mail e senha
- ✅ Registro em 3 etapas (dados pessoais, CPF/senha, endereço)
- ✅ Verificação por código WhatsApp (6 dígitos)
- ✅ Validação de CPF
- ✅ Formatação automática de telefone e CPF
- ✅ Busca automática de cidades por UF (API IBGE)
- ✅ Proteção de rotas privadas
- ✅ Redirecionamento automático para login
- ✅ Gerenciamento de tokens JWT
- ✅ Feedback visual de erros e loading

### Rotas Públicas
- `/` - Página inicial
- `/login` - Login
- `/register` - Cadastro
- `/verify-code` - Verificação de código

### Rotas Protegidas (Requerem Autenticação)
- `/community` - Comunidade
- `/demands` - Explorar Demandas
- `/discussions` - Explorar Discussões
- `/demand/:id` - Detalhes de Demanda
- `/discussion/:id` - Detalhes de Discussão
- `/profile` - Perfil do Usuário

### Como Funciona

A autenticação é gerenciada através do `AuthContext` que:
- Verifica a presença de um token no `localStorage`
- Protege rotas usando o componente `ProtectedRoute`
- Redireciona automaticamente para `/login` quando o usuário tenta acessar rotas protegidas sem estar autenticado

Para fazer login programaticamente, use o hook `useAuth`:

```jsx
import { useAuth } from './contexts/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  
  const handleLogin = (token) => {
    login(token); // Salva o token e marca como autenticado
  };
}
```

Para fazer logout:

```jsx
const { logout } = useAuth();
logout(); // Remove o token e marca como não autenticado
```

## 🔌 Integração com Backend

O frontend está configurado para consumir a API REST do backend em `http://localhost:8000/api`.

### 📊 Estrutura do Sistema de Demandas

O sistema de demandas é composto por 5 tabelas principais:

1. **demands** - Informações básicas da demanda (título, descrição, localização, apoios)
2. **demand_timeline** - Linha do tempo de eventos da demanda (status, datas, descrições)
3. **demand_reports** - Relatórios comunitários gerados (resumo, impacto, órgãos contatados)
4. **demand_supports** - Registro de apoios dos usuários às demandas
5. **bills** - Projetos de lei relacionados às demandas
6. **demand_bill_relations** - Relacionamento entre demandas e projetos de lei

### 🔄 Fluxo de Dados

```
Frontend (React) → API REST → PostgreSQL
                     ↓
              Validações JWT
              Consultas SQL
              Retorno JSON
```

### Endpoints Esperados no Backend

#### Autenticação

**1. Login**
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "usuario@example.com",
  "password": "senha123"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@example.com"
  }
}

Response (401 Unauthorized):
{
  "message": "Credenciais inválidas"
}
```

**2. Registro**
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "name": "Nome Completo",
  "email": "usuario@example.com",
  "phone": "11999999999",
  "cpf": "12345678900",
  "password": "senha123",
  "uf": "SP",
  "city": "São Paulo",
  "address": "Rua Example, 123",
  "number": "123"
}

Response (201 Created):
{
  "message": "Código de verificação enviado para o WhatsApp",
  "email": "usuario@example.com"
}

Response (400 Bad Request):
{
  "message": "E-mail já cadastrado" // ou outro erro de validação
}
```

**3. Verificar Código**
```
POST /api/auth/verify
Content-Type: application/json

Body:
{
  "email": "usuario@example.com",
  "code": "123456"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@example.com"
  }
}

Response (400 Bad Request):
{
  "message": "Código inválido ou expirado"
}
```

**4. Reenviar Código**
```
POST /api/auth/resend-code
Content-Type: application/json

Body:
{
  "email": "usuario@example.com"
}

Response (200 OK):
{
  "message": "Código reenviado com sucesso"
}
```

#### Usuário (Rotas Autenticadas)

**5. Obter Perfil**
```
GET /api/user/profile
Authorization: Bearer {token}

Response (200 OK):
{
  "id": 1,
  "name": "Nome do Usuário",
  "email": "usuario@example.com",
  "phone": "11999999999",
  "cpf": "12345678900",
  "uf": "SP",
  "city": "São Paulo",
  "address": "Rua Example, 123",
  "number": "123",
  "bio": "Texto de biografia do usuário (opcional, max 300 caracteres)",
  "avatar_url": "https://example.com/avatar.jpg",
  "interests": ["Educação", "Meio Ambiente", "Mobilidade"],
  "stats": {
    "created": 5,
    "supported": 12,
    "active": 3,
    "completed": 2
  },
  "activities": [
    {
      "id": 1,
      "type": "created",
      "text": "Você criou a demanda \"Título da Demanda\"",
      "time": "há 2 dias"
    }
  ],
  "demandsStatus": {
    "analysis": { "current": 2, "total": 5 },
    "waiting": { "current": 1, "total": 3 },
    "completed": { "current": 2, "total": 2 }
  }
}

Response (401 Unauthorized):
{
  "message": "Token inválido ou expirado"
}
```

**6. Atualizar Perfil**
```
PUT /api/user/profile
Authorization: Bearer {token}
Content-Type: application/json

Body (todos os campos são opcionais):
{
  "name": "Novo Nome",
  "phone": "11988888888",
  "address": "Nova Rua, 456",
  "number": "456",
  "bio": "Nova biografia",
  "avatar_url": "https://example.com/novo-avatar.jpg",
  "interests": ["Educação", "Saúde"],
  "uf": "RJ",
  "city": "Rio de Janeiro"
}

Response (200 OK):
{
  "message": "Perfil atualizado com sucesso",
  "user": {
    "id": 1,
    "name": "Novo Nome",
    "email": "usuario@example.com",
    "phone": "11988888888",
    "bio": "Nova biografia",
    "avatar_url": "https://example.com/novo-avatar.jpg",
    "interests": ["Educação", "Saúde"],
    ...
  }
}
```

#### Demandas (Listagem, Detalhe e Apoio)

**7. Listar Demandas**
```
GET /api/demands
Query Params (opcional):
- q: termo de busca (string)
- city: nome da cidade (string)
- category: categoria (string)
- status: status (string)
- page: número da página (int)
- pageSize: itens por página (int)

Response (200 OK):
{
  "items": [
    {
      "id": 123,
      "title": "Pavimentação da Rua X",
      "description": "Melhoria da infraestrutura viária...",
      "location": "Rua X, Bairro, Cidade - UF",
      "supports": 89,
      "status": "Em Análise",
      "category": "Infraestrutura"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "total": 200
}
```

**8. Detalhe da Demanda**
```
GET /api/demands/{id}
Authorization: Bearer {token} (opcional, para verificar supportedByUser)

Response (200 OK):
{
  "id": 123,
  "hash": "0x27a32e.23x9f82x00",
  "title": "Programa Municipal de Iluminação Segura",
  "description": "Descrição completa da demanda...",
  "location": "Rua Fictícia, 123 - Pinheiros, São Paulo - SP",
  "status": "Segurança",
  "category": "Infraestrutura",
  "supports": 125,
  "summary": "Resumo gerado por IA sobre a demanda, destacando os principais pontos e necessidades da comunidade.",
  "createdAt": "2025-07-15T10:30:00Z",
  "timeline": [
    { 
      "id": 1,
      "status": "Relato criado", 
      "date": "2025-07-15", 
      "description": null,
      "active": true,
      "current": false
    },
    { 
      "id": 2,
      "status": "Publicado como demanda comunitária", 
      "date": "2025-07-15", 
      "description": null,
      "active": true,
      "current": false
    },
    { 
      "id": 3,
      "status": "Relatório criado", 
      "date": "2025-08-01",
      "description": "Atingiu limiar de 100 apoios", 
      "active": true, 
      "current": true
    },
    { 
      "id": 4,
      "status": "Enviado aos órgãos competentes", 
      "date": null,
      "description": null,
      "active": false,
      "current": false
    },
    { 
      "id": 5,
      "status": "Resposta recebida", 
      "date": null,
      "description": null,
      "active": false,
      "current": false
    }
  ],
  "communityReport": {
    "summary": "A comunidade relata falta de iluminação pública em diversas ruas do bairro, causando insegurança e dificuldade de locomoção no período noturno. Foram registrados 125 apoios de moradores da região.",
    "impact": "Melhoria na segurança pública, redução de criminalidade, maior mobilidade noturna para aproximadamente 5.000 moradores do bairro.",
    "organs": "Secretaria Municipal de Infraestrutura Urbana, Subprefeitura de Pinheiros",
    "protocol": "PROTO-2025-00123",
    "responseStatus": "Aguardando resposta",
    "pdfUrl": "https://example.com/reports/demanda-123.pdf"
  },
  "relatedBills": [
    { 
      "id": "PL 00/0000", 
      "billCode": "PL 123/2025",
      "title": "Ilumina Sampa", 
      "summary": "Projeto de lei que prevê a ampliação da iluminação pública em áreas periféricas da cidade de São Paulo.", 
      "relation": "Este projeto pode beneficiar diretamente a região mencionada na demanda, incluindo recursos para instalação de novos postes de iluminação.", 
      "status": "Em tramitação" 
    }
  ],
  "supportedByUser": false
}

Response (404 Not Found):
{
  "message": "Demanda não encontrada"
}
```

**Query SQL sugerida para o endpoint 8:**
```sql
SELECT 
  d.id,
  d.hash,
  d.title,
  d.description,
  d.location,
  d.status,
  d.category,
  d.supports,
  d.summary,
  d.created_at as "createdAt",
  -- Timeline
  COALESCE(
    json_agg(
      json_build_object(
        'id', dt.id,
        'status', dt.status,
        'date', dt.date,
        'description', dt.description,
        'active', dt.active,
        'current', dt.current
      ) ORDER BY dt.order_position
    ) FILTER (WHERE dt.id IS NOT NULL),
    '[]'
  ) as timeline,
  -- Community Report
  json_build_object(
    'summary', dr.summary,
    'impact', dr.impact,
    'organs', dr.organs,
    'protocol', dr.protocol,
    'responseStatus', dr.response_status,
    'pdfUrl', dr.pdf_url
  ) as "communityReport",
  -- Verificar se o usuário atual apoia a demanda
  CASE 
    WHEN ds.user_id IS NOT NULL THEN true 
    ELSE false 
  END as "supportedByUser"
FROM demands d
LEFT JOIN demand_timeline dt ON d.id = dt.demand_id
LEFT JOIN demand_reports dr ON d.id = dr.demand_id
LEFT JOIN demand_supports ds ON d.id = ds.demand_id AND ds.user_id = $userId
WHERE d.id = $demandId
GROUP BY d.id, dr.summary, dr.impact, dr.organs, dr.protocol, dr.response_status, dr.pdf_url, ds.user_id;

-- Buscar projetos de lei relacionados separadamente
SELECT 
  b.bill_code as "billCode",
  b.id,
  b.title,
  b.summary,
  b.status,
  dbr.relation
FROM demand_bill_relations dbr
INNER JOIN bills b ON dbr.bill_id = b.id
WHERE dbr.demand_id = $demandId;
```

**9. Apoiar Demanda**
```
POST /api/demands/{id}/support
Authorization: Bearer {token}

Response (200 OK):
{
  "message": "Apoio registrado",
  "supports": 126,
  "supportedByUser": true
}

Response (400 Bad Request):
{
  "message": "Você já apoia esta demanda"
}

Response (404 Not Found):
{
  "message": "Demanda não encontrada"
}
```

**Query SQL sugerida para o endpoint 9:**
```sql
-- Verificar se o usuário já apoia a demanda
SELECT COUNT(*) as count 
FROM demand_supports 
WHERE demand_id = $demandId AND user_id = $userId;

-- Se count = 0, inserir novo apoio
INSERT INTO demand_supports (demand_id, user_id) 
VALUES ($demandId, $userId);

-- Atualizar contador de apoios na tabela demands
UPDATE demands 
SET supports = supports + 1, updated_at = CURRENT_TIMESTAMP
WHERE id = $demandId
RETURNING supports;

-- Retornar o total de apoios atualizado
SELECT supports FROM demands WHERE id = $demandId;
```

**10. Remover Apoio da Demanda (opcional)**
```
DELETE /api/demands/{id}/support
Authorization: Bearer {token}

Response (200 OK):
{
  "message": "Apoio removido",
  "supports": 124,
  "supportedByUser": false
}
```

**Query SQL sugerida para o endpoint 10:**
```sql
-- Remover apoio
DELETE FROM demand_supports 
WHERE demand_id = $demandId AND user_id = $userId
RETURNING id;

-- Se afetou alguma linha, atualizar contador
UPDATE demands 
SET supports = supports - 1, updated_at = CURRENT_TIMESTAMP
WHERE id = $demandId AND supports > 0
RETURNING supports;
```

### Observações

- Filtros de listagem aceitam `q` (busca por `title`/`description`), `city`, `category`, `status`.
- `supportedByUser` deve ser calculado no detalhe com base em `demand_supports`.
- Considere paginação (`page`, `pageSize`) para a listagem.
- O frontend exibe controles de paginação (Anterior/Próxima) e seletor de `pageSize` (10/20/50). Para melhor UX, retorne também `total`, `page` e `pageSize` no payload.
- **Timeline**: Ordenar por `order_position` para manter a sequência correta
- **Hash**: Pode ser gerado automaticamente (ex: hash do ID + timestamp) ou manualmente
- **Apoios**: O contador `supports` na tabela `demands` deve ser sincronizado com a contagem real em `demand_supports`
- **Relatórios**: Um relatório é criado automaticamente quando a demanda atinge um limiar de apoios (ex: 100)
- **Bills relacionados**: Use a tabela `demand_bill_relations` para criar conexões entre demandas e projetos de lei

### Implementação de Exemplo (Backend - Node.js/Express)

```javascript
// routes/demands.js
const express = require('express');
const router = express.Router();
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const db = require('../config/database');

// GET /api/demands/:id - Obter detalhes de uma demanda
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id; // Usuário pode estar autenticado ou não

    // Buscar demanda com timeline e relatório
    const demandQuery = `
      SELECT 
        d.id,
        d.hash,
        d.title,
        d.description,
        d.location,
        d.status,
        d.category,
        d.supports,
        d.summary,
        d.created_at as "createdAt",
        COALESCE(
          json_agg(
            json_build_object(
              'id', dt.id,
              'status', dt.status,
              'date', dt.date,
              'description', dt.description,
              'active', dt.active,
              'current', dt.current
            ) ORDER BY dt.order_position
          ) FILTER (WHERE dt.id IS NOT NULL),
          '[]'
        ) as timeline,
        json_build_object(
          'summary', dr.summary,
          'impact', dr.impact,
          'organs', dr.organs,
          'protocol', dr.protocol,
          'responseStatus', dr.response_status,
          'pdfUrl', dr.pdf_url
        ) as "communityReport",
        CASE 
          WHEN ds.user_id IS NOT NULL THEN true 
          ELSE false 
        END as "supportedByUser"
      FROM demands d
      LEFT JOIN demand_timeline dt ON d.id = dt.demand_id
      LEFT JOIN demand_reports dr ON d.id = dr.demand_id
      LEFT JOIN demand_supports ds ON d.id = ds.demand_id AND ds.user_id = $2
      WHERE d.id = $1
      GROUP BY d.id, dr.summary, dr.impact, dr.organs, dr.protocol, 
               dr.response_status, dr.pdf_url, ds.user_id
    `;

    const demandResult = await db.query(demandQuery, [id, userId]);

    if (demandResult.rows.length === 0) {
      return res.status(404).json({ message: 'Demanda não encontrada' });
    }

    const demand = demandResult.rows[0];

    // Buscar projetos de lei relacionados
    const billsQuery = `
      SELECT 
        b.bill_code as "billCode",
        b.bill_code as id,
        b.title,
        b.summary,
        b.status,
        dbr.relation
      FROM demand_bill_relations dbr
      INNER JOIN bills b ON dbr.bill_id = b.id
      WHERE dbr.demand_id = $1
    `;

    const billsResult = await db.query(billsQuery, [id]);
    demand.relatedBills = billsResult.rows;

    res.json(demand);
  } catch (error) {
    console.error('Erro ao buscar demanda:', error);
    res.status(500).json({ message: 'Erro ao buscar demanda' });
  }
});

// POST /api/demands/:id/support - Apoiar demanda
router.post('/:id/support', authenticateToken, async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await client.query('BEGIN');

    // Verificar se já apoia
    const checkQuery = 'SELECT COUNT(*) as count FROM demand_supports WHERE demand_id = $1 AND user_id = $2';
    const checkResult = await client.query(checkQuery, [id, userId]);

    if (parseInt(checkResult.rows[0].count) > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'Você já apoia esta demanda' });
    }

    // Inserir apoio
    await client.query(
      'INSERT INTO demand_supports (demand_id, user_id) VALUES ($1, $2)',
      [id, userId]
    );

    // Atualizar contador
    const updateResult = await client.query(
      'UPDATE demands SET supports = supports + 1, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING supports',
      [id]
    );

    await client.query('COMMIT');

    res.json({
      message: 'Apoio registrado',
      supports: updateResult.rows[0].supports,
      supportedByUser: true
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro ao apoiar demanda:', error);
    res.status(500).json({ message: 'Erro ao apoiar demanda' });
  } finally {
    client.release();
  }
});

module.exports = router;
```

### Comportamento do Frontend (Demandas)

- A tela `Explorar Demandas` consome `GET /api/demands` aplicando filtros e paginação.
- O botão "Buscar" envia os filtros atuais: `q`, `city`, `category`, `status`, além de `page` e `pageSize`.
- Os controles "Anterior" e "Próxima" atualizam `page` e refazem a consulta.
- O seletor de itens por página (10/20/50) atualiza `pageSize` e reinicia em `page=1`.
- Quando o backend retornar `items`, `total`, `page`, `pageSize`, o frontend usa esses valores para exibir o estado exato da paginação.
- Caso o backend não retorne paginação, o frontend funciona em modo simplificado usando apenas a lista (`items`).
- A tela `Detalhes da Demanda` consome `GET /api/demands/{id}` para exibir todas as informações, incluindo timeline, relatório e bills relacionados.
- O botão "Apoiar demanda" chama `POST /api/demands/{id}/support` (requer autenticação).
- Se o usuário não estiver autenticado, o campo `supportedByUser` será `false` e o botão permanecerá habilitado.

### Integração com Câmara dos Deputados (Proposições e PLs Semelhantes)

A tela de detalhe da demanda (`DemandDetail`) enriquece as informações exibindo **Projetos de Lei semelhantes** ao tema da demanda, além dos projetos relacionados vindos do backend.

#### Fonte dos Dados
- Integração direta com a **API oficial**: `https://dadosabertos.camara.leg.br/api/v2`
- Endpoint utilizado para busca: `GET /proposicoes`
- Parâmetros mapeados:
  - `keywords`: termos de busca derivados do título da demanda
  - `siglaTipo`: fixo em `PL` (pode ser expandido futuramente)
  - `ordenarPor`: `id` (IDs maiores tendem a ser proposições mais recentes)
  - `ordem`: `DESC`
  - `itens` e `pagina`: paginação dos resultados
- Não enviamos intervalo de datas porque a API limita a diferença a 3 meses; optamos por buscar em todo o histórico para maximizar resultados.

#### Estratégia de Busca (Heurística de Palavras-Chave)
1. Usa o **título** da demanda como base (se ausente, cai para `summary`).
2. Remove stopwords e palavras curtas (< 4 caracteres). Stopwords usadas:
```
['de','a','o','as','os','e','para','com','em','do','da','dos','das','um','uma','uns','umas','que','é','foi','por','na','no','nas','nos','se','ao','aos','pelo','pela','esta','este','isso','aquilo','demandamos','solicitamos','queremos','sobre','como']
```
3. Normaliza palavras removendo acentos (ex.: "animais estimação" → "animais estimacao").
4. Fluxo de tentativa:
   - Busca combinada com as **duas primeiras palavras significativas**.
   - Se vazio, tenta cada uma das três primeiras palavras individualmente até encontrar resultados.
5. Limita a 3 resultados (`slice(0,3)`).

#### Exemplo Simplificado da Lógica
```javascript
const words = extractMeaningfulWords(title);
let items = [];
if (words.length >= 2) {
  items = await search(words.slice(0,2).join(' '));
}
if (!items.length) {
  for (const w of words.slice(0,3)) {
    const resp = await search(w);
    if (resp.length) { items = resp; break; }
  }
}
const top3 = items.slice(0,3).map(p => ({
  id: p.id,
  billCode: `${p.siglaTipo} ${p.numero}/${p.ano}`,
  title: p.ementa,
  summary: p.ementaDetalhada || p.ementa,
  status: p.statusProposicao?.sigla || 'Em tramitação',
  relation: 'Assunto semelhante ao tema da demanda'
}));
```

#### Renderização no Frontend
- Há **um único título** de seção: `Projetos de Leis Relacionados`.
- Primeiro são exibidos os projetos relacionados vindos do backend (`relatedBills`).
- Em seguida, se existirem, os **PLs semelhantes** (resultado da busca na API oficial).
- Cada card:
  - Título clampado em 1 linha.
  - Resumo e relação clampados em até 4 linhas.
  - Clique navega para `/discussion/{id}`.
- Cards compactados (padding reduzido e menor margem vertical) para melhor densidade.

#### Limitações Atuais
- Busca restrita a `siglaTipo=PL` (não inclui PEC, PDL, etc.).
- Resultados podem ser vazios para temas muito específicos ou sem proposições recentes.
- Não há cache; múltiplos acessos repetem a busca.
- Sem indicador de carregamento específico para a seção de PLs semelhantes.
- A API não fornece campo oficial de "categoria" temática; o agrupamento por tema é heurístico usando palavras-chave.

#### Possíveis Melhorias Futuras
- Expandir tipos (`siglaTipo`) e permitir múltiplos (ex.: PL, PDL, PEC).
- Adicionar link externo para a página oficial da proposição.
- Exibir estado quando não encontrar nenhum PL (ex.: "Nenhum projeto semelhante encontrado").
- Implementar cache temporário (ex.: `sessionStorage`) para evitar requisições repetidas.
- Filtro opcional por período recente caso a lista cresça demais.
- Status avançados: adicionar opções como "Aprovado em comissão", "Transformado em Lei" com regras de correspondência específicas.

#### Decisões de Design
- Remoção da segunda heading para evitar redundância visual.
- Clamp de texto para prevenir overflow e cards excessivamente altos.
- Fallback inteligente garante maior taxa de sucesso sem sobrecarregar a API.

> Esta integração substitui a abordagem antiga via `camara-proxy` e utiliza diretamente a API pública oficial.

### Adicionar Demanda pelo Frontend

Na tela `Explorar Demandas` e na **Página Inicial (Hero)**, foi adicionado um botão que abre um modal com um formulário simples para criar demandas. O fluxo é:

#### Página Inicial (/)
- Botão `Relatar demanda` no Hero da landing page
- Se o usuário **não estiver autenticado**, redireciona para `/login`
- Se o usuário **estiver autenticado**, abre o modal de criação
- Após criar a demanda com sucesso, redireciona para `/demands`

#### Página Explorar Demandas (/demands)
- Botão `+ Adicionar Demanda` no topo da página
- Abre o mesmo modal de criação
- Após criar, atualiza a listagem automaticamente

#### Fluxo do Modal
1. Usuário preenche `título`, `descrição`, `localização` e `categoria`
2. (Opcional) Clica em `Formalizar com IA`: chama `POST /api/demands/formalize-ai` e atualiza os campos automaticamente
3. Clica em `Criar demanda`: chama `POST /api/demands` e salva no banco
4. Modal fecha e lista é atualizada

Campos do modal:
- `title` (string, obrigatório)
- `description` (string, obrigatório)
- `location` (string, opcional)
- `category` (string, opcional: Segurança, Infraestrutura, Meio Ambiente, Saúde, Economia)
- `status` (string, default `Em Análise` — pode ser ajustado na formalização)

#### Endpoints Necessários no Backend

1. Criar demanda
```
POST /api/demands
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "title": "Programa Municipal de Iluminação Segura",
  "description": "Descrição completa...",
  "location": "Rua Fictícia, 123 - Pinheiros, São Paulo - SP",
  "category": "Infraestrutura",
  "status": "Em Análise" // opcional; backend pode definir default
}

Response (201 Created):
{
  "id": 123,
  "title": "Programa Municipal de Iluminação Segura",
  "description": "Descrição completa...",
  "location": "Rua Fictícia, 123 - Pinheiros, São Paulo - SP",
  "category": "Infraestrutura",
  "status": "Em Análise",
  "supports": 0
}
```

2. Formalizar demanda
```
POST /api/demands/{id}/formalize
Authorization: Bearer {token}
Content-Type: application/json

Body (opcional):
{
  // Campos que o backend pode usar para enriquecer/validar
}

Response (200 OK):
{
  "id": 123,
  "hash": "0x27a32e...",
  "title": "Programa Municipal de Iluminação Segura",
  "description": "Descrição ajustada/validada...",
  "location": "Rua Fictícia, 123 - Pinheiros, São Paulo - SP",
  "status": "Publicado como demanda comunitária",
  "category": "Infraestrutura",
  "summary": "Resumo gerado",
  "supports": 0,
  "createdAt": "2025-07-15T10:30:00Z",
  "timeline": [
    {"id": 1, "status": "Relato criado", "date": "2025-07-15", "active": true, "current": false},
    {"id": 2, "status": "Publicado como demanda comunitária", "date": "2025-07-15", "active": true, "current": true}
  ]
}
```

3. Formalizar com IA (antes de criar)
```
POST /api/demands/formalize-ai
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "title": "iluminação no bairro ta ruim",
  "description": "a rua fica escura de noite e é perigoso, precisa de mais postes",
  "location": "Rua X, Bairro Y",
  "category": "Segurança"
}

Response (200 OK):
{
  "title": "Solicitação de Melhoria na Iluminação Pública",
  "description": "Solicitamos a instalação de novos postes de iluminação pública na Rua X, Bairro Y. A falta de iluminação adequada compromete a segurança dos moradores durante o período noturno, aumentando o risco de acidentes e criminalidade na região.",
  "location": "Rua X, Bairro Y",
  "category": "Segurança"
}
```

**Comportamento esperado:**
- Recebe o rascunho da demanda (título, descrição, localização, categoria)
- Usa um modelo de IA (GPT, Claude, Gemini, etc.) para reescrever de forma formal e clara
- Retorna os campos melhorados **sem criar a demanda no banco**
- Mantém o significado original, apenas melhorando a redação
- Pode sugerir categoria se não informada

**Implementação sugerida (Node.js/Express com OpenAI):**

```javascript
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/demands/formalize-ai
router.post('/formalize-ai', authenticateToken, async (req, res) => {
  const { title, description, location, category } = req.body;

  if (!title && !description) {
    return res.status(422).json({ message: 'Título ou descrição são obrigatórios' });
  }

  try {
    const prompt = `Você é um assistente que ajuda cidadãos a formalizar demandas comunitárias para órgãos públicos.

Reescreva a seguinte demanda de forma clara, formal e objetiva, mantendo o significado original:

Título: ${title || '(não informado)'}
Descrição: ${description || '(não informada)'}
Localização: ${location || '(não informada)'}
Categoria: ${category || '(não informada)'}

Retorne APENAS um JSON válido no formato:
{
  "title": "título formalizado",
  "description": "descrição formalizada em linguagem formal e clara, com detalhes relevantes",
  "location": "localização formatada",
  "category": "categoria sugerida (Segurança, Infraestrutura, Meio Ambiente, Saúde ou Economia)"
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseText = completion.choices[0].message.content.trim();
    
    // Extrair JSON da resposta
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Resposta inválida da IA');
    }

    const formalized = JSON.parse(jsonMatch[0]);

    res.json({
      title: formalized.title || title,
      description: formalized.description || description,
      location: formalized.location || location,
      category: formalized.category || category,
    });
  } catch (error) {
    console.error('Erro ao formalizar com IA:', error);
    res.status(500).json({ message: 'Erro ao processar com IA. Tente novamente.' });
  }
});
```

**Variáveis de ambiente adicionais:**
```env
OPENAI_API_KEY=sk-...
```

**Alternativa com Anthropic Claude:**
```javascript
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Substituir a chamada OpenAI por:
const message = await anthropic.messages.create({
  model: 'claude-3-haiku-20240307',
  max_tokens: 500,
  messages: [{ role: 'user', content: prompt }],
});

const responseText = message.content[0].text;
```

4. Listar demandas (já existente)
```
GET /api/demands?q=&city=&category=&status=&page=&pageSize=
```

#### Regras e Implementação Sugeridas (Backend)

- `POST /api/demands` deve validar campos obrigatórios (`title`, `description`) e salvar com `supports=0`, `status='Em Análise'` padrão.
- `POST /api/demands/{id}/formalize` deve:
  - Gerar `hash` (ver seção "Geração Automática de Hash").
  - Criar ao menos dois itens na `demand_timeline` ("Relato criado" e "Publicado como demanda comunitária").
  - Opcional: gerar `summary` (IA) e normalizar `status`.
  - Retornar o objeto completo da demanda, incluindo `timeline` agregada.
- Autenticação obrigatória em ambos endpoints (usuário precisa estar logado).
- Retornar erros claros (422 para validação, 404 se `id` inexistente, 401 se token inválido).

#### Alterações no Frontend

- Arquivo `src/components/Hero.jsx`:
  - Botão `Relatar demanda` verifica autenticação antes de abrir modal
  - Modal completo com formulário e botão de IA integrado
  - Após criar, redireciona para `/demands`

- Arquivo `src/pages/ExploreDemands.jsx`:
  - Botão `+ Adicionar Demanda` no cabeçalho da página
  - Modal com formulário e botões `Formalizar com IA` e `Criar`
  - Atualiza listagem automaticamente após criação

- Arquivo `src/services/api.js`:
  - Adicionado `createDemand(payload)` → `POST /api/demands`.
  - Adicionado `formalizeDemand(id, payload)` → `POST /api/demands/{id}/formalize`.
  - Adicionado `formalizeWithAI(payload)` → `POST /api/demands/formalize-ai`.

#### Observações

- **Autenticação**: Usuários não autenticados são redirecionados para `/login` ao tentar criar demanda
- Caso o backend não retorne paginação, a listagem continua funcional com os itens
- Erros de autenticação (`401`) redirecionam para `/login` automaticamente
- O botão `Formalizar com IA` aparece no formulário de criação e atualiza os campos automaticamente com a versão melhorada
- O usuário pode revisar e editar o texto formalizado antes de criar a demanda
- Modal é compartilhado entre página inicial e página de demandas, garantindo consistência de UX

#### Exemplo (Node.js/Express) dos novos endpoints

```javascript
// POST /api/demands
router.post('/', authenticateToken, async (req, res) => {
  const { title, description, location, category, status } = req.body;
  if (!title || !description) return res.status(422).json({ message: 'Título e descrição são obrigatórios' });
  const insert = await db.query(
    'INSERT INTO demands (title, description, location, category, status, user_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [title, description, location || null, category || null, status || 'Em Análise', req.user.id]
  );
  res.status(201).json(insert.rows[0]);
});

// POST /api/demands/:id/formalize
router.post('/:id/formalize', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const demandRes = await db.query('SELECT * FROM demands WHERE id = $1', [id]);
  if (demandRes.rowCount === 0) return res.status(404).json({ message: 'Demanda não encontrada' });
  const demand = demandRes.rows[0];
  const hash = generateDemandHash(demand.id, demand.created_at);
  await db.query('UPDATE demands SET hash = $1, status = $2 WHERE id = $3', [hash, 'Publicado como demanda comunitária', id]);
  await db.query('INSERT INTO demand_timeline (demand_id, status, date, active, current, order_position) VALUES ($1,$2, CURRENT_DATE, true, false, 1)', [id, 'Relato criado']);
  await db.query('INSERT INTO demand_timeline (demand_id, status, date, active, current, order_position) VALUES ($1,$2, CURRENT_DATE, true, true, 2)', [id, 'Publicado como demanda comunitária']);
  const detail = await db.query(/* query agregada do endpoint 8 */);
  res.json(detail.rows[0]);
});
```

### Requisitos do Backend

1. **CORS**: O backend deve permitir requisições do frontend (`http://localhost:5173`)
2. **JWT**: Usar tokens JWT para autenticação com expiração de 7 dias
3. **Validações**:
   - E-mail único no sistema
   - CPF válido e único
   - Senha com no mínimo 6 caracteres
   - Telefone com formato brasileiro (11 dígitos)
4. **WhatsApp**: Integração com `whatsapp-web.js` para envio de código de verificação (6 dígitos)
5. **Código de Verificação**:
   - Código numérico de 6 dígitos
   - Validade de 10 minutos
   - Armazenar temporariamente até a verificação

### Estrutura de Dados Sugerida

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(11) NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  uf VARCHAR(2) NOT NULL,
  city VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  number VARCHAR(20) NOT NULL,
  bio TEXT,
  avatar_url VARCHAR(512),
  interests TEXT[], -- Array de strings
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE verification_codes (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  code VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Demandas
CREATE TABLE demands (
  id SERIAL PRIMARY KEY,
  hash VARCHAR(32) UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  summary TEXT, -- Resumo gerado por IA
  location VARCHAR(255),
  status VARCHAR(64), -- Ex: "Segurança", "Infraestrutura", etc.
  category VARCHAR(64), -- Categoria da demanda
  supports INT DEFAULT 0,
  user_id INT REFERENCES users(id) ON DELETE SET NULL, -- Criador da demanda
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Timeline da Demanda
CREATE TABLE demand_timeline (
  id SERIAL PRIMARY KEY,
  demand_id INT REFERENCES demands(id) ON DELETE CASCADE,
  status VARCHAR(128) NOT NULL, -- Ex: "Relato criado", "Publicado como demanda", etc.
  description TEXT,
  date DATE,
  active BOOLEAN DEFAULT FALSE, -- Se o status já foi atingido
  current BOOLEAN DEFAULT FALSE, -- Se é o status atual
  order_position INT DEFAULT 0, -- Ordem de exibição
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_demand_timeline_demand ON demand_timeline(demand_id);

-- Tabela de Relatórios Comunitários
CREATE TABLE demand_reports (
  id SERIAL PRIMARY KEY,
  demand_id INT UNIQUE REFERENCES demands(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  impact TEXT,
  organs VARCHAR(255), -- Órgãos contatados
  protocol VARCHAR(64), -- Protocolo de envio
  response_status VARCHAR(64), -- Status da resposta
  pdf_url VARCHAR(512), -- URL do PDF do relatório
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_demand_reports_demand ON demand_reports(demand_id);

-- Tabela de Apoios às Demandas
CREATE TABLE demand_supports (
  id SERIAL PRIMARY KEY,
  demand_id INT REFERENCES demands(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(demand_id, user_id)
);

CREATE INDEX idx_demand_supports_demand ON demand_supports(demand_id);
CREATE INDEX idx_demand_supports_user ON demand_supports(user_id);

-- Tabela de Projetos de Lei
CREATE TABLE bills (
  id SERIAL PRIMARY KEY,
  bill_code VARCHAR(64) UNIQUE NOT NULL, -- Ex: "PL 00/0000"
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  status VARCHAR(64), -- Ex: "Em tramitação", "Aprovado", etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Relacionamento entre Demandas e Projetos de Lei
CREATE TABLE demand_bill_relations (
  id SERIAL PRIMARY KEY,
  demand_id INT REFERENCES demands(id) ON DELETE CASCADE,
  bill_id INT REFERENCES bills(id) ON DELETE CASCADE,
  relation TEXT, -- Descrição da relação entre a demanda e o PL
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(demand_id, bill_id)
);

CREATE INDEX idx_demand_bill_relations_demand ON demand_bill_relations(demand_id);
CREATE INDEX idx_demand_bill_relations_bill ON demand_bill_relations(bill_id);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_demands_updated_at BEFORE UPDATE ON demands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_demand_reports_updated_at BEFORE UPDATE ON demand_reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bills_updated_at BEFORE UPDATE ON bills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Dados de Exemplo (Seed)

Para facilitar o desenvolvimento e testes, aqui estão alguns dados de exemplo:

```sql
-- Inserir demanda de exemplo
INSERT INTO demands (hash, title, description, summary, location, status, category, supports, user_id) VALUES
('0x27a32e23x9f82x00', 
 'Programa Municipal de Iluminação Segura', 
 'Solicitação de instalação de postes de iluminação pública nas ruas do bairro Pinheiros, principalmente na Rua Fictícia e adjacências. Moradores relatam insegurança e dificuldade de locomoção no período noturno.',
 'A comunidade solicita melhorias na iluminação pública para aumentar a segurança e mobilidade noturna no bairro. Foram identificadas 15 ruas com iluminação deficiente, afetando aproximadamente 5.000 moradores.',
 'Rua Fictícia, 123 - Pinheiros, São Paulo - SP',
 'Segurança',
 'Infraestrutura',
 125,
 1
);

-- Inserir timeline da demanda
INSERT INTO demand_timeline (demand_id, status, date, description, active, current, order_position) VALUES
(1, 'Relato criado', '2025-07-15', NULL, true, false, 1),
(1, 'Publicado como demanda comunitária', '2025-07-15', NULL, true, false, 2),
(1, 'Relatório criado', '2025-08-01', 'Atingiu limiar de 100 apoios', true, true, 3),
(1, 'Enviado aos órgãos competentes', NULL, NULL, false, false, 4),
(1, 'Resposta recebida', NULL, NULL, false, false, 5);

-- Inserir relatório comunitário
INSERT INTO demand_reports (demand_id, summary, impact, organs, protocol, response_status, pdf_url) VALUES
(1,
 'A comunidade relata falta de iluminação pública em diversas ruas do bairro, causando insegurança e dificuldade de locomoção no período noturno. Foram registrados 125 apoios de moradores da região.',
 'Melhoria na segurança pública, redução de criminalidade, maior mobilidade noturna para aproximadamente 5.000 moradores do bairro.',
 'Secretaria Municipal de Infraestrutura Urbana, Subprefeitura de Pinheiros',
 'PROTO-2025-00123',
 'Aguardando resposta',
 'https://example.com/reports/demanda-123.pdf'
);

-- Inserir projeto de lei
INSERT INTO bills (bill_code, title, summary, status) VALUES
('PL 123/2025',
 'Ilumina Sampa',
 'Projeto de lei que prevê a ampliação da iluminação pública em áreas periféricas da cidade de São Paulo, com meta de instalação de 10.000 novos pontos de luz até 2026.',
 'Em tramitação'
);

-- Relacionar demanda com projeto de lei
INSERT INTO demand_bill_relations (demand_id, bill_id, relation) VALUES
(1, 1, 'Este projeto pode beneficiar diretamente a região mencionada na demanda, incluindo recursos para instalação de novos postes de iluminação no bairro Pinheiros.');

-- Inserir apoios de exemplo (3 usuários diferentes)
INSERT INTO demand_supports (demand_id, user_id) VALUES
(1, 2),
(1, 3),
(1, 4);
```

### Geração Automática de Hash

O hash da demanda pode ser gerado automaticamente usando uma função do PostgreSQL:

```sql
-- Função para gerar hash único
CREATE OR REPLACE FUNCTION generate_demand_hash()
RETURNS TRIGGER AS $$
BEGIN
  NEW.hash := '0x' || substr(md5(NEW.id::text || NEW.created_at::text), 1, 16);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para gerar hash após inserção
CREATE TRIGGER generate_demand_hash_trigger
AFTER INSERT ON demands
FOR EACH ROW
EXECUTE FUNCTION generate_demand_hash();
```

Ou no código do backend (Node.js):

```javascript
const crypto = require('crypto');

function generateDemandHash(id, createdAt) {
  const data = `${id}${createdAt}`;
  const hash = crypto.createHash('md5').update(data).digest('hex');
  return `0x${hash.substring(0, 16)}`;
}

// Após inserir a demanda
const insertResult = await db.query(
  'INSERT INTO demands (title, description, location, status, category, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
  [title, description, location, status, category, userId]
);

const demand = insertResult.rows[0];
const hash = generateDemandHash(demand.id, demand.created_at);

await db.query('UPDATE demands SET hash = $1 WHERE id = $2', [hash, demand.id]);
```
```

### Variáveis de Ambiente Necessárias no Backend

```env
PORT=8000
DATABASE_URL=postgresql://user:password@localhost:5432/coral
JWT_SECRET=seu_secret_key_aqui
JWT_EXPIRES_IN=7d
```

### Configuração do WhatsApp (whatsapp-web.js)

O backend deve usar a biblioteca `whatsapp-web.js` para enviar os códigos de verificação via WhatsApp.

#### Instalação

```bash
npm install whatsapp-web.js qrcode-terminal
```

#### Implementação Sugerida

```javascript
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inicializar cliente do WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

// Evento de QR Code (primeira autenticação)
client.on('qr', (qr) => {
  console.log('QR Code recebido, escaneie com o WhatsApp:');
  qrcode.generate(qr, { small: true });
});

// Evento de autenticação bem-sucedida
client.on('ready', () => {
  console.log('WhatsApp conectado e pronto!');
});

// Evento de autenticação
client.on('authenticated', () => {
  console.log('WhatsApp autenticado com sucesso!');
});

// Inicializar cliente
client.initialize();

// Função para enviar código de verificação
async function sendVerificationCode(phone, code) {
  try {
    // Formato: 5511999999999@c.us (DDI + DDD + número)
    const chatId = `55${phone}@c.us`;
    
    const message = `🌊 *Coral - Código de Verificação*\n\nSeu código de verificação é: *${code}*\n\nEste código expira em 10 minutos.\n\nSe você não solicitou este código, ignore esta mensagem.`;
    
    await client.sendMessage(chatId, message);
    return { success: true };
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw new Error('Falha ao enviar código de verificação');
  }
}

module.exports = { client, sendVerificationCode };
```

#### Observações Importantes

1. **Primeira Execução**: Na primeira vez que o backend rodar, será necessário escanear um QR Code com o WhatsApp para autenticar
2. **Persistência**: A biblioteca salva a sessão localmente (pasta `.wwebjs_auth`), então não será necessário escanear o QR Code novamente
3. **Formato do Telefone**: O telefone deve estar no formato internacional sem caracteres especiais: `55` (DDI Brasil) + `11` (DDD) + `999999999` (número)
4. **Número Válido**: O número de telefone deve estar registrado no WhatsApp
5. **Rate Limiting**: Implemente controle de taxa para evitar banimento (não enviar muitas mensagens em curto período)
6. **Ambiente de Produção**: Em produção, considere usar um servidor dedicado com display virtual (Xvfb) ou executar em um VPS
