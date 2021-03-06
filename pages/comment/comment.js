// pages/comment/comment.js
const app = getApp()
var {
  urlApi
} = require("../../utils/request.js");
var commentAllList = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList:[],
   page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.queryCommentList();
  },

  //查询评论
  queryCommentList:function(){
    var that = this;
    var data = {};
    var page = that.data.page;
    data.page = page;
    console.log(data);
    urlApi("user/Comment/index", "post", data).then((res) => {
      console.log("11=================", res);
      if (page == 1) {
        commentAllList = [];
      }
      if (res.data.code == 1) {

        if (res.data.data.articles.length > 0) {
          for (var i = 0; i < res.data.data.articles.length; i++) {
            commentAllList.push(res.data.data.articles[i]);
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
            loading: true,
          })
        }

      } else {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
      }
      that.setData({
        commentList: commentAllList
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      page: 1,
      loading: true,
      noMore: false
    });
    that.queryCommentList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (!that.data.loading && !that.data.noMore) {
      that.setData({
        page: ++that.data.page,
        loading: true,
        noMore: false,
      })
      that.queryCommentList();
    };
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})