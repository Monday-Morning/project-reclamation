# Contributing Guidelines

When contributing to this repository, please first discuss the change you wish to make via issue with the maintainers of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a
   build. Add only relevant files to commit and ignore the rest to keep the repo clean.
2. Update the README.md or other documentation with details of changes to the interface, this includes new environment
   variables, exposed ports, useful file locations and container parameters.
3. You should request review from the maintainers once you submit the Pull Request.

## Git Workflow

### **Step 1:** Fork the repository

### **Step 2:** Git Setup & Download

```bash
# Clone the repo
$ git clone https://github.com/<User-Name>/project-reclamation.git

# Add upstream remote
$ git remote add upstream https://github.com/Monday-Morning/project-reclamation.git

# Fetch and rebase with upstream/main
$ git fetch upstream
$ git pull --ff upstream/main

# Push if any changes are rebased
$ git push origin main
```

### **Step 3:** Create and Publish Working Branch

```bash
# Ensure you are in the main branch
$ git branch

# Create your new branch
$ git checkout -b <type>/<issue|issue-number>/{<additional-fixes>}
$ git push origin <type>/<issue|issue-number>/{<additional-fixes>}

## Types:
# wip - Work in Progress; long term work; mainstream changes;
# feat - New Feature; future planned; non-mainstream changes;
# bug - Bug Fixes
# junk - Experimental; random experiemntal features; throwaway branch;
```

### On Task Completion, **Step 4:** Commit and push your work

```bash
# Ensure branch
$ git branch

# Fetch and rebase with upstream/main
$ git fetch upstream
$ git pull --ff upstream/main

# Add untracked files one by one
$ git add .

# Commit all changes with appropriate commit message and description. Strcitly follow commit message standards.
$ git commit -m "your-commit-message" -m "your-commit-description"

# Fetch and rebase with upstream/main again
$ git fetch upstream
$ git pull --ff upstream/main

# Push changes to your forked repository
$ git push origin <type>/<issue|issue-number>/{<additional-fixes>}
```

### **Step 5:** Create the PR using GitHub Website

1. Create Pull Request from <type>/<issue|issue-number>/{<additional-fixes>} branch in your forked repository to the main branch in the upstream repository. Again, ensure the name follows commit standards and the description must detail the work done.
1. After creating PR, add a Reviewer (Any Admin) and add yourself as the assignee
1. Link Pull Request to appropriate Issue, and Project+Milestone (if applicable)
1. **Do Not Merge the PR.** That will be done by the reviewer.

### **After PR Merge, Step 6:** Working repository cleanup

```bash
# Fetch and push changes
$ git checkout main
$ git fetch upstream main
$ git pull --ff upstream main
$ git push origin main

# Delete branch from forked repo
$ git branch -d <type>/<issue|issue-number>/{<additional-fixes>}
$ git push --delete origin <type>/<issue|issue-number>/{<additional-fixes>}
```

---

## Important Instuctions & Guides

- Always follow [conventional commits standards](https://www.conventionalcommits.org/en/v1.0.0/)
- About the [fork-and-branch workflow](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/)
