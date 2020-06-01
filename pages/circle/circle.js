// pages/circle/circle.js
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: {},
    id:13,
    page:1,
    dataObject:null,
    popTop: 0, //弹出点赞评论框的位置
    popWidth: 0, //弹出框宽度
    isShow: true, //判断是否显示弹出框
    currentTab:0, 
    flag:false,
    flag1:false,
    postId:0,
    current1:-1,
    obj:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTabBar().setData({
      tabbarIndex: 1
    })
  
  },
   //点击 这个方法会触发bindChange()方法
  switchNav(e) {
    let isSelect = e.target.dataset.current;
    let id = e.target.dataset.id;
    this.setData({
      currentTab: isSelect,
      id:id,
      page:1,
      'dataObject.articles':[]
    })
    wx.showLoading({
      title: ''
    })
     this.getData();
  },

  // 点击了点赞评论
  TouchDiscuss: function (e) {
      const {postid} = e.target.dataset;
      let {flag}=this.data;
      this.setData({flag:!flag,postId:postid,flag1:false})
  },
  bindinput:function(e){
  },
  TouchZanUser:function(e){
    const {postid,active,userid,id,} = e.currentTarget.dataset;
    let {flag1}=this.data;
    let  params={}
     params['postid']=postid;
     params['userid']=userid
     params['id']=id;
    this.setData({flag1:!flag1,current1:active,obj:params,flag:false})
  },
  bindconfirm:function(e){
    const that=this;
    let params={};
    params['post_id'] = that.data.postId;
    params['content'] =e.detail.value;
    wx.showLoading({
      title: '提交中'
    })
    urlApi('portal/article/circle_comment', "post",params).then((res) => {
      if(res.data.code){   
        
      // 先让其对应的id遍历
      // let {dataObject} =that.data;
      // let dataObjectCopy=JSON.parse(JSON.stringify(dataObject));
      // dataObjectCopy.articles.map(item=>{
      //     if(item.id==that.data.postId){
      //       item.comment.push({content:params['content'],post_id:params['post_id']});
      //     }
      // })
       //当确认后应重新刷新数据   
      that.setData({'dataObject.articles':[],page:1},()=>{
        that.getData();
      })

      }else{
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
      that.setData({flag:false,});
    })
  },
  bindconfirm1:function(e){
  
  const {postid,userid,id}=this.data.obj;
   let params={};
   params['id']=id;
   params['to_user_id']=userid;
   params['post_id']=postid;
   params['content']=e.detail.value;

    const that=this;
    wx.showLoading({
      title: '提交中'
    })
    urlApi('portal/article/circle_comment', "post",params).then((res) => {
      if(res.data.code){   
       //当确认后应重新刷新数据   
      that.setData({'dataObject.articles':[],page:1,current1:-1})
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
      that.setData({flag1:false},()=>{
        that.getData();
      });
    })
  },
  // 点击图片进行大图查看
  LookPhoto: function (e) {
    var that=this;
    let arr =[];
    e.currentTarget.dataset.urls.map(item=>{
      arr.push(item.url)
    })
    wx.previewImage({
      current: e.currentTarget.dataset.photurl,
      urls:arr
    })
  },
  bindinput:function(e){

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({dataObject:null,page:1,id:13},()=>{
      this.getData();
    })
  },
  getData:function(){
    var that = this;
    let params={};
    params['id']=this.data.id;
    params['page']=this.data.page;
    urlApi('portal/list/index', "post",params).then((res) => {
      if(res.data.code){     
        res.data.data.child_category.unshift({id:13,name:'推荐'});
        // 此时应对数组拼接
        if(that.data.dataObject&&that.data.dataObject.articles){
          res.data.data.articles=that.data.dataObject.articles.concat(res.data.data.articles)
        }
        this.setData({dataObject:res.data.data})
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
    wx.hideLoading();
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
    this.getData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let {page} =this.data;
    this.setData({page:page+1})
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})