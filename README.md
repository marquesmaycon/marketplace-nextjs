# 🛍️ Marketplace Next.js - Fluxo de Checkout

> 🚀 **Aplicação Next.js moderna** desenvolvida para demonstrar um fluxo completo de checkout com autenticação, carrinho e múltiplos métodos de pagamento.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.x-FF4154?logo=react-query)](https://tanstack.com/query)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-Latest-000000)](https://ui.shadcn.com/)

## 📖 Sobre o Projeto

Sistema completo de e-commerce focado no **fluxo de checkout**, implementando **autenticação**, **carrinho de compras**, **múltiplos métodos de pagamento** e **acompanhamento de pedidos**. Toda a aplicação é **100% mockada**, sem necessidade de backend real.

⚠️ **Importante**: Esta é uma aplicação de demonstração. Todos os dados são simulados e armazenados localmente no navegador (localStorage e cookies).

## 🚀 Demo Online

### 🌐 [VER PROJETO AO VIVO](https://marketplace-nextjs.mklly.com.br/register)

## ✨ Principais Funcionalidades

### 🔐 **Autenticação Mockada**
- Registro de usuários
- Persistência de sessão com cookies
- Proteção de rotas privadas
- Logout e limpeza de dados

### 🛒 **Gestão de Produtos & Carrinho**
- ✅ Listagem paginada de produtos
- ✅ Imagens dinâmicas via Picsum
- ✅ Adição/remoção do carrinho
- ✅ Atualização de quantidade
- ✅ Cálculo automático de totais

### 💳 **Checkout Completo**
- ✅ Formulário de dados do comprador
- ✅ Endereço de entrega
- ✅ Três métodos de pagamento:
  - **PIX** - QR Code e chave copiável (expira em 1h)
  - **Cartão de Crédito** - Validação completa (processa em 24h)
  - **Boleto** - Código de barras copiável (expira em 5 dias)
- ✅ Validação de formulários com Zod
- ✅ Resumo detalhado do pedido

### 📦 **Acompanhamento de Pedidos**
- ✅ Listagem de todos os pedidos
- ✅ Evolução de status (pending → payed | failed | expired)
- ✅ Simulação de processamento de pagamentos
- ✅ Retry em caso de falha
- ✅ Histórico completo

## 🛠️ Stack Tecnológica

### **Frontend Core**
- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **React 19** - Biblioteca principal

### **Gerenciamento de Estado & Dados**
- **TanStack Query** - Cache e sincronização
- **TanStack Form** - Formulários com validação
- **Zod** - Schema validation
- **js-cookie** - Gestão de sessão

### **UI & Styling**
- **Shadcn UI** - Sistema de componentes
- **Tailwind CSS** - Utility-first CSS
- **Lucide Icons** - Ícones modernos
- **Sonner** - Toast notifications

### **Qualidade de Código**
- **ESLint** - Análise estática
- **TypeScript Strict Mode** - Tipagem rigorosa

## 🏗️ Arquitetura do Projeto

```
app/
├── (auth)/              # Rotas de autenticação
│   └── register/       # Página de registro
├── (protected)/        # Rotas protegidas
│   ├── products/      # Catálogo de produtos
│   ├── checkout/      # Fluxo de checkout
│   └── orders/        # Gerenciamento de pedidos
└── api/                # API Routes mockadas
    ├── products/      # Endpoints de produtos
    └── users/         # Endpoints de usuários

components/
├── ui/                 # Componentes Shadcn UI
├── cart.tsx           # Carrinho de compras
└── ...

features/
├── auth/              # Autenticação
├── cart/              # Gerenciamento de carrinho
├── checkout/          # Fluxo de checkout
├── orders/            # Pedidos
└── products/          # Produtos

contexts/              # Contexts React
hooks/                 # Custom hooks
lib/                   # Utilitários e configurações
types/                 # Tipos TypeScript
```

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 18+
- npm, yarn ou pnpm

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/marquesmaycon/marketplace-nextjs

cd marketplace-nextjs

# Instale as dependências
npm install

# Crie as variáveis de ambiente em .env.local (ou faça manualmente como em .env.example)
npm run create-env

# Execute em modo de desenvolvimento
npm run dev
```

Acesse http://localhost:3000

### **Comandos Disponíveis**
```bash
npm run dev         # Servidor de desenvolvimento
npm run build       # Build para produção
npm run start       # Executar build de produção
npm run lint        # Análise de código
```

## 🧪 Simulação de Pagamentos

A aplicação simula o comportamento real de processamento de pagamentos:

### **PIX** 💰
- Gera QR Code mockado
- Chave PIX copiável
- Expira em **1 hora**
- Confirmação instantânea (simulada)

### **Cartão de Crédito** 💳
- Validação de número, CVV e validade
- Parcelamento em até **6x sem juros**
- Processamento em **24 horas** (simulado)
- Estados: autorizado → capturado → pago

### **Boleto Bancário** 📄
- Código de barras copiável
- Expira em **5 dias úteis**

### **Botão de Simulação** 🎮
Use o botão "**Simular Pagamento**" em cada pedido para testar:
- 🔄 **Pagamento Pendente** - Status vira `pending`
- ✅ **Pagamento Aprovado** - Status vira `payed`
- ⚠️ **Pagamento Recusado** - Status vira `failed`
- ⏰ **Pagamento Expirado** - Status vira `expired`
- ❌ **Pagamento Cancelado** - Status vira `canceled`

## 🎨 Design System

Tema customizado baseado em Shadcn UI:

```
Cores Principais:
├── Primary: Delft Blue (#2D3E50)     - Títulos e elementos principais
├── Secondary: Tiffany Blue (#81D8D0) - Ações secundárias
├── Accent: Sky Magenta (#C76B98)     - Destaques e CTAs
└── Tertiary: Rose Quartz (#F4C2C2)   - Elementos complementares
```
## 🎯 Destaques Técnicos

### **Otimizações de Performance**
- ⚡ Server Components por padrão
- 🔄 Client Components apenas onde necessário
- 📊 Paginação eficiente de produtos
- 🖼️ Imagens otimizadas com Next.js Image
- 💾 Cache inteligente com TanStack Query

### **Experiência do Usuário**
- ⏳ Loading states em ações
- 🎯 Estados vazios informativos
- 🚨 Tratamento de erros contextual
- 📱 Design totalmente responsivo
- ⌨️ Navegação por teclado

### **Segurança & Validação**
- 🔐 Proteção de rotas
- 🛡️ Validação de formulários com Zod
- ✅ Validação de CPF, CEP, cartão

### **Desenvolvimento**
- 🔧 TypeScript para type safety
- 📏 ESLint para qualidade
- 🏗️ Arquitetura modular e escalável
- 🎨 Componentes separados por features

## 🌐 Fluxo da Aplicação

```
1. 📝 Registro/Login
   └─> Persistência de sessão

2. 🛍️ Catálogo de Produtos
   └─> Adicionar ao carrinho

3. 🛒 Carrinho
   ├─> Atualizar quantidade
   ├─> Remover itens
   └─> Prosseguir para checkout

4. 💳 Checkout
   ├─> Dados do comprador
   ├─> Endereço de entrega
   ├─> Método de pagamento
   └─> Confirmar pedido

5. 📦 Acompanhamento
   ├─> Visualizar status
   ├─> Simular processamento
   └─> Retry em caso de falha
```

## 📱 Responsividade

- **Mobile First**: Design otimizado para mobile
- **Breakpoints Tailwind**: sm, md, lg, xl, 2xl
- **Componentes Adaptáveis**: Layouts flexíveis

## ♿ Acessibilidade

- ✅ Navegação por teclado
- ✅ ARIA labels apropriados
- ✅ Foco visível em elementos interativos
- ✅ Mensagens de erro descritivas
- ✅ Loading states anunciados

## 🔄 Simulação Realista

Para proporcionar uma experiência próxima do real:

- **Latências simuladas** em operações assíncronas
- **Transições de estado** progressivas
- **Persistência local** com localStorage

---

<div align="center">
  <img src="https://github.com/marquesmaycon.png" width="100px" style="border-radius: 50%"/>
  <br/>
  <strong>Maycon Marques</strong>
  <br/>
  <br/>
  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayconhenrique/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/marquesmaycon)
  [![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:mayconmarquesh@gmail.com)

  ### Feito com ❤️ e muita 🎵
</div>
