// custom-tab-bar/index.js
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
    urls:[
      '/pages/index/index',
      '/pages/circle/circle',
      '/pages/release/release',
      '/pages/exercise/exercise',
      '/pages/my/my'
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab:function(e){
      var self=this;
      var index=e.currentTarget.dataset.index;
      var urls=self.data.urls
      wx.switchTab({
        url: urls[index],
      })
    }
  }
})
