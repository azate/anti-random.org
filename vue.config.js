module.exports = {
  productionSourceMap: false,
  pages: {
    options: {
      template: 'public/browser-extension.html',
      entry: './src/options/main.js',
    },
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.js',
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        contentScripts: {
          entries: {
            'cs-marker': [
              'src/content-scripts/marker.js',
            ],
            'cs-list-randomizer': [
              'src/content-scripts/listRandomizer.js',
            ],
            'cs-random-number': [
              'src/content-scripts/randomNumber.js',
            ],
          },
        },
      },
    },
  },
};
