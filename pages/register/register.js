// pages/register/register.js
const {
  $Toast
} = require('../../components/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1:"",
    value2: "",
    value3: "",
    value4: "",
    flag:true,
    inputNum:10
  },
// 注册
  register:function(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
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
  abx:function(){
    const that=this;
    const { inputNum } = that.data;
    that.setData({ flag:false});
    $Toast({
      content: '已发送验证码',
      type: 'none'
    });
    let time= setInterval(()=>{
      that.setData({ inputNum: that.data.inputNum-1});
      if (that.data.inputNum === 0) {
        that.setData({ flag: true, inputNum: 10 });
        clearInterval(time)
      }
     },1000);
  
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