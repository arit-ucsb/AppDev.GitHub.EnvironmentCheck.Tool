# AppDev.GitHub.EnvironmentCheck.Tool

## Description
This action checks for the existence of GitHub environments in the calling repository.
If any of the specified environments do not exist, the action will fail, otherwise it will succeed.

It was created becuase the default GitHub behavior is to create environments on-the-fly when they are referenced in a workflow.
This isn't necessarily suitable, because environments are often used to enforce specific deployment policies,
and creating them automatically will bypass these policies.

If you have a one-off workflow to guard, it's utility is limited because it's easier just to manually configure the environments
appropriately while you're thinking of it. However, it can be useful in a reusable workflow or template scenario
where all consuming projects automatically make use of the guarded workflow.

## Usage
To use this action, include it in your GitHub Actions workflow as follows:

```yaml
jobs:
  check-environments:
    runs-on: ubuntu-latest # (or the runner of your choice)
    steps:
      - name: Check Environments
        uses: arit-ucsb/AppDev.GitHub.EnvironmentCheck.Tool@AWEBAPPS-7697
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          # List the required environments here, one per line
          environments: |
            development
            staging
            production

  deploy:
    needs: check-environments
    ... # Your deployment job here
```
