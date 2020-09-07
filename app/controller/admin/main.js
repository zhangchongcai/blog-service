'use strict';

const Contoller = require('egg').Controller;
const utils = require('../../../config/utils');
class MainController extends Contoller {
  // 获取类别
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }
  // 添加
  async addArticle() {
    const tmpArticle = this.ctx.request.body;
    const resulat = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = resulat.affectedRows === 1;
    const message = insertSuccess ? '插入成功' : '插入失败';
    this.ctx.body = utils([ insertSuccess, { 'insertId': resulat.insertId }, message ]);
  }
  // 修改文章
  async updateArticle() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    const message = updateSuccess ? '修改成功' : '修改失败';
    this.ctx.body = utils([ updateSuccess ? 200 : 400, 1, message ]);
  }
  // 获得文章列表
  async getArticleList() {
    let sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                "DATE_FORMAT(article.addTime,'%Y-%m-%d' ) as addTime," +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'ORDER BY article.id DESC ';
    const resList = await this.app.mysql.query(sql);
    this.ctx.body = utils([ 1, resList ]);
  }
  // 删除文章
  async delArticle() {
    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { 'id': id });
    const del = res.affectedRows === 1;
    const message = del ? '删除成功！' : '删除失败';
    this.ctx.body = utils([ del ? 200 : 400, del, message ]);
  }
  // 获取文章详情
  async getArticleById() {
    const id = this.ctx.params.id;
    // FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime
    let sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.article_content as article_content,' +
                "DATE_FORMAT(article.addTime,'%Y-%m-%d' ) as addTime," +
                'type.typeName as typeName, ' +
                'type.id as typeId ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'WHERE article.id = ' + id;
    const result = await this.app.mysql.query(sql);
    const message = result.length >= 1 ? '查询成功！' : '查询失败！';
    this.ctx.body = utils([ 1, result[0], message ]);
  }
}

module.exports = MainController;

