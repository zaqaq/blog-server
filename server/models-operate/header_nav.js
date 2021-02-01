const Model = require('../models/header_nav')

const findHeaderNav = async(id) => {
    const firstNav = await Model.findAll({
        attributes: ['nav_id', 'title'],
        where: {
            parent_id: id || 0
        },
    });
    const data = firstNav.map(data => data.dataValues)
    return data;
}

module.exports = {
    findHeaderNav
}
