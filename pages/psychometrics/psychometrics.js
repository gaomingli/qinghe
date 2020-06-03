// pages/psychometrics/psychometrics.js
var {
  urlApi,host
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //分类导航
    menuListObj:{},
    current:0,
    id:3,
    page:1,
    host:host
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
  getCurrent:function(e){
    const { type,id } = e.currentTarget.dataset;
    this.setData({current:type,id:id,
      'menuListObj.hot_psychological':[],
      'menuListObj.last_news.articles':[],
      page:1
    });
    wx.showLoading({
      title: '',
    })
     this.getData();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData(); 
  },
  getData:function(){
    var that = this;
    let params={};
    params['page']=this.data.page;
    params['id']=this.data.id;
    urlApi('portal/list/index', "post",params).then((res) => {
      if(res.data.code){
        // res.data.data.child_category.unshift({id:3,name:'推荐'});
        // 此时应对数组拼接
        if(that.data.menuListObj&&that.data.menuListObj.last_news&&that.data.menuListObj.last_news.articles){
          res.data.data.last_news.articles=that.data.menuListObj.last_news.articles.concat(res.data.data.last_news.articles)
        }
        this.setData({menuListObj:res.data.data})
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:"none"
        })
      } 
      wx.hideLoading();
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
    let {page} =this.data;
    this.setData({page:page+1})
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})