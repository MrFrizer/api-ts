// Importe le module Express pour créer un routeur
import express from "express";
// Importe les fonctions de contrôleur pour gérer les différentes opérations sur les utilisateurs
import {
  getAllUserC,
  getUserByIdC,
  createUserC,
  updateUserC,
  deleteUserC,
} from "../controller/controller";
// Importe la fonction verifyToken depuis le middleware "auth"
import { verifyToken } from "../middleware/auth";
// Crée un routeur Express
const router = express.Router();

// Exporte le routeur pour qu'il puisse être utilisé ailleurs dans l'application
module.exports = router;

// Route GET pour récupérer tous les utilisateurs
router.get("/all", getAllUserC);
// Route GET pour récupérer un utilisateur par son identifiant
router.get("/one/:id", getUserByIdC);
// Route POST pour créer un nouvel utilisateur
router.post("/create", createUserC);
// Route PUT pour mettre à jour un utilisateur par son identifiant
router.put("/update/:id", updateUserC);
// Route DELETE pour supprimer un utilisateur par son identifiant
router.delete("/delete/:id", deleteUserC);