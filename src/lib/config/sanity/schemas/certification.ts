import { defineType } from 'sanity';
import { ScrollTextIcon } from 'lucide-react';

export default defineType({
	name: 'certification',
	title: 'Certification',
	type: 'document',
	icon: ScrollTextIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required()
		},
		{
			name: 'date',
			title: 'Date',
			description: 'Date of certification.',
			type: 'date',
			validation: (rule) => rule.required()
		},
		{
			name: 'description',
			title: 'Description',
			type: 'string'
		},
		{
			name: 'link',
			title: 'Link',
			description: 'Link to certification.',
			type: 'url'
		}
	]
});
