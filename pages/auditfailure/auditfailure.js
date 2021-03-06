// pages/auditfailure/auditfailure.js
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userType:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userType: options.userType
    })
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
    this.queryUserDetail();
  },

  //查询用户详情
  queryUserDetail: function () {
    var that = this;
    var data = {};
    data.user_type = that.data.userType;
    //验证当前角色是否提交信息或是否审核通过
    urlApi('user/Profile/edit', "post", data).then((res) => {
      console.log(res);
      if (res.data.code == 1) {
        that.setData({
          userDetail: res.data.data,
        })
      }
    })
  },

  //返回首页
  backIndexClick: function () {
    wx.redirectTo({
      url: '/pages/uploadqualification/uploadqualification?userType=' + Number(this.data.userType)
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