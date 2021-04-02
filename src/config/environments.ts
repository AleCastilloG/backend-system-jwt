import dotenv from "dotenv";
// leer las variables de entorno
const environments: dotenv.DotenvConfigOutput = dotenv.config({
  path: "./src/.env",
});

if (process.env.NODE_ENV !== "production") {
  if (environments.error) {
    throw environments.error;
  }
}

// exportar por default es para poder tenerlo desde cualquier lugar
export default environments;
