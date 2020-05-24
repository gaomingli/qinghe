// pages/psychometrics/psychometrics.js
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //分类导航
    menuList: [],
    assessment:[
      { "id": 1, "assess_img": "../../icon/psychometrics/family.png", "assess_name": "幼儿气质类型评估","assess_number":12455},
      { "id": 2, "assess_img": "../../icon/psychometrics/family.png", "assess_name": "成人气质类型评估","assess_number":56232}
    ]
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
    urlApi('portal/list/index/id/3', "post").then((res) => {
      var that = this;
      that.setData({
        menuList: res.data
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