// pages/report/report.js
var {
  urlApi
} = require("../../utils/request.js");

var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
list:null,
id:null,
answer:"",
out_order:"",
list:[
  {cont:"感谢您的参与，阅读本报告时，请注意以下事项:"},
  {cont:"阅读时可以先查看图表快速掌握报告内容，然后有针 对性地阅读对应文字;"},
  {cont:"如报告与你自己或他人的感知有出入，可回忆测试时 是否有事情影响了你，或者是否自己答题时有所顾虑;"},
  {cont:"本报告不可作为临床诊断的依据，也不赞成把它作为 你生活和工作中重大决策的唯一依据;"},
  {cont:"如对报告内容有不理解的地方，建议向有专业资质的 人员进行咨询;"},
  {cont:"本报告为专业测评结果，建议你在分享时务必谨慎。"}
],
listPart:[
  {title:"兴趣",data:"打球"},
  {title:"特长",data:"跑步"},
  {title:"所在省份",data:"上海市"},
  {title:"身体状况",data:"身体健康"},
  {title:"气质领域",data:"多血质（活泼）"},
],
dataList:[
  {thumbnail:"/icon/hot1.png",post_title:'情感心理测试',num:58597},
  {thumbnail:"/icon/hot1.png",post_title:'情感心理测试',num:58597},
  {thumbnail:"/icon/hot1.png",post_title:'情感心理测试',num:58597}
]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      id: options.id
    })
  },
 
  retrunHome:function(){
    wx.switchTab({
      url: '/pages/index/index',
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
  getData: function () {
    var that = this;
    urlApi('user/Profile/my_psychological_article', "post", { id: this.data.id}).then((res) => {
      if (res.data.code) {
        that.setData({
          list: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon:"none"
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