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
    current: 0,
    out_order:''
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
    let out_order =this.data.out_order?this.data.out_order:this.data.listData.out_order
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
            url: `/pages/report/report?id=${ids}`,
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
      category_id: options.category_id,
      out_order: options.out_order? options.out_order:''
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
    if(!this.data.out_order){
      this.getData();
    }else{
      this.getPhy();
    }
  },
  getData: function () {
    var that = this;
    urlApi('portal/article/index', "post", { id: this.data.id, category_id: this.data.category_id }).then((res) => {
      if (res.data.code) {
        debugger;
        that.setData({
          listData: res.data.data,
          out_order:res.data.data.out_order
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
    })
  },
  getPhy: function () {
    var that = this;
    urlApi('user/Profile/my_psychological_article', "post", { id: this.data.id}).then((res) => {
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