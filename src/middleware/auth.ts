// Importe les types Request, Response, et NextFunction du module Express
import { Request, Response, NextFunction } from "express";

// Importe la fonction verify du module jsonwebtoken pour vérifier un token
import { verify } from "jsonwebtoken";

// Importe le module dotenv pour charger les variables d'environnement depuis un fichier .env
import dotenv from "dotenv";

// Charge les variables d'environnement à partir du fichier .env
dotenv.config();

// Définit une fonction middleware nommée verifyToken qui vérifie la validité d'un token JWT
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Récupère le token du champ d'en-tête "Authorization" de la requête
  const token = req.headers.authorization;
  try {
    // Vérifie si le token existe
    if (token) {
      // Utilise la fonction verify pour vérifier la validité du token avec la clé secrète du serveur
      verify(token, process.env.JWT_KEY as string, (error) => {
        // S'il y a une erreur pendant la vérification
        if (error) {
          // Renvoie une réponse JSON avec un statut 503 (Service Unavailable) indiquant un token invalide
          res.status(503).json({ message: "TOKEN INVALID" });
        } else {
          // Passe à la fonction middleware suivante si le token est valide
          next();
        }
      });
    } else {
      // Renvoie une réponse JSON avec un statut 503 (Service Unavailable) indiquant l'absence de token
      res.status(503).json({ message: "Token non trouvé" });
    }
  } catch (error) {
    // Renvoie une réponse JSON avec un statut 500 (Internal Server Error) en cas d'erreur pendant l'exécution
    res
      .status(500)
      .json({ message: "Problème lors de la récupération du token" });
  }
};