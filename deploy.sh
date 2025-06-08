#!/bin/bash

# EcommerceHub Deployment Script for Vercel

echo "🚀 Starting deployment process..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the project
echo "📦 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Vercel
    echo "🌐 Deploying to Vercel..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "Your EcommerceHub Admin Dashboard is now live!"
    else
        echo "❌ Deployment failed. Please check the error messages above."
    fi
else
    echo "❌ Build failed. Please fix the errors and try again."
fi
