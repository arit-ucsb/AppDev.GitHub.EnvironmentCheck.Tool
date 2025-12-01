import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    // Get the input: list of environment names (one per line)
    const environmentNamesInput = core.getInput('environment-names', { required: true });
    const environmentNames = environmentNamesInput
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (environmentNames.length === 0) {
      core.setFailed('No environment names provided');
      return;
    }

    core.info(`Checking for environments: ${environmentNames.join(', ')}`);

    const { owner, repo } = github.context.repo;
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      core.setFailed('GITHUB_TOKEN is not set. Please ensure the action has access to a GitHub token.');
      return;
    }

    const octokit = github.getOctokit(token);

    let environments = [];
    try {
      const response = await octokit.rest.repos.getAllEnvironments({ owner, repo });
      environments = response.data.environments.map(env => env.name);
      core.info(`Found ${environments.length} environment(s) in the repository`);
    } catch (error) {
      core.setFailed(`Failed to fetch environments: ${error.message}`);
      return;
    }

    const missingEnvironments = environmentNames.filter(
      envName => !environments.includes(envName)
    );
    if (missingEnvironments.length > 0) {
      core.setFailed(
        `The following environment(s) are missing: ${missingEnvironments.join(', ')}`
      );
    } else {
      core.info('All required environments are present');
    }
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
