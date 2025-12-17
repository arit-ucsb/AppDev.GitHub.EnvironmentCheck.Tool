# AppDev.GitHub.EnvironmentCheck.Tool

## Description
This action checks for the existence of GitHub environments in the calling repository.
If any of the specified environments do not exist, the action will fail, otherwise it will succeed.

It was created because the default GitHub behavior is to create environments on-the-fly when they are referenced in a workflow.
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
        uses: arit-ucsb/AppDev.GitHub.EnvironmentCheck.Tool@v1 # (or the latest version)
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          # List the required environments here, one per line
          environment-names: |
            development
            staging
            production

  deploy:
    needs: check-environments
    ... # Your deployment job here
```

## Development
Modify the code in the `src` folder, and run `npm ci`, `npm run build` to compile the project before testing or releasing.

## License
Copyright Regents of the University of California

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
