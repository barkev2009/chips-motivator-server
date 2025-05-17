git stash 
git pull
echo "Installing server deps..."
npm i
nohup node index.js &