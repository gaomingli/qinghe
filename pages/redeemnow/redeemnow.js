// pages/redeemnow/redeemnow.js
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    visible1:false,
    num:"",
    id:"",
    list:null,
    address_id:"",
    leavemessage:""

  },
  handleOpen1() {
    this.setData({
      visible1: true
    });
  },
  handleClose1() {
    this.setData({
      visible1: false
    });
    this.getData()
  },
  getData:function(){
    var that = this;
    var params = {};
    params.num = that.data.num;
    params.address_id= that,data.address_id;
    params.id = that.data.id;
    console.log(data);
     urlApi('portal/article/shop_book', "post",params).then((res) => {
       if (res.data.code) {
         debugger;        
        wx.showToast({
          title: "兑换成功"
        })
       }else{
         wx.showToast({
           title: res.data.msg
         })
       } 

     })
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
      id: options.id,
      num: options.num,
      address_id: options.address_id,
      list:JSON.parse(options.list)
    })
    console.log(JSON.parse(that.data.list));
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