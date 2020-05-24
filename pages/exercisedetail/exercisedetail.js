// pages/exercisedetail/exercisedetail.js
var {
  urlApi
} = require("../../utils/request.js");
var e = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thumbnail:"",
    post_title:"",
    post_excerpt:"",
    user_nickname:"",
    activity_start:"",
    num:"",
    address:"",
    tel:"",
    coin:"",
    post_content:"",
    activity_book_join_num:"",
    activity_book_people:null,
    getID:{
      id:'',
      category_id:''
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({'getID.id':options.id,'getID.category_id':options.category_id})
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
  getData:function(){
    urlApi('portal/article/index', "post",{id:this.data.getID.id,category_id :this.data.getID.category_id}).then((res) => {
      e.WxParse.wxParse("agreement", "html",res.data.data.post_content, this, 5); 
      var that = this;
      that.setData({
        thumbnail:res.data.data.thumbnail,
        post_title:res.data.data.post_title,
        post_excerpt:res.data.data.post_excerpt,
        user_nickname:res.data.data.user_nickname,
        activity_start:res.data.data.activity_start,
        num:res.data.data.num,
        address:res.data.data.address,
        tel:res.data.data.tel,
        coin:res.data.data.coin,
        activity_book_join_num:res.data.data.activity_book_join_num,
        activity_book_people:res.data.data.activity_book_people
      })
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