const joi = require('@hapi/joi');

const userAPI = joi.object({
	fullName: joi.string()
		.required()
		.min(4)
		.alphanum(),

	email: joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

	_id: joi.string()
		.alphanum()
		.min(16)
})
	.xor('_id', 'email')
	.without('_id', 'email');

module.exports = { userAPI };