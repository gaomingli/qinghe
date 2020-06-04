var {
  urlApi
} = require("../../utils/request.js");
var {
  jsEvent
} = require("../../utils/util");

const app = getApp()
Page({
  data: {
    dataList:{},
    searchValue:"",
    searchList:[],
    menuList: [{
        id: 1,
        menu_img: "/icon/menuHeart.png",
        menu_name: "心理测评",
        url: "/pages/psychometrics/psychometrics",
        type: 1,
        isShow:0 //0不显示 1显示
      },
      {
        id: 2,
        menu_img: "/icon/menuNews.png",
        menu_name: "新闻资讯",
        url: "/pages/news/news",
        type: 1,
        isShow: 0
      },
      {
        id: 3,
        menu_img: "/icon/menuActivity.png",
        menu_name: "活动报名",
        url: "/pages/exercise/exercise",
        type: 2,
        isShow: 0
      },
      {
        id: 4,
        menu_img: "/icon/menuShopping.png",
        menu_name: "公益商城",
        url: "/pages/shopping/shopping",
        type: 1,
        isShow: 0
      },
    ]
  },
  more: function () {
    wx.switchTab({
      url: '/pages/exercise/exercise'
    })
  },

  gotoPage: function (e) { 
    jsEvent(e);
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  },

  onShow: function () {
    this.getTabBar().setData({
      tabbarIndex: 0
    })
    this.setData({
      searchValue:"",
      searchList:[],
    })

    this.getData(); 
    this.queryMenuIsShow();
  },
  
  //查询按钮
  searchIndexClick:function(){
    wx.navigateTo({
      url: '/pages/search/search?page_type=1',
    })
  },
  
  //菜单显示问题:0隐藏 1显示
  queryMenuIsShow:function(){
    var that = this;
    var menuList = that.data.menuList;
    urlApi('user/profile/nav', "post", {}).then((res) => {
      console.log("res======",res);
      if (res.data.code) {
        //隐藏“心理测评菜单”
        menuList[0].isShow = res.data.data.status;
        menuList[1].isShow = 1;
        menuList[2].isShow = 1;
        menuList[3].isShow = res.data.data.status;
        that.setData({
          isShowMenu: res.data.data.status,
          menuList: menuList
        })
        
      }
    })
  },

  getData:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    urlApi('', "post",{}).then((res) => {
      console.log("dataListres=========", res);
    if(res.data.code){
      that.setData({
        dataList:res.data.data
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:'none'
      })
    }  
    wx.hideLoading(); 
    })
  },
  getSearch:function(){
    this.getSearchValue();
  },
  getintsearch:function(e){
    this.setData({searchValue:e.detail.value})
    this.getSearchValue();
  },
  
  

// 活动判断
goActivity:function(e){
   const {categoryid,id}=e.currentTarget.dataset;
 wx.navigateTo({
   url:`/pages/exercisedetail/exercisedetail?category_id=${categoryid}&id=${id}`,
 })
}
})