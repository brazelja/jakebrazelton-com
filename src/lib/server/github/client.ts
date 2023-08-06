import { Octokit } from 'octokit';

import { GITHUB_ACCESS_TOKEN } from '$env/static/private';

const octokit = new Octokit({
  auth: GITHUB_ACCESS_TOKEN
});

const REPOS = ['sveltejs/kit', 'solidjs/solid', 'radix-ui/primitives', 'shadcn-ui/ui'];

export const githubClient = {
  getRepos: async () => {
    const repos = await Promise.all(
      REPOS.map(async (repo) =>
        octokit.rest.repos
          .get({
            owner: repo.split('/')[0],
            repo: repo.split('/')[1]
          })
          .then((res) => res.data)
      )
    );

    return repos;
  },
  getStarredRepos: async () => {
    const repos = await octokit.rest.activity
      .listReposStarredByUser({
        username: 'brazelja',
        per_page: 10
      })
      .then((res) => res.data)
      .then((data) =>
        data.map((repo) => {
          if (repo.starred_at) return (repo as Extract<typeof repo, { starred_at: string }>).repo;
          return repo as Extract<typeof repo, { id: number }>;
        })
      );

    return repos;
  }
};
