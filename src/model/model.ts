// Importe la connexion à la base de données depuis le fichier de configuration du dossier ../config/
import connection from "../config/database";
// Importe l'interface User depuis le fichier d'interface
import { User } from "../interfaces/interface";

// Fonction pour obtenir tous les utilisateurs de la base de données
// Définit une fonction exportée nommée getAllUsers qui retourne une promesse
export const getAllUsers = (): Promise<User[]> => {
  // Retourne une nouvelle promesse qui prend deux fonctions de rappel : resolve et reject
  return new Promise((resolve, reject) => {
    // Utilise la méthode query de l'objet connection pour exécuter une requête SQL SELECT
    connection.query(
      "SELECT `id`, `nom`, `prenom`, `username` FROM `user`",
      // Fonction de rappel exécutée une fois que la requête est terminée
      (error, rows, fields) => {
        // Vérifie s'il y a une erreur pendant l'exécution de la requête
        if (error) {
          // Affiche l'erreur dans la console
          console.error(error);
          // Rejette la promesse avec l'erreur
          reject(error);
        } else {
          // Transforme les résultats de la requête en un tableau JSON
          const usersDb = JSON.parse(JSON.stringify(rows));
          // Affiche le tableau d'utilisateurs dans la console
          console.log(usersDb);
          // Résout la promesse avec le tableau d'utilisateurs
          resolve(usersDb);
        }
      }
    );
  });
};

// Fonction pour obtenir un utilisateur par son identifiant
// Définit une fonction exportée nommée getUserById prenant un identifiant en paramètre
export const getUserById = (id: number): Promise<User> => {
  // Retourne une nouvelle promesse qui prend deux fonctions de rappel : resolve et reject
  return new Promise((resolve, reject) => {
    // Utilise la méthode query de l'objet connection pour exécuter une requête SQL SELECT avec une condition WHERE sur l'identifiant
    connection.query(
      `SELECT nom, prenom, username, mail, adresse FROM user WHERE id = ${id}`,
      // Fonction de rappel exécutée une fois que la requête est terminée
      (error, rows) => {
        // Vérifie s'il y a une erreur pendant l'exécution de la requête
        if (error) {
          // Affiche l'erreur dans la console
          console.error(error);
          // Rejette la promesse avec l'erreur
          reject(error);
        } else {
          // Affiche l'identifiant dans la console
          console.log(id);
          // Transforme les résultats de la requête en un objet JSON
          const userDb = JSON.parse(JSON.stringify(rows));
          // Affiche l'objet utilisateur dans la console
          console.log(userDb);
          // Résout la promesse avec l'objet utilisateur
          resolve(userDb);
        }
      }
    );
  });
};

// Fonction pour créer un nouvel utilisateur
// Définit une fonction exportée nommée createUser prenant un objet de type User en paramètre
export const createUser = (data: User): Promise<User> => {
  // Retourne une nouvelle promesse qui prend deux fonctions de rappel : resolve et reject
  return new Promise((resolve, reject) => {
    // Utilise la méthode query de l'objet connection pour exécuter une requête SQL INSERT INTO pour créer un nouvel utilisateur
    connection.query("INSERT INTO user SET ?", data, (error, results) => {
      // Vérifie s'il y a une erreur pendant l'exécution de la requête
      if (error) {
        // Affiche l'erreur dans la console
        console.error(error);
        // Rejette la promesse avec l'erreur
        reject(error);
      } else {
        // Affiche les résultats de la requête dans la console
        console.log(results);
        // Résout la promesse avec les résultats de la requête
        resolve(results);
      }
    });
  });
};

// Définit une fonction exportée nommée updateUser prenant un identifiant et un objet de type User en paramètres
export const updateUser = (id: number, data: User): Promise<User> => {
  // Retourne une nouvelle promesse qui prend deux fonctions de rappel : resolve et reject
  return new Promise((resolve, reject) => {
    // Utilise la méthode query de l'objet connection pour exécuter une requête SQL UPDATE pour mettre à jour un utilisateur par son identifiant
    connection.query(
      "UPDATE user SET ? WHERE id = ?",
      // Utilise un tableau pour spécifier les valeurs à mettre à jour et l'identifiant
      [data, id],
      // Fonction de rappel exécutée une fois que la requête est terminée
      (error, results) => {
        // Vérifie s'il y a une erreur pendant l'exécution de la requête
        if (error) {
          // Affiche l'erreur dans la console
          console.error(error);
          // Rejette la promesse avec l'erreur
          reject(error);
        } else {
          // Affiche les résultats de la requête dans la console
          console.log(results);
          // Résout la promesse avec les résultats de la requête
          resolve(results);
        }
      }
    );
  });
};

// Fonction pour supprimer un utilisateur par son identifiant
// Définit une fonction exportée nommée deleteUser prenant un identifiant en paramètre
export const deleteUser = (id: number): Promise<undefined> => {
  // Retourne une nouvelle promesse qui prend deux fonctions de rappel : resolve et reject
  return new Promise((resolve, reject) => {
    // Utilise la méthode query de l'objet connection pour exécuter une requête SQL DELETE pour supprimer un utilisateur par son identifiant
    connection.query(
      `DELETE FROM user WHERE id = ${id}`,
      // Fonction de rappel exécutée une fois que la requête est terminée
      (error, results) => {
        // Vérifie s'il y a une erreur pendant l'exécution de la requête
        if (error) {
          // Affiche l'erreur dans la console
          console.error(error);
          // Rejette la promesse avec l'erreur
          reject(error);
        } else {
          // Affiche les résultats de la requête dans la console
          console.log(results);
          // Résout la promesse avec les résultats de la requête (généralement, le nombre de lignes supprimées)
          resolve(results);
        }
      }
    );
  });
};