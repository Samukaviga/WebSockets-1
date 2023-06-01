import {  inserirLinkDocumento, removerLinkDocumento } from "./index.js";

const socket = io();

socket.emit("obter_documentos", (documentos) => {
    documentos.forEach( (documento) => {
        inserirLinkDocumento(documento.nome);
    });
});

function emitirAdicionarDocumento(inputDocumento){

    socket.emit("adicionando_documento", inputDocumento);
}

socket.on("adicionar_documento_interface", (nomeDocumento) => {
    inserirLinkDocumento(nomeDocumento);
});

socket.on("documento_existente", (nomeDocumento) => {
    alert(`O documento ${nomeDocumento} já existe!`);
});

socket.on("excluir_documento_sucesso", (nome) => {
    
    removerLinkDocumento(nome);
});

export { emitirAdicionarDocumento };