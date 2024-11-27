import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento das imagens enviadas pelo formulário
const storage = multer.diskStorage({
    // Define o diretório de destino para as imagens
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo no servidor
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Cria uma instância do multer com a configuração de armazenamento definida
const upload = multer({ dest: "./uploads", storage });

// Define as rotas usando o objeto Express app
const routes = (app) => {
    // Permite que o servidor interprete dados enviados no formato JSON
    app.use(express.json());

    app.use(cors(corsOptions))

    // Rota para listar todos os posts
    app.get("/posts", listarPosts);

    // Rota para criar um novo post
    app.post("/posts", postarNovoPost);

    // Rota para upload de imagens
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;

