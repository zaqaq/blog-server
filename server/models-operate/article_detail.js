const Model = require('../models/artlcle_list')

const findArticleDetail = async(id) => {
    const articleDetail = await Model.findAll({
        attributes: ['title', 'des', 'publish_date', 'comment_count', 'read_count', 'praise_count', 'content', 'details_id'],
        where: {
            id: id || 1
        }
    });
    const data = articleDetail.map(data => data.dataValues)
    return data[0];
}

module.exports = {
    findArticleDetail
}
