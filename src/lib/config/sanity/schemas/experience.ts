import { defineType } from 'sanity';
import { BriefcaseIcon } from 'lucide-react';

export default defineType({
	name: 'experience',
	title: 'Experience',
	type: 'document',
	icon: BriefcaseIcon,
	fields: [
		{
			name: 'title',
			description: 'Job title.',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required()
		},
		{
			name: 'company',
			title: 'Company',
			type: 'reference',
			to: [{ type: 'company' }],
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
			description: 'Leave blank if current job.',
			type: 'date'
		},
		{
			name: 'description',
			title: 'Description',
			type: 'array',
			of: [{ type: 'block' }]
		},
		{
			name: 'skills',
			title: 'Skills',
			type: 'array',
			of: [
				{
					type: 'string',
					options: {
						list: [
							// Languages
							{ title: 'JavaScript', value: 'javascript' },
							{ title: 'TypeScript', value: 'typescript' },
							{ title: 'HTML', value: 'html' },
							{ title: 'CSS', value: 'css' },
							{ title: 'Python', value: 'python' },
							{ title: 'Java', value: 'java' },
							{ title: 'C#', value: 'csharp' },
							// Frameworks
							{ title: 'React', value: 'react' },
							{ title: 'Next.js', value: 'nextjs' },
							{ title: 'Svelte', value: 'svelte' },
							{ title: 'SvelteKit', value: 'sveltekit' },
							{ title: 'Angular', value: 'angular' },
							{ title: 'Node.js', value: 'nodejs' },
							{ title: 'Express', value: 'express' },
							{ title: 'NestJS', value: 'nestjs' },
							// Style Libraries
							{ title: 'SCSS', value: 'scss' },
							{ title: 'Tailwind CSS', value: 'tailwindcss' },
							{ title: 'Material UI', value: 'materialui' },
							{ title: 'Headless UI', value: 'headlessui' },
							// Databases
							{ title: 'MongoDB', value: 'mongodb' },
							{ title: 'PostgreSQL', value: 'postgresql' },
							{ title: 'Redis', value: 'redis' },
							// Tools
							{ title: 'GraphQL', value: 'graphql' },
							{ title: 'Apollo', value: 'apollo' },
							// Cloud
							{ title: 'AWS', value: 'aws' },
							{ title: 'Docker', value: 'docker' },
							{ title: 'Podman', value: 'podman' },
							{ title: 'Terraform', value: 'terraform' },
							{ title: 'Ansible', value: 'ansible' },
							{ title: 'Kubernetes', value: 'kubernetes' },
							{ title: 'Microservices', value: 'microservices' },
							// OS
							{ title: 'Linux', value: 'linux' },
							{ title: 'Ubuntu', value: 'ubuntu' },
							{ title: 'Manjaro', value: 'manjaro' },
							{ title: 'Windows', value: 'windows' },
							// Other
							{ title: 'Git', value: 'git' },
							{ title: 'GitHub', value: 'github' },
							{ title: 'GitLab', value: 'gitlab' },
							{ title: 'DevOps', value: 'devops' },
							{ title: 'CI/CD', value: 'cicd' }
						]
					}
				}
			]
		}
	]
});
