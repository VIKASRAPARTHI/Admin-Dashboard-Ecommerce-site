@echo off
echo 🚀 Starting deployment process...

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
)

REM Build the project
echo 📦 Building the project...
npm run build

REM Check if build was successful
if %errorlevel% equ 0 (
    echo ✅ Build successful!
    
    REM Deploy to Vercel
    echo 🌐 Deploying to Vercel...
    vercel --prod
    
    if %errorlevel% equ 0 (
        echo 🎉 Deployment successful!
        echo Your EcommerceHub Admin Dashboard is now live!
    ) else (
        echo ❌ Deployment failed. Please check the error messages above.
    )
) else (
    echo ❌ Build failed. Please fix the errors and try again.
)

pause
