import { IResolvers } from 'graphql-tools';
import { Db } from 'mongodb';
import { Datetime } from '../lib/datetime';
import bcryptjs from 'bcryptjs';

// proporciona las respuestas a los query que le hemos definido
const mutation: IResolvers = {
	Mutation: {
		async register(
			_: void,
			{ user },
			{ db }: { [db: string]: Db }
		): Promise<any> {
			const userCheck = await db
				.collection('users')
				.findOne({ email: user.email });

			if (userCheck !== null) {
				return {
					status: false,
					message: `Usuario NO registrado porque ya existe el usuario ${user.email}`,
					user: null,
				};
			}

			// -1 de manera ascendente, 1 de manera descendente
			const lastUser = await db
				.collection('users')
				.find()
				.limit(1)
				.sort({ registerDate: -1 })
				.toArray();

			if (lastUser.length === 0) {
				user.id = 1;
			} else {
				user.id = lastUser[0].id + 1;
			}

			user.password = bcryptjs.hashSync(user.password, 10);
			// obtener la fecha actual
			user.registerDate = new Datetime().getCurrentDateTime();

			// insert a element
			return await db
				.collection('users')
				.insertOne(user)
				.then((result: any) => {
					return {
						status: true,
						message: `Usuario ${user.name} ${user.lastname} añadido correctamente`,
						user,
					};
				})
				.catch((err: any) => {
					return {
						status: false,
						message: 'Usuario No añadido correctamente',
						user: null,
					};
				});
		},
	},
};

export default mutation;
