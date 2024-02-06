// Importe le module Bcrypt pour le hachage des mots de passe
import bcrypt from "bcrypt";

// Importe les fonctions du modèle (accès aux données)
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../model/model";

// Importe les types Request et Response du module Express
import { Request, Response } from "express";

// Importe la fonction 'sign' de JsonWebToken pour générer des jetons JWT
import { sign } from "jsonwebtoken";

// Importe l'interface User
import { User } from "../interfaces/interface";

// Importe le module dotenv pour charger les variables d'environnement
import dotenv from "dotenv";
import { UserFactory } from "../factories/factory";

// Charge les variables d'environnement à partir du fichier .env
dotenv.config();

// Définit une fonction pour obtenir tous les utilisateurs
export const getAllUserC = async (req: Request, res: Response) => {
  try {
    // Appelle la fonction du modèle pour récupérer tous les utilisateurs de la base de données
    const allUserdb = await getAllUsers();
    // Renvoie la liste des utilisateurs en réponse
    res.status(200).json(allUserdb);
  } catch (error) {
    // Gère les erreurs et renvoie une réponse appropriée en cas d'échec
    res.status(500).json({ error: "Impossible de récupérer les Utilisateurs" });
  }
};

// Définit une fonction pour obtenir un utilisateur par son identifiant
export const getUserByIdC = async (req: Request, res: Response) => {
  try {
    // Récupère l'identifiant de l'utilisateur depuis les paramètres de la requête
    const id: number = parseInt(req.params.id);
    // Appelle la fonction du modèle pour récupérer l'utilisateur spécifié par son identifiant
    const Userdb = await getUserById(id);
    // Renvoie l'utilisateur en réponse
    res.status(200).json(Userdb);
  } catch (error) {
    // Gère les erreurs et renvoie une réponse appropriée en cas d'échec
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Définit une fonction pour créer un nouvel utilisateur
export const createUserC = async (req: Request, res: Response) => {
  try {
    // Utilise la méthode exportUser de UserFactory pour créer un objet User à partir des données de la requête
    const data: User = UserFactory.exportUser(req, res);
    // Utilise Bcrypt pour hacher le mot de passe avant de l'enregistrer dans la base de données
    await bcrypt.hash(data.password, 10).then((passwordHashed) => {
      data.password = passwordHashed;
      // Appelle la fonction du modèle pour créer l'utilisateur dans la base de données
      createUser(data);
      // Renvoie une réponse indiquant le succès de la création de l'utilisateur
      res.status(201).json({ message: "User créé avec succès" });
    });
  } catch (error) {
    // Gère les erreurs et renvoie une réponse appropriée en cas d'échec
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Définit une fonction pour mettre à jour un utilisateur existant
export const updateUserC = async (req: Request, res: Response) => {
  try {
    // Récupère l'identifiant de l'utilisateur depuis les paramètres de la requête
    const id: number = parseInt(req.params.id);
    // Crée un objet User avec les données de la requête
    const data: User = {
      username: req.body.username,
      mail: req.body.mail,
      password: req.body.password,
      nom: req.body.nom,
      prenom: req.body.prenom,
      adresse: req.body.adresse,
      admin: req.body.admin,
    };
    // Utilise Bcrypt pour hacher le mot de passe avant de le mettre à jour dans la base de données
    await bcrypt.hash(data.password, 10).then((passwordHashed) => {
      data.password = passwordHashed;
      // Appelle la fonction du modèle pour mettre à jour l'utilisateur dans la base de données
      updateUser(id, data);
      // Renvoie une réponse indiquant le succès de la mise à jour de l'utilisateur
      res.status(200).json({ message: "User mis à jour avec succès" });
    });
  } catch (error) {
    // Gère les erreurs et renvoie une réponse appropriée en cas d'échec
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Définit une fonction pour supprimer un utilisateur
export const deleteUserC = async (req: Request, res: Response) => {
  try {
    // Récupère l'identifiant de l'utilisateur depuis les paramètres de la requête
    const id: number = parseInt(req.params.id);
    // Appelle la fonction du modèle pour supprimer l'utilisateur de la base de données
    await deleteUser(id);
    // Renvoie une réponse indiquant le succès de la suppression de l'utilisateur
    res.status(204).json({ message: "User supprimé avec succès" });
  } catch (error) {
    // Gère les erreurs et renvoie une réponse appropriée en cas d'échec
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
