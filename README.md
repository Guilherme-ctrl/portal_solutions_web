# Portal Solutions — site

Site institucional e comercial da Portal Solutions. Next.js (App Router) com
geração estática, hospedado na Vercel.

O site tem um objetivo: **atrair empresas com operação real, demonstrar
capacidade técnica e qualificar o projeto antes da primeira conversa.** Menos
contatos, mais contatos qualificados.

## Rodando localmente

```bash
pnpm install
pnpm dev
```

| Comando | O que faz |
| --- | --- |
| `pnpm dev` | Servidor de desenvolvimento em http://localhost:3000 |
| `pnpm build` | Build de produção (valida TypeScript) |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Checagem de tipos isolada |

## Estrutura

```
app/
  page.tsx                        Home
  cases/marketplace-b2b/page.tsx  Case
  avaliar-projeto/page.tsx        Formulário de qualificação
  api/avaliar-projeto/route.ts    Recebe o formulário e repassa (única peça de servidor)
  api/google-verification/        Verificação de propriedade do Google Search Console
  sitemap.ts / robots.ts          Gerados no build
  layout.tsx                      Metadados, tags do Google, dados estruturados
  globals.css                     Tokens de cor e tipografia

components/                       Seções e componentes reutilizáveis
lib/site-config.ts                >>> Decisões comerciais. Editar aqui. <<<
lib/analytics.ts                  Eventos de GA4 e Google Ads
```

Três rotas, três URLs próprias — o case e a página de avaliação precisam disso
para funcionar como landing page de Google Ads e para serem indexadas
separadamente.

## O que você precisa configurar

Todas as variáveis abaixo ficam em **Vercel > Settings > Environment
Variables**. Modelo completo em [`.env.example`](.env.example). Nenhuma é
obrigatória para o site subir.

### 1. Domínio canônico — `NEXT_PUBLIC_SITE_URL`

Valor: `https://portalsolutions.dev` — **https e sem www**.

Não é estritamente obrigatória: sem ela o código usa esse mesmo endereço como
padrão (`DOMINIO_CANONICO`, em `lib/site-config.ts`). Cadastrar mesmo assim
deixa explícito e evita que uma futura troca de domínio passe despercebida.

O valor é normalizado antes de virar canonical: `http://` vira `https://` e um
`www.` eventual é removido. Ou seja, cadastrar errado não gera canonical
errado — mas também não corrige o redirect do servidor, que é assunto da
seção **Domínio** abaixo.

### 2. Formulário — `FORM_ENDPOINT`

O site não tem backend nem banco. O formulário posta em
`/api/avaliar-projeto`, que apenas repassa para um serviço externo de e-mail.

Escolha um serviço e cole a URL em `FORM_ENDPOINT`:

- **Formspree** (recomendado, tem plano gratuito): crie um form em
  formspree.io e use `https://formspree.io/f/SEU_ID`
- **Formspark**: `https://submit-form.com/SEU_ID`

A variável **não** tem o prefixo `NEXT_PUBLIC_`. Isso é proposital: ela fica no
servidor e nunca é embutida no JavaScript entregue ao navegador. Nenhum e-mail
ou identificador de conta aparece no frontend.

Enquanto `FORM_ENDPOINT` estiver vazia, o envio falha com 503, o erro é
registrado nos logs da Vercel e o formulário oferece o WhatsApp como
alternativa — nunca finge que recebeu.

### 3. Google Analytics 4 — `NEXT_PUBLIC_GA_ID`

Formato `G-XXXXXXXXXX`. Sem a variável, nenhum script do Google é carregado.

### 4. Google Tag Manager — `NEXT_PUBLIC_GTM_ID`

Formato `GTM-XXXXXXX`. **Use GA_ID ou GTM_ID, não os dois** — configurar ambos
duplica os eventos. O código detecta qual está definido e se ajusta.

### 5. Google Ads — `NEXT_PUBLIC_ADS_ID` e `NEXT_PUBLIC_ADS_CONVERSION_LABEL`

`ADS_ID` no formato `AW-000000000`. `ADS_CONVERSION_LABEL` é o rótulo da
conversão criada no painel do Ads.

**A conversão a rastrear é o evento `generate_lead`**, disparado apenas quando o
formulário é enviado com sucesso. Cliques em CTA disparam `cta_click` com o
parâmetro `cta_location` (`hero`, `header`, `case_home`, `case_final`,
`home_final`, `404`) — servem para diagnóstico, não como conversão.

## Domínio

O domínio canônico é **`https://portalsolutions.dev`** (sem www). Todo o site
— canonical, Open Graph, `sitemap.xml` e links internos — usa apenas essa
forma. `www.portalsolutions.dev` deve **redirecionar**, nunca servir o site:
duas versões acessíveis do mesmo conteúdo dividem a autoridade do domínio e
fazem o Google escolher sozinho qual indexar.

### Estado atual: o redirect está invertido

Verificado em produção:

| Endereço | Hoje | Deveria ser |
| --- | --- | --- |
| `http://portalsolutions.dev` | 308 → `https://portalsolutions.dev` | ✅ correto |
| `https://portalsolutions.dev` | **307 → `https://www.portalsolutions.dev`** | ❌ deve responder 200 |
| `http://www.portalsolutions.dev` | 308 → `https://www.portalsolutions.dev` | ✅ correto |
| `https://www.portalsolutions.dev` | **200 (serve o site)** | ❌ deve ser 308 → apex |

Ou seja: hoje **o www é o host canônico** e o apex redireciona para ele — o
oposto do desejado. E o redirect é 307 (temporário), que não transfere
autoridade. O HTTP → HTTPS já está correto nos dois hosts e é automático na
Vercel, não precisa de configuração.

### Como corrigir (painel da Vercel)

Isso é configuração de domínio, não de código — não há nada no repositório que
possa alterar esse comportamento com segurança (ver o aviso abaixo).

1. Vercel → o projeto → **Settings → Domains**
2. Em `portalsolutions.dev`, remover o redirecionamento para
   `www.portalsolutions.dev` e deixá-lo como domínio **primário** de produção
3. Em `www.portalsolutions.dev`, escolher **Redirect to** → `portalsolutions.dev`,
   com status **308 Permanent**
4. Conferir depois com:

```bash
curl -sI https://www.portalsolutions.dev | grep -iE '^HTTP/|^location:'
```

   O esperado é `HTTP/2 308` e `location: https://portalsolutions.dev/`.

> ⚠️ **Não adicione um redirect www → apex em `next.config.mjs` antes de fazer
> o passo 2.** Enquanto o painel redireciona apex → www, um redirect www → apex
> no código cria um laço infinito (apex → www → apex → …) e derruba o site.
> Feito o passo 2, o redirect do painel já resolve tudo na borda, antes de a
> aplicação ser invocada — não é preciso nada no código.

### Depois de apontar o domínio

No Google Search Console, registrar a propriedade de `portalsolutions.dev` e
enviar `https://portalsolutions.dev/sitemap.xml`. Se já existir uma propriedade
para o www, mantenha-a cadastrada por um tempo para acompanhar a migração das
URLs antigas.

## Decisões comerciais — `lib/site-config.ts`

Estes valores estão **provisórios** e devem ser revisados antes de qualquer
campanha paga:

| Constante | O que controla |
| --- | --- |
| `PRECO_MINIMO_PROJETO` | Piso de investimento. Vazio = nenhuma menção a preço no site. Ao preencher (ex.: `"R$ 40 mil"`), a frase aparece sozinha na Home e em /avaliar-projeto. |
| `FAIXAS_ORCAMENTO` | Faixas do campo obrigatório de investimento no formulário. **Valores provisórios — revisar.** |
| `CASE_CLIENTE_NOME` | Deve permanecer vazio: o cliente não autorizou uso comercial da marca. |

As demais listas do formulário (estágio, prazo, perfil de usuário) também estão
nesse arquivo. Editar as strings basta — validação e envio se ajustam sozinhos.

## Case — restrição de confidencialidade

O case em `/cases/marketplace-b2b` é publicado **de forma anônima**. Não podem
entrar no site, enquanto não houver autorização por escrito do cliente:

- nome da empresa ou do proprietário
- logo ou identidade visual do cliente
- screenshots reais do sistema
- valores de contrato ou qualquer informação confidencial

O case descreve arquitetura e complexidade resolvida, sem identificar a empresa
e sem posicionar a Portal como especialista em um segmento específico.
