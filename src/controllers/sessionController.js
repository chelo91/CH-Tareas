/*import UsersManager from '../dao/mongo/users.model.js';
import { sucessMessage, errorMessage, sucessMessageCreate, sucessMessageUpdate, sucessMessageDelete } from '../helper/utilsResponse.js';
import { hashPassword, comparePasswords } from '../helper/utilsPassword.js';

const register = async (req, res) => {
	try {
		const usersManager = new UsersManager();

		const { first_name, last_name, email, birth_date, password } = req.body;
		if (first_name === undefined || last_name === undefined || email === undefined || birth_date === undefined || password === undefined) {
			return res.redirect('/register');
		}
		const newUser = { first_name, last_name, email, birth_date, password };
		newUser.birth_date = new Date(birth_date);
		newUser.password = hashPassword(password);
		const user = await usersManager.addUser(newUser);
		if (!user) {
			return res.redirect('/register');
		}

		req.session.user = {
			id: user._id,
			email: user.email,
			first_name: user.first_name,
			last_name: user.last_name,
			birth_date: user.birth_date,
			role: user.role
		};
		return res.redirect('/');
	} catch (e) {
		return res.redirect('/register');
	}
};
/*const login = async (req, res) => {
	try {
		const usersManager = new UsersManager();

		const email = req.body.email;
		const password = req.body.password;

		if (email === undefined || password === undefined) {
			return res.redirect('/login');
		}
		const user = await usersManager.getUserByEmail(email);
		if (!user) {
			return res.redirect('/login');
		}
		if (!comparePasswords(password, user.password)) {
			return res.redirect('/login');
		}

		req.session.user = {
			id: user._id,
			email: user.email,
			first_name: user.first_name,
			last_name: user.last_name,
			birth_date: user.birth_date,
			role: user.role
		};
		return res.redirect('/');
	} catch (e) {
		return res.status(500).json(errorMessage(e.message));
	}
};

export { register, login };*/