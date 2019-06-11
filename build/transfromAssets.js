function TransfromAssets(options) {};

TransfromAssets.prototype.apply = function(compiler) {
  // 指定一个挂载到 webpack 自身的事件钩子。
  compiler.plugin('emit', function(compilation, callback) {
    for (var filename in compilation.assets) {
      if (/common.*js$/.test(filename)) {
        delete compilation.assets[filename];
        continue;
      }

      if (/.*[js|css]$/.test(filename)) {
        let type = /.*js$/.test(filename) ? 'js' : 'css';
        let source = compilation.assets[filename].source();
        let size = compilation.assets[filename].size();
        compilation.assets[`${type}/${filename}`] = {
          source: () => source,
          size: () => size
        }
        delete compilation.assets[filename];
      }
      if (/html$/.test(filename)) {
        let source = compilation.assets[filename].source();
        source = source.replace(/\<script.*?<\/script>/ig, value => ~value.indexOf('common') ? '' : value);
        source = source.replace(/href=\"\S+?.css\"/ig, value => value.slice(0, 6) + 'css/' + value.slice(6));
        source = source.replace(/src=\".*?.js\"/ig, value => value.slice(0, 5) + 'js/' + value.slice(5));
        compilation.assets[filename].source = () => source;
      }
    }
    callback();
  })
};

module.exports = TransfromAssets;
