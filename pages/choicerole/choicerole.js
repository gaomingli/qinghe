// pages/choicerole/choicerole.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        current: 0,
        position: 'right',
list:[
  { id: 2, src:"/icon/ptuser.png",name:"普通用户",checked:false},
  { id: 3, src: "/icon/shegong.png",name: "社工",checked:false },
  { id: 4, src: "/icon/zuzhi.png",name: "组织",checked:false }
]
  },

  handleListChange({ detail = {} }) {
    console.log(detail);
    this.setData({
      current: detail.value
    });
    let  listCopy=JSON.parse(JSON.stringify(this.data.list));
    listCopy.map(item=>{
      item.checked=false
    })
    listCopy.map((item,index)=>{
        if(item.id===Number(detail.value)){
           item.checked=true
        }
    })
     this.setData({list:listCopy});
  },
  //进入按钮
  goto:function(){
    var that = this;
    var current = that.data.current;
    if (!Number(current)){
      wx.showToast({
        title: '请选择角色',
        icon: "none"
      })
      return false;
    }
    //普通用户
    if (Number(current) == 2){
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
    //社工
    if (Number(current) == 3) {
      wx.navigateTo({
        url: '/pages/uploadqualification/uploadqualification?userType=' + Number(current)
      })
    }
    //组织
    if (Number(current) == 4) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化角色
     this.setData({current:wx.getStorageSync('userInfo').user_type||2 })
     let {list}=this.data;
      let listCopy=JSON.parse(JSON.stringify(list));
      listCopy.map((item)=>{
         if(this.data.current==item.id){
           item.checked=true;
         }
      })
      this.setData({list:listCopy})
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