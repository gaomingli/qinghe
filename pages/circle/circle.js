// pages/circle/circle.js
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSource:[],
    animation: {},

    contnet: [{
      'firstname': '张三',
      'content': '你好漂亮呀！！'
    },
    {
      'firstname': '李四',
      'content': '纳尼！！'
    },
    {
      'firstname': '王五',
      'content': '鬼扯咧'
    },
    {
      'firstname': '王宝',
      'content': '昨晚11点左右，一则郑爽胡彦斌疑似复合的消息刷爆各大论坛，微博在深夜11点热度高达200万直接爆掉，中国意难忘又开始了！！！'
    }
    ],

    popTop: 0, //弹出点赞评论框的位置
    popWidth: 0, //弹出框宽度
    isShow: true, //判断是否显示弹出框

    photoWidth: wx.getSystemInfoSync().windowWidth /5,//朋友圈图片宽度
    winHeight: 900,//scroll-view高度
    currentTab: 2,     //当前显示tab的下标
    navTab: ['推荐', '社区', '动态', '发现','活动'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
   //点击 这个方法会触发bindChange()方法
  switchNav(e) {
    //console.log(e);
    let isSelect = e.target.dataset.current;
    this.setData({
      currentTab: isSelect,

    })
  },

   //切换swiper
  bindChange(e) {
    console.log(e); 
    let isSelect = e.detail.current;

    this.setData({  
      currentTab: isSelect
    })
    
  },
  // toDetail(val) {
  //   console.log(val.detail)
  //   let obj = JSON.stringify(val.detail);
  //   wx.navigateTo({
  //     url: '../orderDetail/orderDetail?item=' + encodeURIComponent(obj)
  //   })
  //},

  // 点击了点赞评论
    TouchDiscuss: function (e) {
      var that=this;
    // this.data.isShow = !this.data.isShow
    // 动画
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
      delay: 0,
    })

    if (that.data.isShow == false) {
      that.setData({
        popTop: e.target.offsetTop - (e.detail.y - e.target.offsetTop) / 2,
        popWidth: 0,
        isShow: true
      })

      // 0.3秒后滑动
      setTimeout(function () {
        animation.width(0).opacity(1).step()
        that.setData({
          animation: animation.export(),
        })
      }, 100)
    } else {
      // 0.3秒后滑动
      setTimeout(function () {
        animation.width(120).opacity(1).step()
        that.setData({
          animation: animation.export(),
        })
      }, 100)

      that.setData({
        popTop: e.target.offsetTop - (e.detail.y - e.target.offsetTop) / 2,
        popWidth: 0,
        isShow: false
      })
    }
  },


  // 点击图片进行大图查看
  LookPhoto: function (e) {
    var that=this;
    wx.previewImage({
      current: e.currentTarget.dataset.photurl,
      urls: that.data.resource,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获取设备高度
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.windowWidth);
        // console.log(res.windowHeight);
        _this.setData({
          winHeight: res.windowHeight
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().setData({
      tabbarIndex: 1
    })
    this.getData();
  },
  getData:function(){
    var that = this;
    urlApi('portal/list/circle', "post",{}).then((res) => {
      if(res.data.code){
        that.setData({
          dataSource: res.data.data
        })
      }else{
        wx.showToast({
          title: res.data.msg
        })
      }
      
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