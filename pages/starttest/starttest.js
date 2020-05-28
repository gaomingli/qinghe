// pages/starttest/starttest.js
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    listData: null,
    num: 5,
    id: "",
    category_id: "",
    current:0
  },

  choice: function (e) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      id: options.id,
      category_id: options.category_id
    })
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
  getData: function () {
    var that = this;
    urlApi('portal/article/index', "post", { id: this.data.id, category_id: this.data.category_id }).then((res) => {
      if (res.data.code) {
        that.setData({
          listData: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg
        })
      }
    })
  }
})