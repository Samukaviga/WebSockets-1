import { MongoClient } from "mongodb";

const cliente = new MongoClient("mongodb+srv://Alura:123@alura.lzjciqx.mongodb.net/");


let documentosColecao;

try{

    await cliente.connect();

    const db = cliente.db("alura-websockets"); //nome do banco de dados
    documentosColecao = db.collection("documentos"); //nome da colecao/tabela

    console.log("Conectado ao banco de dados com sucesso!");

}catch(erro){
    console.log(erro);
}

export { documentosColecao };