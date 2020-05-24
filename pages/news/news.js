var {
  urlApi
} = require("../../utils/request.js");
var {
  timestampToTime
} = require("../../utils/util.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    list:[]
  },
// tab切换
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      that.setData({
        id: options.id
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
    urlApi('portal/list/index/id/1', "post").then((res) => {
      if(res.data.code){
        res.data.data.length > 0 && res.data.data.map((item,index)=>{
          item.last_news && item.last_news.length > 0 && item.last_news.map((_item,_index)=>{
            _item.published_time = timestampToTime(_item.published_time)
          })
        })
        that.setData({
          list: res.data.data
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