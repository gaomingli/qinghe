// pages/mytest/mytest.js
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  current:1,
    list:[
      { id: 1, src: "/icon/test.png", name:"抑郁风险评估测试",num:39702},
      { id: 2, src: "/icon/test.png", name: "幼儿气质类型评估", num: 39702 }
    ],
    list_done: [],
    list_undone: []
  },
  // tab切换
  handleChange({ detail }) {
    this.setData({
      current: detail.key,
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
    urlApi("/user/Profile/my_psychological","post",{}).then((res)=>{
      if(res.data.code){
        this.setData({
          list_done: res.data.data.done_psychological,
          list_undone: res.data.data.undone_psychological,
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