# Project Reclamation

The Server Application for Monday Morning under [Project Infinity](https://github.com/orgs/Monday-Morning/projects)

- Developed on Node.js v14 LTS

## Modules

- Express Server
- Firebase Authentication
- MongoDB Implementation
- GraphQL Implementation
- REST API Implementation

## Installation

### Requirements

- Node.js v12 LTS or later (with NPM CLI)
- Git CLI

### Procedure

```bash
$ git clone https://github.com/Monday-Morning/project-reclamation.git
$ cd project-reclamation
$ npm install
```

### To Run

- Development

```bash
$ npm run dev
```

- Testing

```bash
$ npm run test
```

- Staging

```bash
$ npm run stage
```

- Production

```bash
$ npm start
```

## Contributing

### Git Workflow

- **Step 1:** Fork the repository
- **Step 2:** Git Setup & Download

```bash
# Clone the repo
$ git clone https://github.com/<User-Name>/project-reclamation.git

# Add upstream remote
$ git remote add upstream https://github.com/Monday-Morning/project-reclamation.git

# Fetch and rebase with upstream/development
$ git fetch upstream
$ git rebase upstream/development
```

- **Step 3:** Create and Publish Working Branch

```bash
$ git checkout -b <type>/<issue|issue-number>/{<additional-fixes>}
$ git push origin <type>/<issue|issue-number>/{<additional-fixes>}

## Types:
# wip - Work in Progress; long term work; mainstream changes;
# feat - New Feature; future planned; non-mainstream changes;
# bug - Bug Fixes
# junk - Experimental; random experiemntal features; throwaway branch;
```

- **On Task Completion, Step 4:** Commit and push your work

```bash
# Ensure branch
$ git branch

# Fetch and rebase with upstream/development
$ git fetch upstream
$ git rebase upstream/development

# Add untracked files one by one
$ git add filename

# Commit all changes with appropriate commit message and description. Strcitly follow commit message standards.
$ git commit -m "your-commit-message" -m "your-commit-description"

# Fetch and rebase with upstream/development again
$ git fetch upstream
$ git rebase upstream/development

# Push changes to your forked repository
$ git push origin <type>/<issue|issue-number>/{<additional-fixes>}

## Creating the PR using GitHub Website
```

- **Step 5:** Create the PR using GitHub Website

  1. Create Pull Request from <type>/<issue|issue-number>/{<additional-fixes>} branch in your forked repository to the development branch in the upstream repository. Again, ensure the name follows commit standards and the description must detail the work done.
  1. After creating PR, add a Reviewer (Any Admin) and add yourself as the assignee
  1. Link Pull Request to appropriate Issue, or Project+Milestone (if no issue created)
  1. **Do Not Merge the PR.** That will be done by the reviewer.

- **After PR Merge, Step 6:** Working repository cleanup

```bash
# Delete branch from forked repo
$ git branch -d <type>/<issue|issue-number>/{<additional-fixes>}
$ git push --delete origin <type>/<issue|issue-number>/{<additional-fixes>}

# Fetch and rebase with upstream/development
$ git checkout development
$ git pull upstream
$ git push origin
```

### Important Instuctions & Guides

- Always follow [commit message standards](https://chris.beams.io/posts/git-commit/)
- About the [fork-and-branch workflow](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/)
