/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1596770396112_5430';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: '47.115.114.211',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'aa112233',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  exports.session = {
    key: 'EGG_SESS', // eggjs默认session的key
    maxAge: 24 * 3600 * 1000, // 1 day
    httpOnly: true,
    encrypt: true,
    // renew: true,  每次访问页面都会给session会话延长时间
  };
  config.security = {
    csrf: { enable: false },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    credentials: true, // 允许Cook可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  config.uploadDir = 'app/public/upload';

  return {
    ...config,
    ...userConfig,
  };
};
