// pages/evaluation/evaluation.js
var {
  urlApi
} = require("../../utils/request.js");
var e = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    category_id:"",
    list:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({id:options.id,category_id:options.category_id})
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
this.getData();
  },

  getData:function(){
    var that = this;
    urlApi('portal/article/index', "post",{id:this.data.id,category_id :this.data.category_id}).then((res) => {
      e.WxParse.wxParse("agreement", "html",res.data.data.post_content, this, 5);
      if(res.data.code){
      that.setData({
        list:res.data.data
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:'none'
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