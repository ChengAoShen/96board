// second/second/second.js
import config from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cutting_url:'',
    host:config.host,
    colorData:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let url = config.host+options.url
    console.log(url)
    this.setData({
      cutting_url:url
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
//提交行列位置
commmit(){
  _this = this
  wx.request({
    url: '_this.data.host',
    success (res) {
      console.log("co函数调用成功")
      _this.setData({
        colorData:res.data
      })
    }
  })

},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})