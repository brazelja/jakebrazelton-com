import { defineType } from 'sanity';
import { Building2Icon } from 'lucide-react';

export default defineType({
	name: 'company',
	title: 'Company',
	type: 'document',
	icon: Building2Icon,
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (rule) => rule.required()
		},
		{
			name: 'logo',
			title: 'lOGO',
			type: 'image',
			options: { hotspot: true },
			validation: (Rule) => Rule.required()
		},
		{
			name: 'website',
			title: 'Website',
			type: 'url',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'address',
			title: 'Address',
			type: 'address'
		}
	]
});
