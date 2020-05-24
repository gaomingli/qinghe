// pages/exercise/exercise.js
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    objData:null,
    list:[
     {name:"进行中",id:0},{name:"过期活动",id:1} 
    ]
  },
  // tab切换
  handleChange({ detail }) {
    // debugger;
    this.setData({
      current: Number(detail.key)
    });
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
   this.getData();
  },

getData:function(){
  var that = this;
  urlApi('portal/list/index/id/2', "post").then((res) => {
    if(res.data.code){
      that.setData({
        objData: res.data.data
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