var {
  urlApi
} = require("../../utils/request.js");

const app = getApp()
Page({
  data: {
    dataList:{},
    menuList: [{
        id: 1,
        menu_img: "/icon/menuHeart.png",
        menu_name: "心理测评",
        url: "/pages/psychometrics/psychometrics",
        type: 1
      },
      {
        id: 2,
        menu_img: "/icon/menuNews.png",
        menu_name: "新闻资讯",
        url: "/pages/news/news",
        type: 1
      },
      {
        id: 3,
        menu_img: "/icon/menuActivity.png",
        menu_name: "活动报名",
        url: "/pages/exercise/exercise",
        type: 2
      },
      {
        id: 4,
        menu_img: "/icon/menuShopping.png",
        menu_name: "公益商城",
        url: "/pages/shopping/shopping",
        type: 1
      },
    ]
  },
  more: function () {
    wx.switchTab({
      url: '/pages/exercise/exercise'
    })
  },

  gotoPage: function (e) {
    const {
      type,
      url
    } = e.currentTarget.dataset;
    if (type == 1) {
      wx.navigateTo({
        url: url,
      })
    } else {
      wx.switchTab({
        url: url
      })
    }
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
    this.getData();
   
  },
  getData:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    urlApi('', "post",{}).then((res) => {
    if(res.data.code){
      that.setData({
        dataList:res.data.data
      })
    }else{
      wx.showToast({
        title: res.data.msg
      })
    }  
    wx.hideLoading(); 
    })
  }
})