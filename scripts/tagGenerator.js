const tag = require('html-tag');

hexo.extend.helper.register('tagGenerator', function ({ tagName, attributes, content }) {
  return tag(tagName, attributes, content);
});
