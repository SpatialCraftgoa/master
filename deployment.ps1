# Step 1: Run the build process
npm run build

# Step 2: Transfer the built files inside the dist/ directory to the EC2 instance
# This uses a wildcard to match all files inside dist/
scp -i C:/Users/samvi/Reservemyplot_mvp_v1.pem -r dist/* ubuntu@35.174.130.58:/var/www/html/

# Step 3: Notify deployment success
Write-Output "Deployment completed!"
