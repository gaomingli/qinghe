// pages/redeemnow/redeemnow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leavemessage:"留言留言留言留言",
    totalCore:5300,
    core:300,
    num:1,
    score:150,
    visible1:false
  },
  handleOpen1() {
    debugger;
    this.setData({
      visible1: true
    });
  },
  handleClose1() {
    this.setData({
      visible1: false
    });
  },
  handleClose2() {
    this.setData({
      visible1: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // nowChange:function(){
  //   var that = this;
  //   urlApi('portal/article/shop_book', "post",{id:this.data.id}).then((res) => {
  //     if (res.code) {
  //       that.setData({
  //       })
  //     }else{
  //       wx.showToast({
  //         title: res.data.msg
  //       })
  //     } 

  //   })
  // }
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