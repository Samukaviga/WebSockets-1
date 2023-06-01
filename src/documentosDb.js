import { documentosColecao } from "./dbConnect.js";

function obterDocumentos(){
    const documentos = documentosColecao.find().toArray();
    return documentos;
}

function adicionarDocumento(nomeDocumento){
    const resultado = documentosColecao.insertOne({ //metodo do MongoDB
        nome : nomeDocumento,
        texto : ""
    });

    return resultado;
}

function encontrarDocumento(nome){
    const documento = documentosColecao.findOne({ //metodo do MongoDB
        nome: nome
    });

    return documento;
}

function atualizaDocumento(nomeDocumento, texto){

    const atualizacao = documentosColecao.updateOne({ //metodo do MongoDB
        nome: nomeDocumento
    }, { //este segundo obj fala pro mongo oq ele quer que o mongo faça
        $set: { //fala pro mongo preparar, assim ele atualiza o texto
            texto: texto
        }
    });

    return atualizacao;

}

function excluirDocumento(nomeDocumento){
    const resultado = documentosColecao.deleteOne({ //metodo do MongoDB
        nome : nomeDocumento
    });

    return resultado;
}


export { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento };