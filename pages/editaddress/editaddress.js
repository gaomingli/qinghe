// pages/editaddress/editaddress.js
const app = getApp()
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    style:0,
    score:"#C6C6C6",
    name: '',
    phone: '',
    address: '',
    area: '',
    id:'',
    addressDetail:''
  },

  chooseAddress: function() {
    let that = this
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        that.setData({
          area: res.address
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.queryAddressDetail();
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
  
  //查询地址详情
  queryAddressDetail:function(){
    var that = this;
    var id = that.data.id;
    var data = {};
    data.id = id;
    urlApi("user/Profile/address_edit", "post", data).then((res) => {
      console.log(res);
      if (res.data.code == 1){
        that.setData({
          addressDetail: res.data.data,
          area: res.data.data.area
        }) 
      }
    })
  },

  /**
   * 确认提交
   */
  formSubmit: function (e) {
    console.log(e);
    var data = e.detail.value;
    var tel = data.tel;
    var full_name = data.full_name;
    var address = data.address;
    var area = data.area;
    data.default=Number(data.default)

    if (!full_name) {
      wx.showToast({
        title: '收货人不能为空',
        icon: 'none'
      })
      return false;
    }

    if (!tel) {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none'
      })
      return false;
    }

    if (!(/^1[345789]\d{9}$/.test(tel))) {
      wx.showToast({
        title: '手机号码有误',
        icon: 'none'
      });
      return false;
    }

    if (!area) {
      wx.showToast({
        title: '请选择所在地址',
        icon: 'none'
      })
      return false;
    }

    if (!address) {
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'none'
      })
      return false;
    }
    data.id = this.data.id;
    urlApi("user/Profile/address_post", "post", data).then((res) => {
      if (res.data.code == 1) {
        var pages = getCurrentPages();
        var prePage = pages[pages.length - 2];
        prePage.onShow();
        wx.navigateBack({
          delta: 1,
        })
      }
    });
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