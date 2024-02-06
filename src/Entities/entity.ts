// Définit une classe UserClass représentant une entité utilisateur
export class UserClass {
  // Déclare une propriété statique pour stocker l'unique instance de la classe
  private static instance: UserClass;

  // Déclare et initialise les propriétés publiques de l'utilisateur
  public nom: string = "";
  public prenom: string = "";
  public username: string = "";
  public mail: string = "";
  public password: string = "";
  public adresse: string = "";
  public admin: string = "";

  // Déclare un constructeur privé qui affiche un message dans la console lorsqu'il est appelé
  private constructor() {
    console.log("Constructer");
  }

  // Définit une méthode statique pour obtenir l'instance unique de la classe
  public static getInstance(): UserClass {
    // Si aucune instance n'existe, crée une nouvelle instance
    if (!UserClass.instance) {
      UserClass.instance = new UserClass();
    }
    // Retourne l'instance existante ou nouvellement créée
    return UserClass.instance;
  }

  // Définit des méthodes pour définir et obtenir le nom d'utilisateur
  setUsername(newUsername: string) {
    this.username = newUsername.trim();
  }
  getUsername(): string {
    return this.username;
  }

  // Définit des méthodes pour définir et obtenir le mot de passe
  setPassword(newPassword: string) {
    this.password = newPassword;
  }
  getPassword(): string {
    return this.password;
  }

  // Définit des méthodes pour définir et obtenir le nom
  setNom(newNom: string) {
    this.nom = newNom.trim();
  }
  getNom(): string {
    return this.nom;
  }

  // Définit des méthodes pour définir et obtenir le prénom
  setPrenom(newPrenom: string) {
    this.prenom = newPrenom;
  }
  getPrenom(): string {
    return this.prenom;
  }

  // Définit des méthodes pour définir et obtenir l'adresse e-mail
  setMail(newMail: string) {
    this.mail = newMail;
  }
  getMail(): string {
    return this.mail;
  }

  // Définit des méthodes pour définir et obtenir l'adresse
  setAdresse(newAdresse: string) {
    this.adresse = newAdresse;
  }
  getAdresse(): string {
    return this.adresse;
  }

  // Définit une méthode pour définir le statut administrateur à "false"
  setAdmin() {
    this.admin = "false";
  }
  // Définit une méthode pour obtenir le statut administrateur
  getAdmin(): string {
    return this.admin;
  }
}
