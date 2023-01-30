// second/second/second.js
import config from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cutting_url:'',
    host:config.host,
    colorData:[],
    sendData:[],
    send_url:'',
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let url = config.host+options.url
    let url2 = config.host+/data/+options.url
    let id =options.url
    console.log(url2)
    this.setData({
      cutting_url:'http://127.0.0.1:5000/photo/cutting/'+id,
      send_url:url2,
      id:options.url,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  //请求上传的图片
  ask(){
  wx.request({
    url: "",
    method:'GET',
    success: (res) => {
      console.log(res.data)
    },
    fail: (err) => {
      console.log(this.msg)
    },
  })
  },
  //更改值
  formSubmit: function (e) {
    let _this = _his
    console.log(e.detail.value)
    let name = e.detail.value.hang
    let name2 = e.detail.value.lie
    let name3 =(Number(name)-1)*12+Number(name2)
    this.setData({
      sendData:[_this.data.sendData +' '+name3]
    })
    console.log(name3)
  },

//提交行列位置
commit(){
  let _this = this
  console.log(_this.data.send_url)
  wx.request({  
    url: 'http://127.0.0.1:5000/data/'+_this.data.id,
    method:'POST',
    data:{
    "num":[_this.data.sendData]
  },
    success (res) {
      console.log("co函数调用成功")
      console.log(res.data)
      _this.setData({
        colorData:[_this.data.colorData+[ res.data[14][0]+ ','+res.data[14][1]+ ','+res.data[14][2]+','+res.data[14][3]+','+res.data[14][4]+','+res.data[14][5] ] ]
      })
    },
    fail(res){
      console.log("fail")
      console.log(res)
    },
  })
  

},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})