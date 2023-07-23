import { defineType } from 'sanity';
import { GraduationCapIcon } from 'lucide-react';

export default defineType({
	name: 'education',
	title: 'Education',
	type: 'document',
	icon: GraduationCapIcon,
	fields: [
		{
			name: 'school',
			title: 'School',
			type: 'string',
			validation: (rule) => rule.required()
		},
		{
			name: 'degree',
			title: 'Degree',
			type: 'string',
			validation: (rule) => rule.required()
		},
		{
			name: 'startDate',
			title: 'Start Date',
			type: 'date',
			validation: (rule) => rule.required()
		},
		{
			name: 'endDate',
			title: 'End Date',
			description: 'Leave blank if still attending.',
			type: 'date'
		},
		{
			name: 'note',
			title: 'Note',
			type: 'string'
		}
	]
});
