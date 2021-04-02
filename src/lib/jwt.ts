import { SECRET_KEY } from "../config/constants";
import jwt from "jsonwebtoken";

class JWT {
  private secretKey = SECRET_KEY as string;

  sign(data: any): string {
    return jwt.sign({ user: data.user }, this.secretKey, {
      expiresIn: "24h",
    });
  }

  verify(token: string): string {
    try {
      return jwt.verify(token, this.secretKey) as string;
    } catch (error) {
      return "La autenticación del token es inválida. Por favor, inicia sesión para obtener un nuevo token";
    }
  }
}

export default JWT;
