// pages/exercise/exercise.js
const app = getApp()
var {
  urlApi
} = require("../../utils/request.js");
var activityAllList = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    objData:null,
    list:[
     {name:"活动进行",id:1},{name:"往期活动",id:2} 
    ],
    activityList:[],
    page: 1,
    type:1
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
    this.setData({
      noMore: false,
      loading: false,
      activityAllList: [],
      activityList: [],
      page: 1
    })
    this.queryActivityList();
  },
  // tab切换
  handleChange({ detail }) {
    // debugger;
    var current = detail.key;
    this.setData({
      current: current,
      type: current,
      noMore: false,
      loading: false,
      activityAllList: [],
      activityList: [],
      page: 1
    });
    this.queryActivityList();
  },
  //查询测试集合
  queryActivityList: function () {
    var that = this;
    var data = {};
    var page = that.data.page;
    data.type = that.data.type;
    data.page = page;
    data.id = 2;
    console.log(data);
    urlApi("/portal/list/index", "post", data).then((res) => {
      console.log(res);
      if (page == 1) {
        activityAllList = [];
      }
      if (res.data.code == 1) {

        if (res.data.data.articles.length > 0) {
          for (var i = 0; i < res.data.data.articles.length; i++) {
            activityAllList.push(res.data.data.articles[i]);
          }
          if (res.data.data.articles.length * page >= res.data.data.page_total && page > 1) {
            wx.showToast({
              title: '没有更多数据了',
              icon: "none"
            })
            that.setData({//没有更多了显示
              noMore: true,
              loading: true,
            })
          }
        } else {
          // wx.showToast({
          //   title: '没有更多数据了',
          //   icon: "none"
          // })
          that.setData({//没有更多了显示
            noMore: true,
            loading: true,
          })
        }

        // that.setData({
        //   list_done: res.data.data.done_psychological,
        //   list_undone: res.data.data.undone_psychological,
        // })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
      }
      that.setData({
        activityList: activityAllList
      })
    })
  },

// getData:function(){
//   var that = this;
//   urlApi('portal/list/index/id/2', "post").then((res) => {
//     if(res.data.code){
//       that.setData({
//         objData: res.data.data
//       })
//     }else{
//       wx.showToast({
//         title: res.data.msg
//       })
//     }
    
    
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
    var that = this;
    that.setData({
      page: 1,
      loading: true,
      noMore: false
    });
    that.queryActivityList();
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
      that.queryActivityList();
    };
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})