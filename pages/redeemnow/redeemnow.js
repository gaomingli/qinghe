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
    dataSource:null,
    flag:false,
    addressInfo:null
  },
  onShow:function(){
   let addressInfo=  wx.getStorageSync('addressInfo');
   if(addressInfo){
      this.setData({
       flag:true,
       addressInfo:addressInfo
      })
   }
  },
  goAddAddress:function() {
    wx.redirectTo({
      url:"/pages/generalinformation/generalinformation"
    })
    wx.setStorageSync('addressInfo',{id:this.data.id})
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
  getData:function(){
    var that = this;
// 判断是否选择了地址
if(!flag){
  if(!that.data.addressData){
    wx.showToast({
      title: '地址不能为空',
      icon:'none'
    })
    return;
  }
}else{
// 判断是否选择了地址
  if(!wx.getStorageSync('addressInfo').DizhiInfo){
    wx.showToast({
      title: '地址不能为空',
      icon:'none'
    })
    return;
  }
}
    var params = {};
    params.num = Number(that.data.num);
    params.id = Number(that.data.id);
    params['address_id']= that.data.flag?wx.getStorageSync('addressInfo').DizhiInfo.id:this.data.addressData.id;
    if(!params['address_id']){
      wx.showToast({
        title: '请填写收货地址',
        icon:'none'
      })
      return;
    }
     urlApi('portal/article/shop_book', "post",params).then((res) => {
       if (res.data.code) {     
        wx.navigateTo({
          url: '/pages/redemptionsucceess/redemptionsucceess',
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
      id: options.id||6,
      num: options.num||1,
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