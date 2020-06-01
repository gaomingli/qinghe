// pages/successful/successful.js
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:"8/20",
    time:'2019-05-21',
    address:'安徽合肥',
    phone:"15552565252",
    projectName:"羽你同行.羽毛球友谊联赛",
    core:300,
    numimg:[
      {url:"../../icon/head1.png"},
      { url: "../../icon/head2.png" },
      { url: "../../icon/head3.png" }
    ],
    id:"",
    fullName:"",
    tel:"",
    category_id:'',
    signUpDetail:''//详细
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      category_id: options.category_id
    })
    // this.setData({id:options.id,fullName:options.full_name,tel:options.tel})
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
    this.querySignUpDetail();
  },


 //查询报名详情
  querySignUpDetail:function(){
    let that = this;
    let data = {};
    data.id = that.data.id;
    data.category_id = that.data.category_id;
    urlApi('portal/article/index', "post", data).then((res) => {
      console.log(res);
      if (res.data.code == 1) {
        that.setData({
          signUpDetail: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }

    })
 },

  // getData:function(){
  //   let that = this;
  //   let params={};
  //   params["id"]=this.data.id;
  //   params["full_name"]=this.data.id;
  //   params["tel"]=this.data.id;
  //   urlApi('portal/article/activity_book', "post",params).then((res) => {
  //   if(res.data.code){
  //     that.setData({
  //       swiperList: res.data.data.banner,
  //       boardList: res.data.data.announcement,
  //       psychological: res.data.data.psychological,
  //       articleData: res.data.data.last_news,
  //       activity: res.data.data.activity,
  //       shopData: res.data.data.product
  //     })
  //   }else{
  //     wx.showToast({
  //       title: res.data.msg
  //     })
  //   }
      
  //   })
  // },

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