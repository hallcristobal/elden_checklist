git branch -D gh-pages 
git checkout -b gh-pages && \
npm run build && \
rm -rf public scraper src package-lock.json package.json README.md tsconfig.json && \
mv build/* . && \
rm -rf build && \
git add . && \
git commit -m "gh-pages"