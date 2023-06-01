import { adicionarDocumento, atualizaDocumento, encontrarDocumento, excluirDocumento, obterDocumentos } from "./documentosDb.js";
import io from "./servidor.js";


io.on("connection", (socket) => {
  //  console.log("Um cliente se conectou! ID: " + socket.id);

    socket.on("obter_documentos", async (devolverDocumentos) => { 
        const documentos = await obterDocumentos();

        devolverDocumentos(documentos);
    });

    socket.on("adicionando_documento", async (nomeDocumento) => {
        const documentoExiste = (await encontrarDocumento(nomeDocumento)) !== null;

        if(documentoExiste){
            socket.emit("documento_existente", nomeDocumento);
        } else {

            const resultado = await adicionarDocumento(nomeDocumento);
                
            if (resultado.acknowledged){
                socket.emit("adicionar_documento_interface", nomeDocumento);
            }
        }
        });

    socket.on("selecionar_documento", async (nomeDocumento) => {
        socket.join(nomeDocumento); //pega este documento e coloca em uma sala do socket com nome do documento
        
        const documento = await encontrarDocumento(nomeDocumento);

        if(documento) {
            socket.emit("texto_documento", documento.texto);
        }

    });

    socket.on("texto_editor", async ({texto, nomeDocumento}) => { //servidor escutando o evento
      //  socket.broadcast.emit("texto_editor_clientes", texto); //envia para todos clientes menos para o que esta conectado a este socket
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);

        if(atualizacao.modifiedCount) {
            
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto); //to referencia a sala para qual o texto sera enviado
        };
    });

    socket.on("disconnect", (motivo) => {
     //   console.log(`Cliente se desconectou. Motivo: ${motivo}`);
    });

    socket.on("excluir_documento", async (nomeDocumento) => {
        const resultado = await excluirDocumento(nomeDocumento);

        if(resultado.deletedCount){
            io.emit("excluir_documento_sucesso", nomeDocumento);
        }
    });
});


