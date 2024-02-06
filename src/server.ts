// Importe le middleware "cors" pour gérer les problèmes de CORS
import cors from "cors";
// Importe les modules nécessaires d'Express pour construire le serveur
import express, { Request, Response, Application } from "express";
// Importe l'interface ApiResponse définie dans le fichier api-interface.ts
import { ApiResponse } from "./interfaces/api-interface";
// Importe le fichier de configuration de la base de données
import connection from "./config/database";
// Importe le module dotenv pour charger les variables d'environnement depuis un fichier .env
import dotenv from "dotenv";

// Initialise l'application Express
const app: Application = express();
// Définit le port sur lequel l'application fonctionnera, avec une valeur par défaut de 3000
const PORT: number | string = process.env.PORT || 3000;
// Importe les routes pour la gestion des utilisateurs
const usersRoutes = require("./routes/route");

// Utilise le middleware cors pour gérer les autorisations CORS
app.use(cors());
// Utilise le middleware intégré pour gérer les données JSON dans les requêtes
app.use(express.json());
// Utilise le middleware intégré pour gérer les données encodées dans les requêtes
app.use(express.urlencoded({ extended: true }));
// Charge les variables d'environnement à partir du fichier .env
dotenv.config();

// Établit la connexion à la base de données
connection.connect((error) => {
  if (error) throw error;
  console.log("Vous êtes bien connecté à la base de donnée");
});

// Utilise les routes définies pour les utilisateurs
app.use("/users", usersRoutes);

// Définit une route pour la racine de l'API qui renvoie un message de réussite
app.get("/", (req: Request, res: Response<ApiResponse>, next) => {
  const response: ApiResponse = {
    message: "votre API marche avec Node JS et Type Script",
    timestamp: new Date(),
  };
  res.status(200).json(response);
});

// Met en écoute l'application sur le port spécifié et affiche un message lorsque le serveur démarre
app.listen(PORT, () => {
  console.log(`L'Api tourne sur le PORT ${PORT}`);
});
