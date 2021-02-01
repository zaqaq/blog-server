const Router  = require('@koa/router')
const router = new Router()


router.get('/', async(ctx) => {
  const { hotsTags } = require('../../models-operate/article_list')
  const hotsTagList = await hotsTags()
  ctx.body = hotsTagList
})

router.post('/header-nav', async(ctx) => {
    const {findHeaderNav} = require('../../models-operate/header_nav')
    const firstNav = await findHeaderNav(0)
    const navData = []
    for(item of firstNav){
        const subData = await findHeaderNav(item.nav_id);
        navData.push( {
            nav_id: item.nav_id,
            title: item.title,
            sub_title: subData
        });
    }
    ctx.body = navData
})

router.post('/article-list', async(ctx) => {
  let { pageNum, pageSize } = ctx.request.body
  pageSize = pageSize || 10
  const {limitArticleList, articleListLength} = require('../../models-operate/article_list')
  const totalNum = await articleListLength();
  const articleList = await limitArticleList(pageNum, pageSize)
  ctx.body = {
      totalNum, articleList
  }
})

router.post('/article-details', async(ctx) => {
  let { id } = ctx.request.body
  const {findArticleDetail} = require('../../models-operate/article_detail')
  const {prevArticle, nextArticle} = require('../../models-operate/article_list')
  const prev = await prevArticle(id)
  const next = await nextArticle(id)
  const articleDetail = await findArticleDetail(id)
  ctx.body = {
    articleDetail,
    prev,
    next
  }
})

router.post('/search-list', async(ctx) => {
  let { key, pageNum, pageSize } = ctx.request.body
  pageSize = pageSize || 8
  const {searchArticleList, searchListLength} = require('../../models-operate/article_list')
  const articleList = await searchArticleList(key, pageNum, pageSize)
  const totalNum = await searchListLength(key)
  ctx.body = {
    articleList, totalNum
  }
})

router.post('/side-bar', async(ctx) => {
  const { recentlyUpdate, clickRank, hotsTags } = require('../../models-operate/article_list')
  const updateList = await recentlyUpdate()
  const rankList = await clickRank()
  const hotsTagList = await hotsTags()
  ctx.body = {
    updateList, rankList, hotsTagList
  }
})

router.post('/update-read', async(ctx) => {
  let { details_id } = ctx.request.body
  const {updateReadCount} = require('../../models-operate/article_list')
  const res = await updateReadCount(details_id)
  ctx.body = {
    code: res
  }
})

router.post('/category-list', async(ctx) => {
  let { navId, pageNum, pageSize } = ctx.request.body
  pageSize = pageSize || 10
  const {categoryList, categoryListLength} = require('../../models-operate/article_list')
  //const totalNum = await articleListLength();
  const articleList = await categoryList(navId, pageNum, pageSize)
  const totalNum = await categoryListLength(navId)
  ctx.body = {
    totalNum,
    articleList
  }
})

module.exports = router;
