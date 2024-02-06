// Définit une interface User représentant la structure d'un objet utilisateur
export interface User {
  // string = chaine de caractère
  nom: string;       // Champ pour le nom de l'utilisateur
  prenom: string;    // Champ pour le prénom de l'utilisateur
  username: string;  // Champ pour le nom d'utilisateur (identifiant)
  mail: string;      // Champ pour l'adresse e-mail de l'utilisateur
  password: string;  // Champ pour le mot de passe de l'utilisateur
  adresse: string;   // Champ pour l'adresse de l'utilisateur
  admin: string;     // Champ pour indiquer le statut d'administrateur de l'utilisateur
}