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
    shop_img: "/icon/books.png",
    title: "小鸭子办公室沙发抱枕靠垫",
    points: 2650,
    price: 120,
    totalCore: 5000,
    id: "",
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
      debugger;
      // var that = this;
      // urlApi('portal/article/shop', "post", {
      //   token: "",
      //   id: id
      // }).then((res) => {
      //   if (res.code) {
      //     $Toast({
      //       content: '请求成功',
      //       type: 'error'
      //     });
      //     that.setData({
      //       value1: res.data.data.articles,
      //       banner: res.data.data.banner
      //     })
      //   } 

      // })
    }
 
  }
})