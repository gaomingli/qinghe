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
    // form:{
    //   value1: "",
    //   value2: "",
    //   value4: ""
    // },
    name: '',
    phone: '',
    address: '',
    area: ''
  },

  getName: function(e) {
    let name = e.detail.detail.value
    this.setData({
      name: name
    })
  },

  getPhone: function(e) {
    let phone = e.detail.detail.value
    this.setData({
      phone: phone
    })
  },

  getAddress: function(e) {
    let address = e.detail.detail.value
    console.log(address);
    this.setData({
      address: address
    })
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
// 验证表单是否填写完整
  submit: function () {
    var that = this
    var form = that.data.form
    for (var item in form) {
      if (!form[item]) {
        wx.showToast({
          title: '请将信息填写完整',
          icon: 'none',
          duration: 1000
        })
        return;
      }
    }
    console.log('地址填写完毕，确认', form);
    let obj = {}
    obj.area = that.data.area;
    // obj.city = ''
    // obj.district = ''
    obj.address = that.data.address;
    obj.full_name = that.data.phone;
    obj.tel = that.data.name;
    console.log(obj);
    urlApi("/user/Profile/address_post","post",obj).then((res)=>{
      console.log(res);
      if(res.data.code){
        // let data = res.data.data.map(v => {
        //   if (v.default == 1) {
        //     v.checked = true
        //   } else {
        //     v.checked = false
        //   }
        //   return v
        // })

        // that.setData({
        //   list: data
        // })
        that.setData({
          style: 1,
          score: '#53B2AA'
        });
        wx.navigateBack({
          delta: 1,
        })
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }            
    })
    
    // wx.navigateTo({
    //   url: '/pages/generalinformation/generalinformation',
    // })
    /**
    * 此处省略表单提交过程
    */
    for (var item in form) { //表单提交成功后清空form表单数据
      form[item] = ''
    }
    that.setData({
      form: form
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