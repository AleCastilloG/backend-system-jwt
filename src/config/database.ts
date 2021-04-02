import MongoClient, { Db } from "mongodb";
import chalk from "chalk";

class Database {
  async init(): Promise<Db> {
    const MONGODB = String(process.env.DATABASE);
    const client = await MongoClient.connect(MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = await client.db();

    if (client.isConnected()) {
      console.log("=========DATABASE=========");
      console.log(`STATUS: ${chalk.greenBright("ONLINE")}`);
      console.log(`DATABASE: ${chalk.greenBright(db.databaseName)}`);
    }

    return db;
  }
}

// ya podemos hacer uso de esta clase en cualquier punto de nuestra API
export default Database;
