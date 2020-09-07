'use strict';

module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.post('/admin/upLoadFile', controller.admin.upLoadFile.upload); // 上传图片
  router.post('/admin/login', controller.admin.user.login);
  router.get('/admin/article/typeInfo', adminauth, controller.admin.main.getTypeInfo);
  router.post('/admin/artilce/add', controller.admin.main.addArticle);
  router.post('/admin/artilce/update', controller.admin.main.updateArticle);
  router.post('/admin/article/list', adminauth, controller.admin.main.getArticleList);
  router.get('/admin/article/del/:id', adminauth, controller.admin.main.delArticle);
  router.get('/admin/article/getById/:id', adminauth, controller.admin.main.getArticleById);
  router.post('/admin/slide/list', adminauth, controller.admin.slide.list);
  router.post('/admin/slide/add', adminauth, controller.admin.slide.add);
  router.post('/admin/slide/update', adminauth, controller.admin.slide.update);
  router.get('/admin/slide/del/:id', adminauth, controller.admin.slide.del);
  router.get('/admin/slide/getById/:id', adminauth, controller.admin.slide.getById);
  router.post('/admin/comment/list', adminauth, controller.admin.comment.list);
  router.post('/admin/comment/add', adminauth, controller.admin.comment.add);
  router.post('/admin/comment/update', adminauth, controller.admin.comment.update);
  router.get('/admin/comment/del/:id', adminauth, controller.admin.comment.del);
  router.get('/admin/comment/getById/:id', adminauth, controller.admin.comment.getById);

};
