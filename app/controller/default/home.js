'use strict';

const Controller = require('egg').Controller;
const baseSql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.type as type,' +
                'article.tags as tags,' +
                'article.praise as praise,' +
                'article.view_count as view_count,' +
                'article.imageUrl as imageUrl,' +
                "DATE_FORMAT(article.addTime,'%Y-%m-%d' ) as addTime," +
                'type.typeName as typeName ';
class HomeController extends Controller {
  // 列表
  async getArticleList() {
    const sql = baseSql +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'Order By article.addTime Desc ';
    const result = await this.app.mysql.query(sql);
    result.map(function a(item) {
      return (item.tags = JSON.parse(item.tags));
    });
    this.ctx.body = { data: result };
  }
  // 详情
  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = baseSql + ',' +
              ' article.article_content as article_content,' +
              'type.id as typeId ' +
              'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
              'WHERE article.id=' + id;
    const result = (await this.app.mysql.query(sql))[0];
    result.tags = JSON.parse(result.tags);
    this.ctx.body = { data: result };
  }

  // 得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  async getListById() {
    let id = this.ctx.params.id;
    let sql = baseSql +
              'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
              'WHERE type_id=' + id +
              ' Order By article.addTime Desc ';
    const result = await this.app.mysql.query(sql);
    result.map(function a(item) {
      return (item.tags = JSON.parse(item.tags));
    });
    this.ctx.body = { data: result };
  }
  async getListByType() {
    const type = this.ctx.params.type;
    let addition = ' Order By article.addTime Desc';
    if (type === 'view_count') {
      addition = 'Order By article.addTime Desc, article.view_count Desc';
    } else if (type === 'vue' || type === 'react' || type === 'back' || type === 'other') {
      addition = "WHERE article.type = '" + type + "'" + addition;
    }
    const sql = baseSql +
              'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
              addition;
    const result = await this.app.mysql.query(sql);
    result.map(function a(item) {
      return (item.tags = JSON.parse(item.tags));
    });
    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
