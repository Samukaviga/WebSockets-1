import { emitirAdicionarDocumento } from "./socket-front-index.js";

const listaDocumentos = document.getElementById("lista-documentos");
const input = document.getElementById("input-documento");
const form = document.getElementById("form-adiciona-documento");

form.addEventListener("submit", (evento) => {
    evento.preventDefault(); //para a apagina nao recarregar após o submit
    emitirAdicionarDocumento(input.value);
    input.value = "";
});

function inserirLinkDocumento(nomeDocumento){

    listaDocumentos.innerHTML += `
    <a 
        href="documento.html?nome=${nomeDocumento}" 
        class="list-group-item list-group-item-action" 
        id="documento-${nomeDocumento}"
    >
        ${nomeDocumento}
    </a>
    `;
}

function removerLinkDocumento(nomeDocumento){
    const documento = document.getElementById(`documento-${nomeDocumento}`);
    
    listaDocumentos.removeChild(documento);
}

export { inserirLinkDocumento, removerLinkDocumento };