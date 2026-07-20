# 🤝 Contribuindo para o Cine Cast

Obrigado por se interessar em contribuir com o Cine Cast! Este documento fornece orientações e instruções.

## 📋 Código de Conduta

Todos os contribuidores devem seguir nosso Código de Conduta:

- Seja respeitoso e inclusivo
- Respeite diferentes perspectivas e experiências
- Dê feedback construtivo
- Reporte comportamentos inapropriados

## 🚀 Como Contribuir

### Reportar Bugs

1. Verifique se o bug já foi reportado (Issues)
2. Se novo, abra uma Issue com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs. atual
   - Screenshots se aplicável
   - Ambiente (OS, navegador, versão Node)

### Sugerir Melhorias

1. Abra uma Issue com tag `enhancement`
2. Descreva a melhoria e por que é útil
3. Liste exemplos de como funcionaria

### Pull Requests

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/seu-feature`
3. Commit suas mudanças: `git commit -m 'Add seu-feature'`
4. Push para a branch: `git push origin feature/seu-feature`
5. Abra um Pull Request

## 📝 Guias de Desenvolvimento

### Setup Local

```bash
git clone https://github.com/patopatu/cinecast.git
cd cinecast

cd frontend
npm install
cp .env.example .env.local
npm run dev

cd ../backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

### Padrões de Código

- Use ESLint configurado no projeto
- Siga o Prettier para formatação
- Componentes React em JSX
- Arquivos em camelCase
- Pastas em kebab-case

### Commits

Siga o padrão Conventional Commits:

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: mudanças de formatação
refactor: refatoração de código
test: adiciona testes
chore: mudanças de build/dependências
```

## ✅ Checklist para PRs

- [ ] Testei localmente
- [ ] Adicionei testes (se necessário)
- [ ] Atualizei documentação
- [ ] Sigo padrões de código
- [ ] Commits seguem Conventional Commits
- [ ] Sem conflitos com main
- [ ] PR tem descrição clara

## 🏆 Reconhecimento

Contribuidores regulares receberão:
- Menção no README
- Badge de contribuidor
- Acesso a canais privados no Discord

## 💬 Comunicação

- **Issues**: Bug reports e features
- **Discussions**: Dúvidas gerais
- **Email**: contato@cinecast.com.br

---

Obrigado por contribuir! 🎬