npm run build && \
rm -rf public scraper src package-lock.json package.json README.md tsconfig.json && \
mv build/* . && \
rm -rf build