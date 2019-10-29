// Port
process.env.PORT = process.env.PORT || 3000

// Env
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// Database
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/coffee"
} else {
  urlDB = "mongodb+srv://jaag65:Konhj6BCwXGQcM0P@cluster0-5exgp.mongodb.net/coffee"
}

process.env.URLDB = urlDB;