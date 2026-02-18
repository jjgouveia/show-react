# Passo a passo para publicar no NPM

## 1. Conta no NPM

- Crie uma conta em [npmjs.com](https://www.npmjs.com/signup) se ainda não tiver.
- No terminal, faça login:

```bash
npm login
```

Informe **Username**, **Password** e **Email** (e OTP se tiver 2FA).

---

## 2. Conferir o pacote

- **Nome**: o pacote está no escopo da org **lazylab**: `@lazylab/show-react`. Verifique se está livre:

```bash
npm view @lazylab/show-react
```

Se der **404**, o nome está disponível. Pacotes escopados exigem `npm publish --access public`.

- **Versão**: use [SemVer](https://semver.org/). Para a primeira publicação, `1.0.0` é o ideal.
- **Arquivos publicados**: o campo `"files": ["dist"]` faz com que só a pasta `dist` seja enviada. Não vão para o NPM: `src/`, testes, configs locais, etc.

---

## 3. Build e testes

Na pasta do projeto:

```bash
cd show
npm install
npm run test:run
npm run build
```

- Se os testes passarem e o `dist` for gerado, está pronto para publicar.

---

## 4. Publicar

Na pasta do projeto (onde está o `package.json`):

```bash
npm publish
```

- Este pacote é **escopado** (`@lazylab/show-react`). Sempre use:

```bash
npm publish --access public
```

(o padrão de escopo é restrito; `--access public` deixa o pacote público e instalável por qualquer um).

### Erro 403 Forbidden ao publicar

- **Conta/org**: Se você publica pela org **lazylab**, o pacote precisa estar no escopo `@lazylab/show-react`. Pacotes não escopados (`show-react`) podem ser bloqueados. Use o nome `@lazylab/show-react` e `npm publish --access public`.
- **Nome já em uso**: Confira com `npm view @lazylab/show-react`. Se existir e você não for da org **lazylab**, escolha outro nome no mesmo escopo ou use outro escopo.
- **E-mail não verificado**: No [npm](https://www.npmjs.com/) → Account → verifique se o e-mail está confirmado. Sem isso o npm bloqueia a publicação.
- **Token sem permissão**: Se estiver usando CI (GitHub Actions), o token deve ser do tipo **Automation** ou **Publish**. Em Access Tokens, crie um novo com permissão de publicação.
- **Proteção de publicação (npm Pro/Teams)**: Se sua conta tiver “Require two-factor authentication for publish” ou restrições de pacote, ajuste em Package Access / Settings.

---

## 5. Depois de publicado

- Página do pacote: `https://www.npmjs.com/package/@lazylab/show-react`
- Instalação: `npm install @lazylab/show-react`

---

## 6. Atualizações futuras

1. Ajuste a versão no `package.json` (ex.: `1.0.1`, `1.1.0`, `2.0.0`).
2. Rode testes e build:

   ```bash
   npm run test:run
   npm run build
   ```

3. Publique de novo:

   ```bash
   npm publish
   ```

---

## 7. CI/CD no GitHub

### CI (sempre ativo)

O workflow em `.github/workflows/ci.yml` roda em todo **push** e **pull request** para `main`/`master`:

- Instala dependências (`npm ci`)
- Roda testes (`npm run test:run`)
- Roda build (`npm run build`)

Assim você não mergeia código quebrado.

### CD – Publicar no NPM pela pipeline (opcional)

O workflow em `.github/workflows/publish.yml` publica no NPM quando você **cria uma tag de versão** (ex.: `v1.0.0`).

**Como ativar:**

1. No [npm](https://www.npmjs.com/): **Access Tokens** → **Generate New Token** → tipo **Automation** (recomendado para CI).
2. No GitHub: repositório → **Settings** → **Secrets and variables** → **Actions** → **New repository secret** → nome `NPM_TOKEN`, valor = token do npm.
3. Antes de publicar uma nova versão:
   - Atualize a versão no `package.json` (ex.: `1.0.1`).
   - Commit, push, depois crie e envie a tag:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```
4. A pipeline roda testes, build e `npm publish` automaticamente.

Se preferir publicar sempre manualmente, ignore o workflow `publish.yml` ou remova o arquivo.

---

## Checklist antes de publicar

- [ ] `npm login` feito
- [ ] Nome do pacote disponível (`npm view @lazylab/show-react` → 404) ou você tem permissão na org **lazylab**
- [ ] `npm run test:run` passando
- [ ] `npm run build` gerando `dist/`
- [ ] README e dados em `package.json` (author, description, etc.) revisados
