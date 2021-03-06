var {
  urlApi
} = require("../../utils/request.js");
var {
  timestampToTime
} = require("../../utils/util.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    page:1,
    id:1,
    dataObject:null,
    searchValue:"",
    searchList:[],
  },
// tab切换
  handleChange({ detail }) {
    const {dataObject}=this.data;
    this.setData({
      current: Number(detail.key),
      id:dataObject.child_category[Number(detail.key)].id,
      page:1,
      'dataObject.articles':[]
    });
    // debugger;
    this.getData()
  },

  onShow: function () {
    this.setData({
      searchValue:"",
      searchList:[],
    })
    this.getData();
  },
  getSearch:function(){
    this.getSearchValue();
  },
  getintsearch:function(e){
    this.setData({searchValue:e.detail.value})
    this.getSearchValue();
  },
  getSearchValue:function(){
    var that = this;
    urlApi('portal/Search/index', "post",{keyword:this.data.searchValue,page_type:2}).then((res) => {
    if(res.data.code){
     if(res.data.data!=="没有数据"){
      that.setData({
        searchList:res.data.data
      })
     } else{
      wx.showToast({
        title:"暂无数据",
        icon:'none'
      }) 
      that.setData({
        searchList:[]
      }) 
     }
    }else{
      that.setData({
        searchList:[]
      }) 
    }  
    })
  },

  //查询按钮
  searchIndexClick: function () {
    wx.navigateTo({
      url: '/pages/search/search?page_type=2',
    })
  },

  getData:function(){
    var that = this;
    urlApi('portal/list/index', "post",{page:this.data.page,id:this.data.id}).then((res) => {
      if(res.data.code){     
        res.data.data.child_category.unshift({id:1,name:'推荐'});
        res.data.data.articles.length>0&&res.data.data.articles.map((item,index)=>{
          item.published_time = timestampToTime(item.published_time)
        })
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

    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
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