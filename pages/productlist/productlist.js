// pages/productlist/productlist.js
// const {
//   $Toast
// } = require('../../components/base/index');
var {
  urlApi
} = require("../../utils/request.js");
Page({
  data: {
    value1: 1,
    list:null,
    totalCore: "",
    id: "",
    address_id:""
  },
    // 数量计算
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      var that=this;
      that.setData({
        id: options.id,
        address_id:options.address_id
      })
    },
    handleChange({ detail }) {
      this.setData({
          value1:this.data.value1+1
      })
  },
  nowChange:function(){
    var that=this;
    wx.navigateTo({ url: '/pages/redeemnow/redeemnow?list=' 
    + JSON.stringify(that.data.list) + '&num=' + that.data.value1 +'&id=' + that.data.id });
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
      this.getData();
    },
    getData:function(){
     var that = this;
      urlApi('portal/article/shop', "post",{id:this.data.id}).then((res) => {
        if (res.data.code) {        
          that.setData({
            list:res.data.data
          })
        }else{
          wx.showToast({
            title: res.data.msg
          })
        } 

      })
    }
 
})