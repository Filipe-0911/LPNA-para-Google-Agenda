// ==UserScript==
// @name         Adiciona dias de serviço na agenda google
// @namespace    http://tampermonkey.net/
// @version      2026-03-16
// @description  try to take over the world!
// @author       You
// @match        https://lpna.decea.mil.br/painel/minha-escala
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mil.br
// @grant GM_xmlhttpRequest
// @connect script.google.com
// @connect      script.googleusercontent.com
// ==/UserScript==

(function() {
    'use strict';
    // Adicione o link da API criada no google app script entre as aspas da constante abaixo
    const urlApiDatas = "";


    const intervalo = setInterval(() => {

        let localBotao = document.querySelector(".css-1wgvv67");

        if(localBotao && !document.querySelector("#meu-botao-tamper")){
            let divBotao = document.createElement("div");
            divBotao.style.display = "flex";
            divBotao.style.justifyContent = "flex-end";

            let botao = document.createElement("button");
            botao.id = "meu-botao-tamper";
            botao.innerText = "Adicionar na agenda";

            botao.style.backgroundColor = "#00FF7F";
            botao.style.padding = "8px";
            botao.style.borderRadius = "10px";
            botao.style.fontSize = "16px";
            botao.style.color = "#000";
            botao.style.fontWeight = "bold";
            botao.style.border = "none";
            botao.style.cursor = "pointer";
            botao.style.transition = "0.2s";
            botao.style.fontFamily = 'Open Sans, Roboto, "Helvetica Neue", Arial, sans-serif';
            botao.style.letterSpacing = "1px";

            botao.addEventListener("mouseenter", () => {
                botao.style.backgroundColor = "#11cc66";
                botao.style.textDecoration = "underline";
            });

            botao.addEventListener("mouseleave", () => {
                botao.style.backgroundColor = "#00FF7F";
                botao.style.textDecoration = "none";
            });

            botao.addEventListener("click", selecionaDias);

            divBotao.appendChild(botao)

            localBotao.appendChild(divBotao);

            clearInterval(intervalo);
        }

        function selecionaDias () {
            let mesSelecionado = document.querySelector(".css-1ho2t94").innerText;
            let ano = document.querySelector(".css-1l1qdcp").innerText;

            let elementosDiasServicoAim = document.querySelectorAll(".css-1pe5j6x");
            let elementosDiasServicoRisaer = document.querySelectorAll(".css-fcwwdt");
            let diasServicoAim = Array.from(elementosDiasServicoAim).map(e => criaData(e.parentNode.parentNode.parentNode.innerText.match(/\d+/)[0], mesSelecionado, ano));
            let diasServicoRisaer = Array.from(elementosDiasServicoRisaer).map(e => criaData(e.parentNode.parentNode.parentNode.innerText.match(/\d+/)[0], mesSelecionado, ano));

            console.log(diasServicoAim);
            console.log(diasServicoRisaer);

            enviarDatas(diasServicoAim, "AIM 1");
            enviarDatas(diasServicoRisaer, "RISAER");
        }

        function criaData(dia, mesSelecionado, ano) {
            let meses = {
                "JANEIRO": 0,
                "FEVEREIRO": 1,
                "MARÇO": 2,
                "ABRIL": 3,
                "MAIO": 4,
                "JUNHO": 5,
                "JULHO": 6,
                "AGOSTO": 7,
                "SETEMBRO": 8,
                "OUTUBRO": 9,
                "NOVEMBRO": 10,
                "DEZEMBRO": 11
            };

            let data = new Date(Number(ano), meses[mesSelecionado], Number(dia));

            return data.toISOString().split("T")[0];
        }

        function enviarDatas(datas, titulo) {

            GM_xmlhttpRequest({
                method: "POST",
                url: urlApiDatas,
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    datas: datas,
                    titulo: titulo
                }),
                onload: function(response) {
                    console.log("Resposta:", response.responseText);
                    mostrarModalResposta(response.responseText);
                },
                onerror: function(error) {
                    console.error("Erro:", error);
                    mostrarModalResposta(error.responseText);
                }
            });

        }

        function mostrarModalResposta(mensagem){
            let mensagemRecebida = JSON.parse(mensagem)
            const overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.background = "rgba(0,0,0,0.5)";
            overlay.style.display = "flex";
            overlay.style.alignItems = "center";
            overlay.style.justifyContent = "center";
            overlay.style.zIndex = "99999";

            const modal = document.createElement("div");
            modal.style.background = "white";
            modal.style.padding = "24px";
            modal.style.borderRadius = "12px";
            modal.style.minWidth = "350px";
            modal.style.maxWidth = "500px";
            modal.style.fontFamily = 'Roboto, "Helvetica Neue", Arial';
            modal.style.boxShadow =
                "0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14)";

            const titulo = document.createElement("h2");
            titulo.innerText = mensagemRecebida.status;
            titulo.style.marginTop = "0";
            titulo.style.fontSize = "20px";
            titulo.style.color = "black";

            const conteudo = document.createElement("pre");
            conteudo.innerText = mensagemRecebida.detalhe;
            conteudo.style.background = "#f5f5f5";
            conteudo.style.padding = "10px";
            conteudo.style.borderRadius = "6px";
            conteudo.style.color = "black";

            const fechar = document.createElement("button");
            fechar.innerText = "Fechar";
            fechar.style.marginTop = "15px";
            fechar.style.padding = "6px 16px";
            fechar.style.border = "none";
            fechar.style.borderRadius = "6px";
            fechar.style.background = "#1976d2";
            fechar.style.color = "white";
            fechar.style.cursor = "pointer";

            fechar.onclick = () => overlay.remove();

            modal.appendChild(titulo);
            modal.appendChild(conteudo);
            modal.appendChild(fechar);

            overlay.appendChild(modal);

            document.body.appendChild(overlay);
        }
    }, 1000);


})();
