'use strict';

const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Attachment extends Model {
    }

    Attachment.init({
            mime: DataTypes.STRING,
            url: {
                type: DataTypes.STRING,
                defaultValue: '/images/none.png'
            },
            image: DataTypes.BLOB('long')
        }, {
            sequelize
        }
    );

    return Attachment;
};