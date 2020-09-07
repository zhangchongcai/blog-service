'use strict';

const Contoller = require('egg').Controller;
const utils = require('../../../config/utils');
class SlideController extends Contoller {
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
  async add() {
    const requData = this.ctx.request.body;
    const resulat = await this.app.mysql.insert('slide', requData);
    const insertSuccess = resulat.affectedRows === 1;
    const message = insertSuccess ? '添加成功' : '添加失败';
    this.ctx.body = utils([ insertSuccess ? 200 : 400, { 'insertId': resulat.insertId }, message ]);
  }
  async update() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('slide', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    const message = updateSuccess ? '修改成功' : '修改失败';
    this.ctx.body = utils([ updateSuccess ? 200 : 400, 1, message ]);
  }
  async del() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('slide', { 'id': id });
    const del = res.affectedRows === 1;
    const message = del ? '删除成功！' : '删除失败';
    this.ctx.body = utils([ del ? 200 : 400, del, message ]);
  }
  async getById() {
    const id = this.ctx.params.id;
    let sql = 'SELECT slide.id as id,' +
                'slide.url as url,' +
                'slide.introduce as introduce,' +
                'slide.status as status ' +
                'FROM slide ' +
                'WHERE slide.id = ' + id;
    const result = await this.app.mysql.query(sql);
    const message = result.length ? '查询成功！' : '查询失败！';
    this.ctx.body = utils([ result.length ? 200 : 400, result[0], message ]);
  }
}

module.exports = SlideController;
