// pages/generalinformation/generalinformation.js
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  choiceAddressClick:function(e){
   let params= e.currentTarget.dataset.item;
   params.default=1;
    urlApi("/user/Profile/address", "post",params).then((res) => {
      if (res.data.code) {
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  // 编辑地址
  eduit_address: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/editaddress/editaddress?id=' + id
    })
  },

  delete: function(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定删除该条数据？',
      success (res) {
        if (res.confirm) {
          that.deleteSure(id)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  textHide: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      // title: '提示',
      content: '确定删除此地址?',
      success(res) {
        if (res.confirm) {
          var data = {};
          data.id = id;
          urlApi("/user/Profile/address_delete", "post", data).then((res) => {
            wx.showToast({
              title: res.data.msg,
              icon: "none"
            })
            that.queryAddressList();
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    this.queryAddressList();
  },

 //查询地址集合
  queryAddressList: function(){
    urlApi("/user/Profile/address", "post", {}).then((res) => {
      if (res.data.code) {
        let data = res.data.data.map(v => {
          if (v.default == 1) {
            v.checked = true
          } else {
            v.checked = false
          }
          return v
        })

        this.setData({
          list: data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },

  radioChange: function(e) {
    let id = e.detail.value
    let list = this.data.list.map(v => {
      if (v.id == id) {
        v.checked = true
      } else {
        v.checked = false
      }
      return v
    })

    this.setData({
      list
    })
    wx.navigateTo({
      url: '/pages/redeemnow/redeemnow'
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