const API_URL = 'http://bs.linlizone.com/'

module.exports = {
  // 文章列表
  articleList: API_URL + 'index.php/Index/Article/fetchArticleCrossDomain',
  // 文章详情
  articleDetail: API_URL + 'index.php/Index/Article/fetchArticleDetailCrossDomain'
};
