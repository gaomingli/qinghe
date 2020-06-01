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
    current: 0
  },

  return: function() {
    let current = this.data.current
    current--
    this.setData({
      current
    })
  },

  choice: function (e) {
    let current = this.data.current
    let out_order = this.data.listData.out_order
    let id = e.currentTarget.dataset.id
    let currentindex = e.currentTarget.dataset.currentindex
    let that = this

    let ids = this.data.id
    let category_id = this.data.category_id
    urlApi('portal/article/psychological_book', "post", { id: id, out_order: out_order, answer: currentindex + 1 }).then((res) => {
      if (res.data.code) {
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        if (current + 1 == that.data.listData.all_problem.length) {
          wx.navigateTo({
            url: `/pages/report/report?id=${ids}&category_id=${category_id}`,
          })
        } else {
          current++
          that.setData({
            current: current
          })
        }
      } else {
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
    })
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
          title: res.data.msg,
          icon:'none'
        })
      }
    })
  }
})