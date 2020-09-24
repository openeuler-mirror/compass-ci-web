// const { config } = require("vue/types/umd");

/**
 * @file api文档入口
 * */
module.exports = {
    chainWebpack: config => {
        config.plugins.delete('prefetch');
    }
};