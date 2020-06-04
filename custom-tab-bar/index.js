// custom-tab-bar/index.js
var {
  jsEvent
} = require("../utils/util");
var {
  urlApi
} = require("../utils/request.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbarIndex:0,
    userDetail: {},
    urls:[
      '/pages/index/index',
      '/pages/circle/circle',
      '/pages/release/release',
      '/pages/exercise/exercise',
      '/pages/my/my'
    ]
  },
  created() {
    this.getUserList();
    this.queryMenuIsShow();
    let that = this
    setInterval(function() {
      that.getUserList()
    },6000)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab:function(e){
      jsEvent(e);
    },
    switchTab1:function(e){
      var self=this;
      var index=e.currentTarget.dataset.index;
      var urls=self.data.urls
      wx.switchTab({
        url: urls[index],
      })
    },
    getUserList: function() {
      let data = {}
      let that = this
      urlApi('user/Profile/index', "post", data).then((res) => {
        if (res.data.code == 1) {
          that.setData({
            userDetail: res.data.data
          })
          res.data.data.coin=res.data.data.coin.split('.')[0];
          wx.setStorageSync('userInfo', res.data.data)
        } 
      })
    },
    //菜单显示问题:0隐藏 1显示
    queryMenuIsShow: function () {
      var that = this;
      urlApi('user/profile/nav', "post", {}).then((res) => {
        console.log("res======", res);
        if (res.data.code) {
          that.setData({
            isShowMenu: res.data.data.status,
          })

        }
      })
    },
  }
})
