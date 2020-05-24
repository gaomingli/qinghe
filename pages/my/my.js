// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"一叶知秋",
    num:6005,
    blong:"组织",
    menuList: [
      { id: 1, menu_img: "/icon/my/pay1.png", menu_name: "待付款", url: "/pages/psychometrics/psychometrics" },
      { id: 2, menu_img: "/icon/my/pay2.png", menu_name: "待发货", url: "/pages/news/news" },
      { id: 3, menu_img: "/icon/my/pay3.png", menu_name: "待收货", url: "/pages/exercise/exercise" },
      { id: 4, menu_img: "/icon/my/pay4.png", menu_name: "已完成", url: "/pages/shopping/shopping" },
    ],
    
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
    this.getTabBar().setData({
      tabbarIndex:4
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