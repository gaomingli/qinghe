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
    current:0
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
  getCurrent:function(e){
    const { type } = e.currentTarget.dataset;
    this.setData({current:type})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
    
  },
  getData:function(){
    var that = this;
    urlApi('portal/list/index/id/3', "post",{}).then((res) => {
      if(res.data.code){
        that.setData({
          menuList: res.data.data
        })
      }else{
        wx.showToast({
          title: res.data.msg
        })
      }
    
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