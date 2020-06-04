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
    out_order:'',
    currIndex:-1,//当前选中答案
  },

  return: function() {
    let current = this.data.current
    current--
    this.setData({
      current
    })
  },

  choice: function (e) {
    let that = this;
    let current = this.data.current;
    let out_order =this.data.out_order?this.data.out_order:this.data.listData.out_order;
    let id = e.currentTarget.dataset.id;
    let currentindex = e.currentTarget.dataset.currentindex;
    let ids = this.data.id;
    let category_id = this.data.category_id;
    //选中效果
    var listData = that.data.listData;
    listData.all_problem[current].currIndex = currentindex;
    that.setData({
      listData: listData
    })
    setTimeout(function () {
      var data = {};
      data.id = id;
      data.out_order = out_order;
      data.answer = currentindex + 1;
      console.log(data);
      urlApi('portal/article/psychological_book', "post", data).then((res) => {
        console.log(res);
        if (res.data.code) {
          // that.setData({
          //   currIndex: -1
          // })
          // wx.showToast({
          //   title: res.data.msg,
          //   icon:'none'
          // })
          if (current + 1 == that.data.listData.all_problem.length) {
            wx.redirectTo({
              url: '/pages/report/report?out_order=' + out_order,
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
            icon: 'none'
          })
        }
      })
    }, 200);
    

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
    if (!this.data.out_order) {
      this.getData();
    } else {
      this.getPhy();
    }
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
  getData: function () {
    var that = this;
    urlApi('portal/article/index', "post", { id: this.data.id, category_id: this.data.category_id }).then((res) => {
      console.log(res);
      if (res.data.code) {
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
    urlApi('user/Profile/my_psychological_article', "post", { out_order: this.data.out_order}).then((res) => {
      console.log(res);
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