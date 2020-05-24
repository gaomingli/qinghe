// pages/choicerole/choicerole.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        current: '1',
        position: 'right',
list:[
  { id: 1, src:"/icon/num.png",name:"普通用户"},
  { id: 2, src: "/icon/num.png",name: "社工" },
  { id: 3, src: "/icon/num.png",name: "组织" }
]
  },

  handleListChange({ detail = {} }) {
    this.setData({
      current: detail.value
    });
  },
  goto(){},
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