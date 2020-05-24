// pages/mycore/mycore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '1',
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
    ]
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