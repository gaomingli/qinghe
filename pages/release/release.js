// pages/release/release.js
var {
  urlApi,
  host
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '', //文本内容
    maxlength: 1000,
    child_category: [],
    item:null,
    photoArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  //键盘输入事件
  input: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  chooseimage: function () {
      var that = this;
      let photoArrCopy=JSON.parse(JSON.stringify(this.data.photoArr))
      wx.chooseImage({
        count: 1,
        success: (res) => {
          var filep = res.tempFilePaths[0];
          wx.uploadFile({
            url: host +"user/Profile/photoUpload",
            filePath: filep,
            header: {},
            name: 'file',
            formData: {
              'token': wx.getStorageSync("tokenn"),
              'fileId': that.data.positiveId,
            },
            success: (val) => {
              let data = JSON.parse(val.data);
              console.log("data===========", data);
              if (data.code == 1) {
                photoArrCopy.push(data.data.photo_path)
                that.setData({
                  photoArr:photoArrCopy     
                })
              }else{
                wx.showToast({
                  title: res.data.msg
                })
              }
            },
            fail: function (err) {
              console.log(err)
            }
          });
        }
      })
  },
  getData: function () {
    var that = this;
    let params = {};
    params['id'] = 13;
    params['page'] = 1;
    urlApi('portal/list/index', "post", params).then((res) => {
      if (res.data.code) {
        res.data.data.child_category.unshift({
          id: 13,
          name: '推荐'
        });
        that.setData({
          child_category: res.data.data.child_category
        })
      } else {
        wx.showToast({
          title: res.data.msg
        })
      }
      wx.hideLoading();
    })
  },
  chooseType: function () {
    let arr = [];
    const that=this;
    that.data.child_category.map(item => {
      arr.push(item.name)
    })
    wx.showActionSheet({
      itemList: arr,
      success(res){
        that.data.child_category.map((item,index)=>{
           if(index==res.tapIndex){
            that.setData({item:item})
           }
       })      
      }
    }, 
    
    )
  },
  //发布按钮事件
  send: function () {
    var that = this;
    wx.showLoading({
      title: '发布中',
    })
    let params={};
    params['categories']=this.data.item.id;
    params['post_content']=this.data.content;
   
   if(!params['categories']){
     wx.showToast({
       title: '请选择分类'
     })
     return;
   }
    if(!params['post_content']){
      wx.showToast({
        title: '请填写内容'
      })
      return;
    }
   let arrcopy=JSON.parse(JSON.stringify(this.data.photoArr));
   let arr=[];
    arrcopy.map((item,index)=>{
     item=item.substr(item.indexOf("upload/")+7,item.length-1);
     arr.push(item)
   })
   params['photo']=arr;
   if(!params['photo'].length){
    wx.showToast({
      title: '请填写图片'
    })
    return;
  }
 
   params['photo']=params['photo'].join('?');

    urlApi('portal/article/circle_publish', "post", params).then((res) => {
      if (res.data.code) {
         that.setData({content:'',photoArr:[],item:null});
         wx.showToast({
          title: res.data.msg,
          icon:"none"
        })
      } else {
        wx.showToast({
          title: res.data.msg
        })
      }
      wx.hideLoading();
    })
  },
  deleteIcon:function(e){
     const {url}=e.target.dataset;
    let {photoArr}=this.data;
    let photoArrCopy=JSON.parse(JSON.stringify(photoArr));
    photoArrCopy.map((item,index)=>{
       if(item==url){
        photoArrCopy.splice(index,1)
       }
    })
     this.setData({photoArr:photoArrCopy})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().setData({
      tabbarIndex: 2
    })
  },
})