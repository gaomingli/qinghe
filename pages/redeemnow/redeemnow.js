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
    address_id:"",
    dataSource:null

  },
  handleOpen1() {
    this.setData({
      visible1: true
    });
  },
  handleClose1() {
    this.setData({
      visible1: false
    });
    this.getData()
  },
  getData:function(){
    var that = this;
    var params = {};
    params.num = that.data.num;
    params.address_id= that,data.address_id;
    params.id = that.data.id;
    console.log(data);
     urlApi('portal/article/shop_book', "post",params).then((res) => {
       if (res.data.code) {     
        wx.showToast({
          title: "兑换成功"
        })
       }else{
         wx.showToast({
           title: res.data.msg
         })
       } 

     })
   },
  handleClose2() {
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
        that.setData({
          dataSource: res.data.data
        })
      }else{
        wx.showToast({
          title: res.data.msg
        })
      }
      
    })



  }

})