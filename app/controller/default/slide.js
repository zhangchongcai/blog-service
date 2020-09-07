'use strict';

const Contoller = require('egg').Controller;
const utils = require('../../../config/utils');
class SlideDefaultController extends Contoller {
  // 获取轮播图
  async list() {
    let sql = 'SELECT slide.id as id,' +
              'slide.url as url,' +
              'slide.status as status,' +
              'slide.introduce as introduce,' +
              "DATE_FORMAT(slide.add_time,'%Y-%m-%d' ) as add_time " +
              'FROM slide';
    const result = await this.app.mysql.query(sql);
    let message = '';
    let code = 400;
    if (result.length) {
      message = '获取slide成功';
      code = 200;
    } else {
      message = '获取失败';
    }
    this.ctx.body = utils([ code, result, message ]);
  }
}
module.exports = SlideDefaultController;
