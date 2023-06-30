import Route from '@ioc:Adonis/Core/Route';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import api from './api';

// Frontend
Route.get('/', async ({ response }) => {
	response.redirect('/home');
});

async function home({ request, auth }: HttpContextContract) {
	await auth.use('api').authenticate();

	// ✅ Request authenticated
	console.log('auth.user:', auth.user);

	const path = [ '/home' ];
	const params = request.params()['*'];
	if (params) path.push(...params);

	return `welcome to ${path.join('/')}`;
}

Route.get('/home', home);
Route.get('/home/*', home);

// API
api();
