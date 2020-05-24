// pages/productlist/productlist.js
// const {
//   $Toast
// } = require('../../components/base/index');
var {
  urlApi
} = require("../../utils/request.js");
Page({
  data: {
    value1: "",
    thumbnail: "",
    post_title: "",
    coin: "",
    old_coin: "",
    swiperList:[],
    totalCore: 5000,
    id: ""
  },
    // 数量计算
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      var that=this;
      that.setData({
        id: options.id
      })
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
        if (res.code) {
          that.setData({
            post_title: res.data.data.post_title,
            swiperList: res.data.data.photos,
            coin: res.data.data.coin,
            old_coin: res.data.data.old_coin
          })
        }else{
          wx.showToast({
            title: res.data.msg
          })
        } 

      })
    }
 
})