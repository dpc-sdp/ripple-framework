---
to: "<%= gitHubActions ? `.github/workflows/stale.yml` : null %>"
---
name: Stale PRs

on:
  schedule:
    - cron: '30 1 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v9
        with:
          repo-token: ${{secrets.GPR_NPM_INSTALL_TOKEN}}
          days-before-pr-stale: 60
          days-before-pr-close: 7
          stale-pr-message: 'This PR has been automatically marked as stale, it will be closed if no further activity occurs.'
          close-pr-message: 'This PR was automatically closed due to inactivity.'
          stale-pr-label: 'Stale'
          exempt-pr-labels: 'Permanent'
