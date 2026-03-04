# GlowUps Project

## 🌐 Live Preview
**[https://willtalbot80.github.io/GlowUps](https://willtalbot80.github.io/GlowUps)**

The app is automatically deployed to GitHub Pages on every push to `main`.

### Previewing a pull request

Every open PR gets its own live preview URL. After pushing to a PR branch:

1. Wait for the **PR Preview** GitHub Actions workflow to finish (usually ~1 min).
2. A comment will appear on the PR that looks like:

   > 🔍 Preview available at **https://willtalbot80.github.io/GlowUps/pr-preview/pr-&lt;number&gt;/**

3. Click the link to see your changes live before merging.

The preview is automatically removed when the PR is closed or merged.

> **⚠️ CI shows "action_required" and never runs?**
>
> GitHub requires a human to approve workflow runs triggered by bots (like the Copilot coding agent). To fix this permanently:
>
> **Option A — approve once:** Go to the **Actions** tab in this repository, click the blocked run, then click **"Approve and run"**. GitHub remembers trusted contributors, so future runs from the same bot won't need approval again.
>
> **Option B — change the approval policy (recommended):**
> 1. Go to **Settings → Actions → General** in this repository.
> 2. Under **"Fork pull request workflows from outside collaborators"**, change the setting to **"Require approval for first-time contributors only"**.
> 3. Click **Save**.
>
> After approving once (Option A) or updating the policy (Option B), all future CI and PR Preview workflows will run automatically.

## Overview
GlowUps is a project designed to enhance user experience through various innovative features. This repository contains all the necessary code, configuration files, and resources to get started.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- **Git** - [Download Git](https://git-scm.com/downloads)
- **Node.js** - [Download Node.js](https://nodejs.org/)
- **npm** - Automatically installed with Node.js, used for managing JavaScript packages.
- **Database** - Set up a suitable database (e.g., MySQL, MongoDB).

## Installation Steps
Follow these steps to set up the GlowUps project on your local machine:

1. **Clone the Repository**  
   Use the following command to clone the repository to your local machine:
   ```bash
   git clone https://github.com/willtalbot80/glowups.git
   cd glowups
   ```

2. **Install Dependencies**  
   Navigate to the project directory and install the required dependencies:
   ```bash
   npm install
   ```

3. **Set Up Configuration**  
   You may need to set up your configuration file. Copy `config.example.js` to `config.js`, and update any necessary information such as database credentials:
   ```bash
   cp config.example.js config.js
   ```

4. **Set Up the Database**  
   Ensure your database is configured and running. Run the following command to migrate your database:
   ```bash
   npm run migrate
   ```

5. **Run the Application**  
   Start the application using the following command:
   ```bash
   npm start
   ```

6. **Access the Application**  
   Open your web browser and go to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Usage
Provide instructions on how to use the features of the GlowUps project here.

## 🔒 Branch Protection Setup (one-time admin step)

GitHub shows a "classic branch protections not configured" warning until you enable protection rules for the `main` branch.  To clear the warning:

1. Go to **Settings → Branches** in this repository.
2. Click **Add classic branch protection rule**.
3. Set **Branch name pattern** to `main`.
4. Enable the following rules:
   - ✅ **Require a pull request before merging** — no direct pushes to `main`
     - ✅ **Require approvals** (1 reviewer)
     - ✅ **Require review from Code Owners** (uses `.github/CODEOWNERS`)
   - ✅ **Require status checks to pass before merging**
     - Search for and add the **`build`** check (provided by `.github/workflows/ci.yml`)
     - ✅ **Require branches to be up to date before merging**
   - ✅ **Do not allow bypassing the above settings**
5. Click **Create** (or **Save changes**).

Once saved, the security warning disappears and all PRs to `main` will require a passing CI build and at least one approved review before they can be merged.

## Contributing
If you would like to contribute to this project, please follow these guidelines:
- Fork the repository.
- Create a new branch (`git checkout -b feature/AmazingFeature`).
- Make your changes.
- Commit your changes (`git commit -m 'Add some AmazingFeature'`).
- Push to the branch (`git push origin feature/AmazingFeature`).
- Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries, please contact [willtalbot80](https://github.com/willtalbot80).