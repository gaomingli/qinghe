// pages/registerinformation/registerinformation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1:"",
    value2:"",
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({'id':options.id})
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
  submit:function(){
  
wx.navigateTo({
  url:`/pages/successful/successful?id=${this.data.id}&fullName=${this.data.value1}&tel=${this.data.value2}`
})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  bindTap:function(e){
    this.setData({value1:e.detail.detail.value})
  },

  bindTapPhone:function(e){
    this.setData({value2:e.detail.detail.value})
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