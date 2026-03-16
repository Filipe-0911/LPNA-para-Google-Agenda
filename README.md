# Criando uma API com Google Apps Script + Integração com Tampermonkey

Este guia ensina como:

1. Criar uma **API usando Google Apps Script**
2. Conectar essa API ao **Google Calendar**
3. Criar um **script Tampermonkey** que envia datas para essa API
4. Exibir o retorno da API em um **modal no navegador**

Os códigos utilizados neste tutorial estão no repositório nos seguintes arquivos:

* `arquivo_api_appscript.js`
* `tampermonkey.js`

---

# 1. Criando o projeto no Google Apps Script

1. Acesse:

[https://script.google.com/](https://script.google.com/)

2. Clique em **Novo projeto**

3. Apague o código padrão e cole o conteúdo do arquivo:

```
arquivo_api_appscript.js
```

Este arquivo contém toda a lógica da API, incluindo:

* Endpoint `POST` para receber datas
* Integração com **Google Calendar**
* Remoção de eventos duplicados
* Criação de novos eventos
* Retorno padronizado em **JSON**

---

# 2. Criando a variável de ambiente do calendário

O script utiliza o **ID do Google Calendar** onde os eventos serão criados.

## Como obter o ID do calendário

1. Abra:

[https://calendar.google.com](https://calendar.google.com)

2. No menu lateral clique nos **três pontos do calendário desejado**

3. Clique em **Configurações e compartilhamento**

4. Copie o campo:

```
ID do calendário
```

Exemplo:

```
abcd1234@group.calendar.google.com
```

---

## Criando a variável no Apps Script

No projeto:

1. Clique em **Project Settings (Configurações do Projeto)**
2. Vá em **Script Properties**
3. Clique em **Add Script Property**

Adicione:

| Nome          | Valor                |
| ------------- | -------------------- |
| ID_CALENDARIO | ID do seu calendário |

---

# 3. Publicando a API

Agora precisamos publicar o script como **Web App**.

1. Clique em **Deploy**
2. Clique em **New Deployment**
3. Escolha **Web App**

Configure:

| Campo          | Valor      |
| -------------- | ---------- |
| Execute as     | **Me**     |
| Who has access | **Anyone** |

Clique em **Deploy**.

O Google irá gerar uma URL parecida com:

```
https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxx/exec
```

Guarde essa URL.

Ela será usada no Tampermonkey.

---

# 4. Instalando o Tampermonkey

Instale a extensão:

[https://www.tampermonkey.net/](https://www.tampermonkey.net/)

Disponível para:

* Chrome
* Edge
* Firefox
* Opera

Depois:

1. Clique no ícone da extensão
2. Clique em **Create a new script**

---

# 5. Script Tampermonkey

Agora copie o conteúdo do arquivo:

```
tampermonkey.js
```

Cole dentro do novo script criado no Tampermonkey.

Esse script faz o seguinte:

* Injeta um botão na página de escala
* Captura os dias de serviço exibidos na página
* Converte esses dias para datas válidas
* Envia as datas para a **API do Google Apps Script**
* Exibe a resposta da API em um **modal na tela**

---

# 6. Configurando a URL da API

Dentro do arquivo `tampermonkey.js`, procure pela constante:

```
const urlApiDatas = "";
```

E adicione a URL da API publicada:

```
const urlApiDatas = "https://script.google.com/macros/s/SEU_SCRIPT_ID/exec";
```

---

# 7. Como funciona o fluxo

O funcionamento do sistema ocorre da seguinte forma:

1. O Tampermonkey adiciona um botão na página de escala
2. Ao clicar no botão:

   * O script coleta as datas da escala
3. As datas são enviadas para a **API do Google Apps Script**
4. A API:

   * Remove eventos duplicados
   * Cria novos eventos no Google Calendar
5. O retorno da API é exibido em um **modal na tela**

---

# Resultado

Com isso você terá uma automação completa entre:

* Site da escala de serviço
* Google Calendar
* API serverless (Google Apps Script)
* Automação no navegador via Tampermonkey

Tudo funcionando **sem necessidade de servidor próprio**.
* diagrama da arquitetura
* exemplos de requisição da API.
