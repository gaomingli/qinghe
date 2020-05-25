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
    activity_status:0,
    activity_btn_name:"",
    activity_status:'',
    getID:{
      id:'',
      category_id:''
    },
    id:'',
    category_id:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 
      'id': options.id,
      'category_id': options.category_id
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
  getData:function(){
    var that = this;
    var data = {};
    data.id = that.data.id;
    data.category_id = that.data.category_id;
    urlApi('portal/article/index', "post",data).then((res) => {
      console.log(res);
      if(res.data.code){
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
          activity_book_people:res.data.data.activity_book_people,
          activity_btn_name:res.data.data.activity_btn_name,
<<<<<<< HEAD
          activity_status:res.data.data.activity_status
=======
          activity_status: res.data.data.activity_status
>>>>>>> 5573235b08c09c407ca4eda1246bb72da6afbcf2
        })
        e.WxParse.wxParse("agreement", "html",res.data.data.post_content, that, 5); 
      }else{
        wx.showToast({
          title: res.data.msg
        })
      }
    
    })
  },

  //跳转报名页面
  jumpSignUpClick:function(e){
    console.log("id=================" + this.data.id);
    wx.navigateTo({
      url: '../registerinformation/registerinformation?id='+this.data.id
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