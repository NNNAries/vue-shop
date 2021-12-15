const base = {
    host: 'http://localhost:8888',
    goodsUrl: '/api/projectList',
    searchUrl: '/api/search',
    loginUrl: '/api/login',//登录接口
    categoryUrl: '/api/backend/itemCategory/selectItemCategoryByParentId',//类目选择
    uploadUrl: '/api/upload',//上图图片
    addGoods: "/api/backend/item/insertTbItem",//添加商品接口
    delGoods: "/api/backend/item/deleteItemById",//删除商品列表
    updateGoods: "/api/backend/item/updateTbItem",//修改商品
    paramsList: "/api/backend/itemParam/selectItemParamAll",//规格参数列表
    addParamsUrl: "/api/backend/itemParam/insertItemParam",//添加规格参数配置
    getRulesParams: "/api/category/data",//规格参数配置获取
    getAdvertlist: "/api/content/selectContentCategoryByParentId",//广告分类内容
    addvertChild: "/api/content/insertContentCategory",//增加子广告分类
    addAdvertContent: "/api/content/selectTbContentAllByCategoryId",//增加广告内容
    sellInfoUrl: '/api/statistical',  //统计数据--销售信息
    compareUrl: '/api//sellTotal',   //统计 半年 月销量对比数据
    searchParamsUrl: '/api/params/search',  //查询规格参数
    delParams: '/api/params/delete',  //删除规格参数
    orderListUrl:'/api//order-list',  //订单列表
}
export default base