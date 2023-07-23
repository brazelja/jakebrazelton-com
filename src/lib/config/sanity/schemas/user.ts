import { defineType } from 'sanity';
import { UserIcon } from 'lucide-react';

export default defineType({
	name: 'user',
	title: 'User',
	icon: UserIcon,
	type: 'document',
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'picture',
			title: 'Picture',
			type: 'image',
			options: { hotspot: true }
		},
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'bio',
			title: 'Bio',
			type: 'array',
			of: [{ type: 'block' }]
		},
		{
			name: 'email',
			title: 'Email',
			type: 'email',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'phone',
			title: 'Phone',
			type: 'string',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'address',
			title: 'Address',
			type: 'address'
		},
		{
			name: 'links',
			title: 'Links',
			type: 'object',
			fields: [
				{
					name: 'github',
					title: 'GitHub',
					type: 'url'
				},
				{
					name: 'linkedin',
					title: 'LinkedIn',
					type: 'url'
				}
			]
		},
		{
			name: 'interests',
			title: 'Interests',
			type: 'array',
			of: [{ type: 'string' }]
		},
		{
			name: 'languages',
			title: 'Languages',
			type: 'array',
			of: [{ type: 'language' }]
		}
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'title',
			media: 'picture'
		}
	}
});
