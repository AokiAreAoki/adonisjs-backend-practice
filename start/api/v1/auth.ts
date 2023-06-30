import Route from '@ioc:Adonis/Core/Route'
import UserModel from '../../../app/Models/User'
import { userSchema } from '../../../app/Schemas/UserSchema'
import { InvalidCredentialsException } from '@adonisjs/auth/build/src/Exceptions/InvalidCredentialsException'

export default function auth() {
	Route.group(() => {
		Route.post('register', async ({ request, response, auth }) => {
			const userData = await request.validate({ schema: userSchema })

			const user = await UserModel.create(userData)

			await auth.login(user)

			return response.redirect('/home')
		})

		Route.post('/login', async ({ request, response, auth }) => {
			const { uid, password, rememberMe } = request.only([ 'uid', 'password', 'rememberMe' ])

			console.log({
				uid,
				password,
				rememberMe,
			})

			try {
				return await auth.use('api').attempt(uid, password)
			} catch (error) {
				console.log(error.constructor)
				let errorText = 'Unknown error'

				if (error instanceof InvalidCredentialsException) {
					response.status(401)
					errorText = 'Unauthorized'
				} else {
					console.log(error)
					response.status(500)
					errorText = 'Internal server error'
				}

				return {
					error: errorText,
				}
			}
		})

		Route.post('/logout', async ({ auth }) => {
			// Revoke the user's authentication token
			await auth.use('api').revoke()

			// Return a response
			return {
				success: true,
				message: 'Logged out successfully',
			}
		})
	}).prefix('/auth')
}
