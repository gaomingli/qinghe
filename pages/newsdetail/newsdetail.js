// pages/newsdetail/newsdetail.js
var {
  urlApi
} = require("../../utils/request.js");
var e = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   newsname:"",
   newstime:"",
   getID:{
     igetIDd:'',
     category_id:''
   }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({'getID.id':options.id,'getID.category_id':options.category_id})
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
    var that = this;
    urlApi('portal/article/index', "post",{id:this.data.getID.id,category_id :this.data.getID.category_id}).then((res) => {
      e.WxParse.wxParse("agreement", "html",res.data.data.post_content, this, 5); 
      var that = this;
      that.setData({ 
      newsname:res.data.data.post_title,
      newstime:res.data.data.published_time
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