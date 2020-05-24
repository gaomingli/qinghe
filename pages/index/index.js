var {
  urlApi
} = require("../../utils/request.js");

const app = getApp()
Page({
  data: {
    swiperList: [],
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
    ],
    boardList: [],
    psychological: [],
    articleData: [],
    shopData: []
  },
  more: function () {
    wx.navigateTo({
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


    //  验证登录
    this.setLogin();
  },
  setLogin: function () {
    // debugger;
    wx.login({
      success(res) {
        console.log(res);
        if (res.code) {
          urlApi("user/Login/wechatLogin", "post", {
            code: res.code
          }).then((res) => {
            // debugger;

          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })


  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow: function () {
    this.getTabBar().setData({
      tabbarIndex: 0
    })
    var that = this;
    urlApi('', "post").then((res) => {
      console.log(res);
      var that = this;
      that.setData({
        swiperList: res.data.data.banner,
        boardList: res.data.data.announcement,
        psychological: res.data.data.psychological,
        articleData: res.data.data.last_news,
        activity: res.data.data.activity,
        shopData: res.data.data.product
      })
    })
  }
})