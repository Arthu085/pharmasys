# PharmaSys Frontend

## 📋 Sobre

Frontend do sistema PharmaSys desenvolvido com **React 19**, **TypeScript** e **Vite**, utilizando **Ant Design** como biblioteca de componentes UI. O projeto segue uma arquitetura modular organizada em camadas, separando responsabilidades entre domínio, infraestrutura e apresentação.

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas para cada módulo funcional:

```
src/
├── core/                           # Configurações e estruturas core
│   ├── components/
│   │   ├── guards/                # Guards de rota (proteção)
│   │   └── layouts/               # Layouts principais
│   ├── config/                    # Configurações globais
│   │   ├── axios.config.ts        # Configuração do Axios
│   │   ├── env.config.ts          # Variáveis de ambiente
│   │   ├── menu.config.tsx        # Configuração do menu
│   │   ├── theme.config.ts        # Tema do Ant Design
│   │   └── zod.config.ts          # Configuração do Zod
│   ├── enums/                     # Enums globais
│   ├── interfaces/                # Interfaces globais
│   ├── routes/                    # Configuração de rotas
│   │   ├── app.routes.tsx         # Definição de rotas
│   │   └── router.tsx             # Router principal
│   └── utils/                     # Utilitários globais
│
├── modules/                        # Módulos da aplicação
│   └── [module-name]/
│       ├── domain/                 # Camada de domínio
│       │   ├── dtos/              # Data Transfer Objects
│       │   ├── interfaces/        # Interfaces do domínio
│       │   └── enums/             # Enums do módulo
│       ├── infrastructure/         # Camada de infraestrutura
│       │   ├── services/          # Serviços de API
│       │   └── hooks/             # Hooks customizados
│       └── presentation/           # Camada de apresentação
│           ├── components/        # Componentes do módulo
│           ├── pages/             # Páginas do módulo
│           └── routes/            # Rotas do módulo
│
└── shared/                         # Recursos compartilhados
    ├── components/                 # Componentes reutilizáveis
    │   ├── buttons/
    │   ├── cards/
    │   ├── filters/
    │   ├── form/
    │   ├── inputs/
    │   ├── modals/
    │   ├── selects/
    │   ├── tables/
    │   └── tags/
    ├── domain/                     # DTOs, enums e interfaces compartilhados
    ├── hooks/                      # Hooks compartilhados
    │   ├── use-fetch-data.ts      # Hook para buscar dados
    │   ├── use-fetch-modal.ts     # Hook para modals com fetch
    │   ├── use-form-fetch.ts      # Hook para formulários com fetch
    │   ├── use-form-submit.ts     # Hook para submit de forms
    │   ├── use-list.ts            # Hook para listas
    │   └── use-modals.ts          # Hook para controle de modals
    ├── utils/                      # Utilitários compartilhados
    └── validation/                 # Schemas de validação Zod
```

### Padrões e Práticas

- **Arquitetura em Camadas**: Separação clara entre domínio, infraestrutura e apresentação
- **Clean Code**: Código limpo e legível
- **Hooks Customizados**: Reuso de lógica através de hooks
- **Component Composition**: Composição de componentes pequenos e reutilizáveis
- **Type Safety**: Tipagem forte com TypeScript
- **Schema Validation**: Validação com Zod
- **Route Guards**: Proteção de rotas com autenticação
- **Conventional Commits**: Commits semânticos

## 🛠️ Tecnologias

- **[React 19](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript tipado
- **[Vite](https://vitejs.dev/)** - Build tool e dev server extremamente rápido
- **[Ant Design](https://ant.design/)** - Biblioteca de componentes UI
- **[React Router](https://reactrouter.com/)** - Roteamento declarativo
- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[Day.js](https://day.js.org/)** - Manipulação de datas
- **[JWT Decode](https://github.com/auth0/jwt-decode)** - Decodificação de tokens JWT

## 📚 Principais Módulos e Funcionalidades

### 🔐 Autenticação (`/auth`)

- Login de usuários
- Registro de novos usuários
- Logout
- Proteção de rotas

### 📊 Dashboard (`/`)

- Visão geral do sistema
- Métricas e indicadores
- Gráficos e estatísticas

### 🏥 Empresas (`/companies`)

- Listagem de empresas
- Cadastro e edição
- Controle de status
- Hierarquia organizacional

### 👥 Usuários (`/users`)

- Gestão de usuários do sistema
- Controle de permissões (Admin, Farmacêutico, Operador)
- Ativação/desativação

### 💊 Itens/Medicamentos (`/items`)

- Cadastro de medicamentos e produtos
- Busca e filtros avançados
- Controle de categorias
- Unidades de medida

### 📦 Lotes (`/batches`)

- Controle de lotes por item
- Gestão de validades
- Rastreabilidade

### 📍 Localizações de Estoque (`/stock/locations`)

- Gestão de locais de armazenamento
- Estrutura hierárquica de locais
- Vinculação com empresas

### 📊 Saldo de Estoque (`/movement/stock/balance`)

- Visualização de saldos em tempo real
- Filtros por item, local e empresa
- Alertas de estoque baixo

### 📥 Entradas de Estoque (`/movement/inventory/entry`)

- Registro de entradas
- Vinculação com lotes
- Notas fiscais

### 📤 Saídas de Estoque (`/movement/inventory/exit`)

- Registro de saídas
- Motivos de saída
- Controle de consumo

### 🔄 Transferências de Estoque (`/movement/stock/transfer`)

- Transferências entre locais
- Histórico de movimentações
- Status da transferência

### 💊 Dispensação de Medicamentos (`/movement/item/dispensation`)

- Dispensação para pacientes
- Vinculação com prescrições
- Registro de prescritores

### 🧑‍⚕️ Pacientes (`/patients`)

- Cadastro de pacientes
- Histórico de dispensações
- Dados pessoais e contatos

### 👨‍⚕️ Prescritores (`/prescriptors`)

- Cadastro de médicos/prescritores
- CRM e especialidades
- Vinculação com dispensações

### 👤 Perfil (`/users/profile`)

- Dados do usuário logado
- Alteração de senha
- Preferências

## 🚀 Como Executar

### 📋 Pré-requisitos

- Node.js 18+ e npm
- Backend rodando (pharmasys-api)
- Git

### 🐳 Executar com Docker (Recomendado)

Se você está no repositório principal do platform:

```bash
docker-compose up -d frontend
```

Para executar apenas o frontend com Docker:

```bash
# No diretório pharmasys
docker build -t pharmasys-frontend -f Dockerfile.dev .

docker run -d \
  --name pharmasys-frontend \
  -p 5173:5173 \
  -e VITE_API_URL=http://localhost:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  pharmasys-frontend
```

### 💻 Executar sem Docker

1. **Clone o repositório** (se ainda não clonou)

```bash
git clone https://github.com/Arthu085/pharmasys.git
cd pharmasys
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

**Variáveis disponíveis:**

- `VITE_API_URL` - URL base da API (padrão: http://localhost:3000)
- `VITE_HMR_CLIENT_PORT` - Porta para HMR do Vite (opcional)

4. **Certifique-se de que o backend está rodando**

O frontend precisa se comunicar com o backend. Verifique se o backend está acessível na URL configurada.

5. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

O aplicativo estará disponível em: `http://localhost:5173`

6. **Build para produção**

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

7. **Preview da build de produção**

```bash
npm run preview
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Compila para produção
npm run preview      # Preview da build de produção
npm run lint         # Executa o linter
npm run typecheck    # Verifica tipos TypeScript
```

## 🔐 Autenticação e Guards

O sistema utiliza guards de rota para proteger páginas que requerem autenticação:

```typescript
// src/core/components/guards/AuthGuard.tsx
// Redireciona para login se não autenticado
```

O token JWT é armazenado em **httpOnly cookies** gerenciados pelo backend, garantindo maior segurança.

## 📡 Configuração do Axios

As requisições HTTP são configuradas em [src/core/config/axios.config.ts](src/core/config/axios.config.ts) com:

- Base URL da API
- Interceptors de request e response
- Tratamento automático de erros
- Refresh automático de tokens

## 🪝 Hooks Compartilhados

O projeto oferece diversos hooks para facilitar o desenvolvimento:

### `useFetchData`

Busca dados de APIs com loading, error e data states.

```typescript
const { data, loading, error } = useFetchData<User[]>("/api/user");
```

### `useFormSubmit`

Facilita o submit de formulários com validação.

```typescript
const { handleSubmit, loading } = useFormSubmit({
	onSubmit: async (values) => {
		await api.post("/api/user", values);
	},
});
```

### `useModals`

Controla visibilidade de modals (create, edit, view).

```typescript
const { isOpen, open, close } = useModals();
```

### `useList`

Gerencia listas com paginação, filtros e recarregamento.

```typescript
const { items, loading, pagination, filters, reload } = useList();
```

## 🎯 Componentes Compartilhados

Componentes reutilizáveis em `src/shared/components/`:

- **Buttons**: Botões customizados (Save, Cancel, Edit, Delete, etc.)
- **Cards**: Cards estilizados
- **Filters**: Componentes de filtro
- **Form**: Campos de formulário customizados
- **Inputs**: Inputs especializados
- **Modals**: Modals reutilizáveis (CRUD, confirmação)
- **Selects**: Selects com busca e data remota
- **Tables**: Tabelas paginadas e configuráveis
- **Tags**: Tags de status, categorias, etc.

## 🌐 Rotas

As rotas são configuradas em [src/core/routes/app.routes.tsx](src/core/routes/app.routes.tsx) e organizadas por módulo.

**Estrutura de rotas:**

```
/                                    → Dashboard (protegida)
/auth/login                          → Login (pública)
/auth/register                       → Registro (pública)
/users                               → Usuários (protegida, admin)
/users/profile                       → Perfil do usuário (protegida)
/companies                           → Empresas (protegida)
/items                               → Itens/Medicamentos (protegida)
/batches                             → Lotes (protegida)
/patients                            → Pacientes (protegida)
/prescriptors                        → Prescritores (protegida)
/stock/locations                     → Localizações de estoque (protegida)
/movement/stock/balance              → Saldo de estoque (protegida)
/movement/inventory/entry            → Entradas de estoque (protegida)
/movement/inventory/exit             → Saídas de estoque (protegida)
/movement/stock/transfer             → Transferências (protegida)
/movement/item/dispensation          → Dispensações (protegida)
```

## 📦 Build e Deploy

### Build para produção

```bash
npm run build
```

### Usando Nginx

O projeto inclui configuração Nginx em [nginx/nginx.conf](nginx/nginx.conf) para servir a aplicação em produção.

```bash
# Com Docker
docker build -t pharmasys-frontend -f Dockerfile .
docker run -p 80:80 pharmasys-frontend
```

## 🔍 Estrutura de Validação

Validações são feitas com **Zod** em `src/shared/validation/`:

```typescript
import { z } from "zod";

export const userSchema = z.object({
	name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
	email: z.string().email("Email inválido"),
	// ...
});
```

## 🔗 Links Relacionados

- [Platform Principal](https://github.com/Arthu085/pharmasys-platform)
- [Backend](https://github.com/Arthu085/pharmasys-api)

---

Desenvolvido por Arthur Ghizi
