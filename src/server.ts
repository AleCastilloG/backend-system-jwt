import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema/index';
import { createServer, Server } from 'http';
import environments from './config/environments';
import { DotenvConfigOutput } from 'dotenv/types';
import cron from 'node-cron';
import Database from './config/database';

if (process.env.NODE_ENV !== 'production') {
	// para leer las variables de entorno
	const envs: DotenvConfigOutput = environments;
	console.log(envs);
}

async function init(): Promise<void> {
	const app: any = express();
	app.use('*', cors());
	app.use(compression());

	// configuration DB
	const database = new Database();
	const db = await database.init();

	// configuration context
	const context: any = async ({ req, connection }: any) => {
		// req : request => Sí no es nulo va hacer una petición HTTP, caso query o mutation
		// req => Si es nulo, no tiene cabeceras, no hace uso de esas solicitudes, tenemos que utilizar un connection y esa conexión lo vamos a obtener mediante la conexión a los webSockets
		const token = req ? req.headers.authorization : connection.authorization;
		return { db, token };
	};
	const server: ApolloServer = new ApolloServer({
		schema,
		context,
		introspection: true,
	});

	server.applyMiddleware({ app });

	const PORT: number | string = process.env.PORT || 5300;
	const httpServer: Server = createServer(app);

	httpServer.listen({ port: PORT }, () =>
		console.log(
			`Sistema de Autenticación JWT API GraphQL http://localhost:${PORT}/graphql`
		)
	);
}

init();

// execute cron job every 3 hours
cron.schedule('* */3 * * *', async () => {
	// configuration DB
	const database = new Database();
	const db = await database.init();

	db.collection('users').deleteMany({});
});
