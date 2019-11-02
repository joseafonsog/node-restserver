// Port
process.env.PORT = process.env.PORT || 3000

// Env
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// Token Expiration Time
process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;

// Authentication SEED
process.env.SEED = process.env.SEED ||  "this-is-the-seed-of-development";

// Database
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/coffee"
} else {
  urlDB = process.env.MONGODB_URI
}

process.env.URLDB = urlDB;