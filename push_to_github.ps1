# PowerShell Script to initialize Git and push AetherFlow Dashboard to GitHub

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Starting Git and GitHub Push for AetherFlow" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Initialize local Git repository if not already done
if (!(Test-Path .git)) {
    Write-Host "Initializing local Git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "Local Git repository already initialized." -ForegroundColor Green
}

# 2. Stage all files (respecting .gitignore)
Write-Host "Staging files..." -ForegroundColor Yellow
git add .

# 3. Commit changes
Write-Host "Creating Git commit..." -ForegroundColor Yellow
git commit -m "feat: initial commit for rebranding AetherFlow and AetherGraph with Hugging Face integration and Slack alerts" 2>$null
# Ignore errors if commit already exists
$global:LastExitCode = 0

# 4. Set branch to main
Write-Host "Setting branch to main..." -ForegroundColor Yellow
git branch -M main

# 5. Check if gh CLI is authenticated
Write-Host "Verifying GitHub CLI authentication..." -ForegroundColor Yellow
$authStatus = gh auth status 2>&1
if ($authStatus -match "Logged in to github.com") {
    Write-Host "GitHub CLI is authenticated." -ForegroundColor Green
} else {
    Write-Host "GitHub CLI is not authenticated. Please run 'gh auth login' first." -ForegroundColor Red
    exit 1
}

# 6. Check if repository already exists on GitHub under the organization AetherFlow-ai
$repoName = "AetherFlow-ai/aetherflow"
Write-Host "Checking if repository $repoName exists on GitHub..." -ForegroundColor Yellow

# Temporarily ignore native command errors on stderr
$oldErrorActionPreference = $ErrorActionPreference
$ErrorActionPreference = "SilentlyContinue"

# Run gh repo view and check the exit code
gh repo view $repoName --json name >$null 2>&1
$repoExists = ($LastExitCode -eq 0)

# Restore error action preference
$ErrorActionPreference = $oldErrorActionPreference

if ($repoExists) {
    Write-Host "Repository $repoName already exists on GitHub." -ForegroundColor Green
    # Check if remote origin is already set
    $remotes = git remote
    if ($remotes -contains "origin") {
        Write-Host "Remote origin is already configured." -ForegroundColor Green
    } else {
        Write-Host "Adding remote origin..." -ForegroundColor Yellow
        git remote add origin https://github.com/AetherFlow-ai/aetherflow-dashboard.git
    }
} else {
    Write-Host "Repository $repoName does not exist. Creating repository $repoName under the organization..." -ForegroundColor Yellow
    # Create the repository under the organization
    gh repo create $repoName --public --source=. --push
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host "Successfully pushed AetherFlow codebase to GitHub!" -ForegroundColor Green
    Write-Host "Repository URL: https://github.com/$repoName" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
    exit 0
}

# 7. Push to GitHub if repository already existed but was not pushed
Write-Host "Pushing code to GitHub remote main branch..." -ForegroundColor Yellow
git push -u origin main

Write-Host "==========================================" -ForegroundColor Green
Write-Host "Successfully pushed AetherFlow codebase to GitHub!" -ForegroundColor Green
Write-Host "Repository URL: https://github.com/$repoName" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
