import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthChecker {
	public async handle({ response, auth }: HttpContextContract, next: () => Promise<void>) {
		await auth.use('api').authenticate()

		if(auth.user){
			await next()
			return
		}

		response.unauthorized({ error: 'Invalid credentials' })
	}
}
