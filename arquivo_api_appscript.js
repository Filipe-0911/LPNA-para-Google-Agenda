function doPost(e) {
  try {
    let dados = JSON.parse(e.postData.contents);
    let datas = dados.datas;
    let titulo = dados.titulo;

    let resultado = adicionaDatasNaAgenda(titulo, datas);
    return criaRetornopadrao({ status: "Sucesso!", detalhe: resultado });
  } catch (err) {
    return criaRetornopadrao({ status: "Erro!", detalhe: err.toString() });
  }
}

function adicionaDatasNaAgenda(titulo, datas) {
  let ID_CALENDARIO = buscaVariavelAmbiente("ID_CALENDARIO");
  let calendario = CalendarApp.getCalendarById(ID_CALENDARIO);
  
  if (!calendario) throw new Error("Agenda não encontrada.");

  datas.forEach(dataString => {
    let dataInicio = new Date(dataString + "T00:00:00");
    let dataFim = new Date(dataString + "T23:59:59");
    let eventosExistentes = calendario.getEvents(dataInicio, dataFim);

    eventosExistentes.forEach(evento => {
      if (evento.getTitle() === titulo) {
        evento.deleteEvent();
        Logger.log("Evento antigo removido: " + dataString);
      }
    });

    calendario.createAllDayEvent(titulo, dataInicio);
    Logger.log("Novo evento criado para: " + dataString);
  });
  
  return datas.length + " datas processadas (com limpeza de duplicados).";
}

function criaRetornopadrao(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return criaRetornopadrao({ message: "Script pronto para receber POST." });
}

function buscaVariavelAmbiente(id) {
  let scriptProperties = PropertiesService.getScriptProperties();
  let apiKey = scriptProperties.getProperty(id);
  return apiKey;
}
