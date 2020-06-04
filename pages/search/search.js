// pages/search/search.js
const app = getApp()
var {
  urlApi
} = require("../../utils/request.js");
var searchListAll = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList:[],
    page_type:'',
    page:1,
    keyword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      page_type: options.page_type
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
  },

  //搜索查询
  jumpSearchClick:function(e){

    this.querySearchList();
  },
  
  //搜索内容
  getintsearch:function(e){
    var keyword = e.detail.value;
    this.setData({
      keyword: keyword
    })
  },


  //查看详情
  searchDetailClick: function (e) {
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    var category_id = e.currentTarget.dataset.category_id;
    
    //资讯
    if (type == 1){
      wx.navigateTo({
        url: '/pages/newsdetail/newsdetail?id=' + id + '&category_id=' + category_id
      })
    }
    //活动
    if (type == 3) {
      wx.navigateTo({
        url: '/pagesexercisedetail/exercisedetail?id=' + id +'&category_id=' + category_id
      })
    }
    //心理测评
    if (type == 4) {
      wx.navigateTo({
        url: '/pages/evaluation/evaluation?id=' + id + '&category_id=' + category_id
      })
    }
    //社工圈
    if (type == 5) {
      wx.switchTab({
        url: '/pages/circle/circle'
      })
    }
    
  }, 


  //查询测试集合
  querySearchList: function () {
    var that = this;
    var data = {};
    var page = that.data.page;
    data.page_type = that.data.page_type;
    data.page = page;
    data.keyword = that.data.keyword;
    console.log(data);
    urlApi("portal/Search/index", "post", data).then((res) => {
      console.log(res);
      if (page == 1) {
        searchListAll = [];
      }
      if (res.data.code == 1) {
        
        if (res.data.data == "没有数据"){
          that.setData({//没有更多了显示
            noMore: true,
            loading: true,
          })
        }else{
          if (res.data.data.articles.length > 0) {
            for (var i = 0; i < res.data.data.articles.length; i++) {
              searchListAll.push(res.data.data.articles[i]);
            }
            if (res.data.data.articles.length * page >= res.data.data.page_total && page > 1) {
              that.setData({//没有更多了显示
                noMore: true,
                loading: true,
              })
            }
          } 
        }
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
      }
      console.log(searchListAll);
      that.setData({
        searchList: searchListAll
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
    var that = this;
    that.setData({
      page: 1,
      loading: true,
      noMore: false
    });
    that.querySearchList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (!that.data.loading && !that.data.noMore) {
      that.setData({
        page: ++that.data.page,
        loading: true,
        noMore: false,
      })
      that.querySearchList();
    };
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})