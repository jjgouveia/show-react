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

- **Nome**: em `package.json` está `"name": "show-react"`. Verifique se está livre:

```bash
npm view show-react
```

Se der **404**, o nome está disponível.

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

- Para pacote **não escopado** (como `show-react`): o nome precisa estar livre e você precisa estar logado.
- Para pacote **escopado** (ex.: `@seu-usuario/show-react`): use:

```bash
npm publish --access public
```

(o padrão de escopo é restrito; `--access public` deixa o pacote público e instalável por qualquer um).

---

## 5. Depois de publicado

- Página do pacote: `https://www.npmjs.com/package/show-react`
- Instalação: `npm install show-react`

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
- [ ] Nome do pacote disponível (`npm view show-react` → 404)
- [ ] `npm run test:run` passando
- [ ] `npm run build` gerando `dist/`
- [ ] README e dados em `package.json` (author, description, etc.) revisados
