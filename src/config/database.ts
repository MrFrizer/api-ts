//Import de mysql
import mysql from "mysql";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    // j'ai utilisé la bdd du projet car au moins elle fonctionne avec l'API que j'ai refaite
    database: "appbancaire"
});

// export simple devant la constante ne suffisait pas, ni module.export.
export default connection;
