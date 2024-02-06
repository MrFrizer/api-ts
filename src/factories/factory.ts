// Importe les interfaces et les entités nécessaires depuis les fichiers correspondants
import { User } from "../interfaces/interface";
import { UserClass } from "../Entities/entity";

// Importe les types Request et Response du module Express
import { Request, Response } from "express";

// Définit une classe statique UserFactory
export class UserFactory {
  // Définit une méthode statique exportUser prenant une requête (Request) et une réponse (Response)
  static exportUser = (req: Request, res: Response) => {
    // Crée un objet User en utilisant la méthode createUser de la classe UserFactory2 avec les données de la requête
    const data: User = UserFactory2.createUser(
      req.body.username,
      req.body.mail,
      req.body.password,
      req.body.nom,
      req.body.prenom,
      req.body.adresse,
      req.body.admin
    );
    // Retourne l'objet User créé
    return data;
  };
}

// Définit une deuxième classe statique UserFactory2
export class UserFactory2 {
  // Définit une méthode statique createUser prenant plusieurs paramètres pour créer et retourner un nouvel utilisateur
  static createUser(
    username: string,
    mail: string,
    password: string,
    nom: string,
    prenom: string,
    adresse: string,
    admin: string
  ) {
    // Crée une instance de la classe UserClass (entité représentant un utilisateur)
    const newUser = UserClass.getInstance();

    // Initialise les propriétés de l'utilisateur avec les valeurs fournies en paramètres
    newUser.setUsername(username);
    newUser.setMail(mail);
    newUser.setPassword(password);
    newUser.setNom(nom);
    newUser.setPrenom(prenom);
    newUser.setAdresse(adresse);
    newUser.setAdmin(); // Appelle une méthode pour définir le statut administrateur de l'utilisateur

    // Retourne le nouvel utilisateur créé
    return newUser;
  }
}
