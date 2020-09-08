'use strict';

module.exports = (options, app) => {
  return async function adminauth(ctx, next) {
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { code: 0, data: 0, message: '未登录' };
    }
  };
};
