const { Op, fn, col } = require('sequelize')
const Model = require('../models/artlcle_list')

const limitArticleList = async(pageNum, pageSize) => {
    const articleList = await Model.findAll({
        attributes: ['id', 'tag', 'title', 'des', 'publish_date', 'comment_count', 'read_count', 'praise_count', 'details_id'],
        limit: pageSize,
        offset: (pageNum - 1) * pageSize,
    });
    const data = articleList.map(data => data.dataValues)
    return data;
}

const articleListLength = async() => {
    const totalNum = await Model.count()
    return totalNum
}

const searchArticleList = async(key, pageNum, pageSize) => {
  const articleList = await Model.findAll({
    attributes: ['id', 'tag', 'title', 'des', 'publish_date', 'comment_count', 'read_count', 'praise_count', 'details_id'],
    where: {
      [Op.or]: [
        {
          title: { [Op.like]: `%${key}%`}
        },
        {
          des: { [Op.like]: `%${key}%` }
        }
      ]
    },
    limit: pageSize,
    offset: (pageNum - 1) * pageSize,
  });
  const data = articleList.map(data => data.dataValues)
  return data;
}

const searchListLength = async(key) => {
  const totalNum = await Model.count({
    where: {
      [Op.or]: [
        {
          title: { [Op.like]: `%${key}%`}
        },
        {
          des: { [Op.like]: `%${key}%` }
        }
      ]
    }
  })
  return totalNum;
}

const recentlyUpdate = async() => {
  const articleList = await Model.findAll({
    attributes: ['id', 'title', 'publish_date', 'read_count', 'details_id'],
    order: [
      ['publish_date', 'DESC']
    ],
    limit: 5
  });
  const data = articleList.map(data => data.dataValues)
  return data;
}

const clickRank = async() => {
  const articleList = await Model.findAll({
    attributes: ['id', 'title', 'details_id'],
    order: [
      ['read_count', 'DESC']
    ],
    limit: 5
  });
  const data = articleList.map(data => data.dataValues)
  return data;
}

const hotsTags = async() => {
  const articleList = await Model.findAll({
    attributes: [
      'tag',
      'nav_id',
      [fn('COUNT', col('tag')), 'count']
    ],
    group: ['tag','nav_id'],
    order: [
      [fn('COUNT', col('tag')), 'DESC'],
    ],
    //limit: 5
  });
  const data = articleList.map(data => data.dataValues)
  return data;
}

const updateReadCount = async(details_id) => {
  const resRead = await Model.findOne({
    attributes: ['read_count'],
    where: {details_id}
  })
  const read_count = resRead.dataValues.read_count
  
  await Model.update({read_count: read_count + 1},{
    where: {
      details_id
    }
  })
  return true
}

const categoryList = async(nav_id, pageNum, pageSize) => {
  const articleList = await Model.findAll({
    attributes: ['id', 'tag', 'title', 'des', 'publish_date', 'comment_count', 'read_count', 'praise_count', 'details_id'],
    where: {nav_id},
    limit: pageSize,
    offset: (pageNum - 1) * pageSize,
  });
  const data = articleList.map(data => data.dataValues)
  return data;
}

const categoryListLength = async(nav_id) => {
  const totalNum = await Model.count({
    where: {nav_id}
  })
  return totalNum
}

const prevArticle = async(details_id) => {
  const prev = await Model.findOne({
    attributes: ['id', 'details_id', 'title'],
    where: {
      details_id: {
        [Op.lt]: details_id
      }
    },
    order: [
      ['details_id', 'DESC']
    ]
  })
  
  if(prev){
    prev.dataValues.flag = true
    return prev.dataValues
  }else{
    return {
      flag: false
    }
  }
}

const nextArticle = async(details_id) => {
  const next = await Model.findOne({
    attributes: ['id', 'details_id', 'title'],
    where: {
      details_id: {
        [Op.gt]: details_id
      }
    }
  })
  
  if(next){
    next.dataValues.flag = true
    return next.dataValues
  }else {
    return {
      flag: false
    }
  }
}

module.exports = {
  limitArticleList,
  articleListLength,
  searchArticleList,
  searchListLength,
  recentlyUpdate,
  clickRank,
  hotsTags,
  updateReadCount,
  categoryList,
  categoryListLength,
  prevArticle,
  nextArticle
}
