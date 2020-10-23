'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo);
  router.post('/default/article/list', controller.default.home.getArticleList);
  router.get('/default/article/getById/:id', controller.default.home.getArticleById);
  router.get('/default/article/getListById/:id', controller.default.home.getListById);
  router.get('/default/article/getListByType/:type', controller.default.home.getListByType);
  router.post('/default/slide/list', controller.default.slide.list);
};
