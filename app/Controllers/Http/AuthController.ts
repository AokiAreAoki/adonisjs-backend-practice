// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { string } from '@ioc:Adonis/Core/Helpers'

// export default class AuthController
// {
//   public async login({ request, response, auth }: HttpContextContract)
//   {
//     const data = await request.validate(AuthLoginValidator)
//     const loginField = data.email ? 'email' : 'username'

//     let authorization: Record<string, string>

//     authorization = await auth.attempt(data[loginField]!, data.password)
//     authorization.type = string.pascalCase(authorization.type)

//     response
//       .header('Authorization', `${authorization.type} ${authorization.token}`)
//       .noContent()
//   }

//   public async logout({ response, auth }: HttpContextContract)
//   {
//     await auth.logout()

//     response.noContent()
//   }

//   public async refresh({ response, auth }: HttpContextContract)
//   {
//     const user = auth.user!

//     await auth.logout()

//     const authorization = await auth.login(user)

//     authorization.type = string.pascalCase(authorization.type)

//     response
//       .header('Authorization', `${authorization.type} ${authorization.token}`)
//       .noContent()
//   }
// }
