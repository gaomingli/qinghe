// pages/choicerole/choicerole.js
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
        current: 0,
        position: 'right',
        userDetail:'',//用户信息
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
    var data = {};
    data.user_type = current;
    //验证当前角色是否提交信息或是否审核通过
    urlApi('user/Profile/edit', "post", data).then((res) => {
      if (res.data.code == 1) {
        var userInfoDetail = res.data.data;
        var user_status = userInfoDetail.user_status;
        console.log("user_status======" + user_status);
        if (!Number(current)) {
          wx.showToast({
            title: '请选择角色',
            icon: "none"
          })
          return false;
        }
        //普通用户
        if (Number(current) == 2) {
          var data = {};
          data.user_type = 2;
          urlApi("user/Profile/role", "post", data).then((res) => {
            console.log(res);
            if (res.data.code == 1) {
              wx.switchTab({
                url: '/pages/index/index'
              })

            }
          });
        }
        //社工/组织
        if (Number(current) == 3 || Number(current) == 4) {

          if (userInfoDetail.mobile){
            if (Number(user_status) == 2) {//待审核
              wx.navigateTo({
                url: '/pages/underreview/underreview'
              })
            } else if (Number(user_status) == 3) {//审核不通过
              wx.navigateTo({
                url: '/pages/auditfailure/auditfailure?userType=' + Number(current)
              })
            } else if (user_status == 1){
              wx.navigateTo({
                url: '/pages/examine_success/examine_success?userType=' + Number(current)
              })
            }
          }else{
            wx.navigateTo({
              url: '/pages/uploadqualification/uploadqualification?userType=' + Number(current)
            })
          }
          

        }
        //组织
        // if (Number(current) == 4) {
        //   if (user_status == 2) {//待审核
        //     wx.navigateTo({
        //       url: '/pages/underreview/underreview'
        //     })
        //   } else {
        //     wx.navigateTo({
        //       url: '/pages/uploadqualification/uploadqualification?userType=' + Number(current)
        //     })
        //   }

        // }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryUserDetail();
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


  //查询用户详情
  queryUserDetail: function () {
    var that = this;
    var data = {};
    urlApi('user/Profile/index', "post", data).then((res) => {
      console.log(res);
      if (res.data.code == 1) {
        that.setData({
          userDetail: res.data.data,
        })
        let { list } = this.data;
        let listCopy = JSON.parse(JSON.stringify(list));
        listCopy.map((item) => {
          if (res.data.data.user_type == item.id) {
            item.checked = true;
            that.setData({
              current: res.data.data.user_type
            })
          }
        })
        this.setData({ list: listCopy })
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