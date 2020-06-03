// pages/redeemnow/redeemnow.js
var {
  urlApi
} = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible1:false,
    num:"",
    id:"",
    addressData:null,
    dataSource:null
  },
  

  handleOpen1:function() {
    this.setData({
      visible1: true
    });
  },
  handleClose1:function() {
    this.setData({
      visible1: false
    });
    this.getData()
  },
  goAddAddress:function() {
    wx.redirectTo({
      url:"/pages/generalinformation/generalinformation"
    })
  },
  getData:function(){
    var that = this;
    var params = {};
    params.num = Number(that.data.num);
    params.id = Number(that.data.id);
    params['address_id']=this.data.addressData.id;
    if(!params['address_id']){
      wx.showToast({
        title: '请填写收货地址',
        icon:'none'
      })
      return;
    }
     urlApi('portal/article/shop_book', "post",params).then((res) => {
       if (res.data.code) {     
        wx.showToast({
          title: "兑换成功",
          icon:'none'
        })
        wx.navigateTo({
          url: '/pages/shopping/shopping',
        })
       }else{
         wx.showToast({
           title: res.data.msg,
           icon:'none'
         })
       } 

     })
   },
  handleClose2:function() {
    this.setData({
      visible1: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      id: options.id,
      num: options.num,
    })
    this.getGoodDetail();
  },
  
  getGoodDetail:function(){
    const that=this;
    let params={};
    params['id']=this.data.id;
    urlApi('portal/article/shop', "post",params).then((res) => {
      if(res.data.code){
       let obj=null;
       res.data.data.address.length>0&&res.data.data.address.map((item,index)=>{
         if(item.default){
          obj=item;
         }
       })
        that.setData({
          dataSource: res.data.data,
          addressData:obj
        })
       }else{
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
    })
  }
})