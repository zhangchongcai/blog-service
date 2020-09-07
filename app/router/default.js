'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.post('/default/article/list', controller.default.home.getArticleList);
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo);
  router.get('/default/getListById/:id', controller.default.home.getListById);
  router.get('/default/getListById/:id', controller.default.home.getListById);
  router.post('/default/slide/list', controller.default.slide.list);
};
