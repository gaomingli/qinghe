var {
  urlApi
} = require("../../utils/request.js");
var e = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_type: '',//类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      user_type: options.user_type
    });
    that.getJaqdClick();
  },
  //相关申请协议
  getJaqdClick: function () {
    var that = this;
    var data = {};
    data.user_type = that.data.user_type;
    urlApi("user/Profile/edit", "post", data).then((res) => {
      console.log(res);
      if (res.data.code == 1) {
        e.WxParse.wxParse("agreement", "html", res.data.data.post_content, this, 5);
      }
    });
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})