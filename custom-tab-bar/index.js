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
    this.getUserList()
    let that = this
    setInterval(function() {
      that.getUserList()
    }, 5000)
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
        console.log(res);
        if (res.data.code == 1) {
          that.setData({
            userDetail: res.data.data
          })
          wx.setStorageSync('userInfo', res.data.data)
        } 
      })
    }
  }
})
