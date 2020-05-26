// pages/mycore/mycore.js
const app = getApp()
var {
  urlApi
} = require("../../utils/request.js");
var myCoinAllList = [];
var myShopAllList = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    totalCore: 0,
    type:[{
      typename:"积分明细",
    }, {
        typename: "兑换记录"
      }],
    list: [],
    list_shop: [],
    page:1,//积分明细分页
    shopPage:1,//兑换明细分页
    myCoinList: [],//我的积分记录
    myShopList: [],//我的兑换记录
    userDetail: ''//用户详情
  },

  // tab切换
  handleChange({ detail }) {
    var that = this;
    var current = detail.key;
    this.setData({
      current: current,
      show: current
    });
    //积分明细
    if (current == 1){
      that.setData({
        noMore: false,
        loading: false,
        page: 1
      })
      that.queryMyShopList();
    }

    //兑换记录
    if (current == 2) {
      that.setData({
        shopnoMore: false,
        shoploading: false,
        shopPage:1
      })
      that.queryMyShopList();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.queryMyCoinList();
    this.queryUserDetail();
    // this.queryMyShopList();
  },

  //查询用户详情
  queryUserDetail: function () {
    var that = this;
    var data = {};
    urlApi('user/Profile/index', "post", data).then((res) => {
      console.log(res);
      if (res.data.code == 1) {
        that.setData({
          userDetail: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  
  queryMyCoinList:function(){
    var that = this;
    var data = {};
    var page = that.data.page;
    data.page = page;
    console.log(data);
    urlApi("user/Profile/my_coin", "post", data).then((res) => {
      console.log("11=================", res);
      if (page == 1) {
        myCoinAllList = [];
      }
      if (res.data.code == 1) {

        if (res.data.data.articles.length > 0) {
          for (var i = 0; i < res.data.data.articles.length; i++) {
            myCoinAllList.push(res.data.data.articles[i]);
          }
          if (res.data.data.articles.length * page >= res.data.data.page_total && page > 1) {
            wx.showToast({
              title: '没有更多数据了',
              icon: "none"
            })
            that.setData({//没有更多了显示
              noMore: true,
              loading: true,
            })
          }
        } else {
          // wx.showToast({
          //   title: '没有更多数据了',
          //   icon: "none"
          // })
          that.setData({//没有更多了显示
            noMore: true,
            noMore: true,
          })
        }

      } else {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
      }
      that.setData({
        myCoinList: myCoinAllList
      })
    })

  },

  //查询我的兑换记录
  queryMyShopList:function(){
    var that = this;
    var data = {};
    var page = that.data.shopPage;
    data.page = page;
    console.log(data);
    urlApi("user/Profile/my_shop", "post", data).then((res) => {
      console.log("11=================", res);
      if (page == 1) {
        myShopAllList = [];
      }
      if (res.data.code == 1) {

        if (res.data.data.articles.length > 0) {
          for (var i = 0; i < res.data.data.articles.length; i++) {
            myShopAllList.push(res.data.data.articles[i]);
          }
          if (res.data.data.articles.length * page >= res.data.data.page_total && page > 1) {
            wx.showToast({
              title: '没有更多数据了',
              icon: "none"
            })
            that.setData({//没有更多了显示
              shopnoMore: true,
              shoploading: true,
            })
          }
        } else {
          // wx.showToast({
          //   title: '没有更多数据了',
          //   icon: "none"
          // })
          that.setData({//没有更多了显示
            shopnoMore: true,
            shoploading: true,
          })
        }

      } else {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
      }
      that.setData({
        myShopList: myShopAllList
      })
    })
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    var current = that.data.current;
    //积分明细
    if (current == 1) {
      that.setData({
        page: 1,
        loading: true,
        noMore: false
      });
      that.queryMyCoinList();
    }
    //兑换明细
    if (current == 2){
      that.setData({
        shopPage: 1,
        shoploading: true,
        shopnoMore: false
      });
      that.queryMyShopList();
    }
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    if (!that.data.loading && !that.data.noMore) {
      that.setData({
        page: ++that.data.page,
        loading: true,
        noMore: false,
      })
      that.queryMyCoinList();
    };

    if (!that.data.shoploading && !that.data.shopnoMore) {
      that.setData({
        shopPage: ++that.data.shopPage,
        shoploading: true,
        shopnoMore: false,
      })
      that.queryMyShopList();
    };
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})