'use strict';

const Contoller = require('egg').Controller;
const utils = require('../../../config/utils');
class UserContoller extends Contoller {
  async login() {
    const userName = this.ctx.request.body.userName;
    const passWord = this.ctx.request.body.passWord;
    const sql = "SELECT userName FROM admin_user WHERE userName = '" +
    userName + "' AND password = '" + passWord + "'";
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = openId;
      this.ctx.session.aaaaaa = 'bbbbbb';
      const data = { 'openId': openId };
      this.ctx.body = utils([ 200, data, '登录成功' ]);
    } else {
      this.ctx.body = utils([ 400, 0, '登录失败' ]);
    }
  }
}
module.exports = UserContoller;
