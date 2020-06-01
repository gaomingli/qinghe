// pages/registerinformation/registerinformation.js
var {
  urlApi
} = require("../../utils/request.js");
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
    this.setData({'id':options.id,category_id: options.category_id})
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
      let that = this;
      let params={};
      params["id"]=this.data.id;
      params["full_name"]=this.data.value1;
      params["tel"]=this.data.value2;
      urlApi('portal/article/activity_book', "post",params).then((res) => {
        if(res.data.code){
          wx.navigateTo({
            url:`/pages/successful/successful?category_id=${this.data.category_id}&id=${this.data.id}`
          })
          // that.setData({
          //   swiperList: res.data.data.banner,
          //   boardList: res.data.data.announcement,
          //   psychological: res.data.data.psychological,
          //   articleData: res.data.data.last_news,
          //   activity: res.data.data.activity,
          //   shopData: res.data.data.product
          // })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
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