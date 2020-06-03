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
    list:null,
    userlist:[
      {name:'测试中途如退出，或希望再次查看报告，可返回测试起始页面。'},
      {name:'如遇测试卡顿、无法提交报告等现象，可 以刷新页面或者切换4g网络。'},
      {name:'答案没有对错之分，为了获得准确的评估 报告，请您根据实际情况客观地回答问题'},
      {name:'遇到其它问题可联系平台客服'}
    ]
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