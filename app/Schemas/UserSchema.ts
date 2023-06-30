import { schema, rules } from "@ioc:Adonis/Core/Validator";

export const userSchema = schema.create({
	name: schema.string(
		{ trim: true },
		[],
	),

	surname: schema.string(
		{ trim: true },
		[],
	),

	email: schema.string(
		{ trim: true },
		[
			rules.email(),
			rules.unique({
				table: 'users',
				column: 'email',
				caseInsensitive: true,
			}),
		],
	),

	login: schema.string(
		{ trim: true },
		[
			rules.unique({
				table: 'users',
				column: 'login',
				caseInsensitive: true,
			})
		]
	),

	password: schema.string(
		{},
		[
			rules.minLength(8),
		],
	)
});
