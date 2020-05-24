// pages/mycore/mycore.js
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '1',
    totalCore: 0,
    type:[{
      typename:"积分明细",
    }, {
        typename: "兑换记录"
      }],
    list: [{
        id: 1,
      action: "参加活动",
        score: "150",
        time: "2020 - 02 - 22  05: 30"
      },
      {
        id: 2,
        action: "兑换商品",
        score: "-150",
        time: "2020 - 02 - 22  05: 30"
      },
      {
        id: 3,
        action: "参加活动",
        score: "+150",
        time: "2020 - 02 - 22  05: 30"
      },
      {
        id: 4,
        action: "兑换商品",
        score: "-150",
        time: "2020 - 02 - 22  05: 30"
      }
    ],
    list_shop: []
  },
  // tab切换
  handleChange({ detail }) {
    this.setData({
      current: detail.key,
      show: detail.key
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    urlApi("/user/Profile/my_coin","post",{}).then((res)=>{
      if(res.data.code){
        this.setData({
          totalCore: res.data.data.coin,
          list: res.data.data.articles
        })
      }else{
        wx.showToast({
          title: res.data.msg
        })
      }            
    })

    urlApi("/user/Profile/my_shop","post",{}).then((res)=>{
      if(res.data.code){
        this.setData({
          list_shop: res.data.data.articles
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
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})