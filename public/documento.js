const socket = io();

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome"); //pegando o nome do parametro passado pelo get

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");

tituloDocumento.textContent = nomeDocumento || "Documento sem titulo";

socket.emit("selecionar_documento", nomeDocumento);

botaoExcluir.addEventListener("click", () => {
    socket.emit("excluir_documento", nomeDocumento);
});

textoEditor.addEventListener("keyup", () => {
    socket.emit('texto_editor', {texto: textoEditor.value, nomeDocumento: nomeDocumento}); //evento emitido para o servidor
});

socket.on('texto_documento', (texto) => {
    textoEditor.value = texto;
});

socket.on('texto_editor_clientes', (texto) => { //escutando o evento do servior
    textoEditor.value = texto;
});

socket.on("excluir_documento_sucesso", (nome) => {
    
    if( nome === nomeDocumento){
        alert(`Documento ${nome} excluido`);
        window.location.href = "/";
    }
        
    
}); 






