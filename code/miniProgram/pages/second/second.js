// second/second/second.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cutConfig:'',
    msg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      cutConfig:options
    })
    console.log(this.data.cutConfig)
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
    url: 'http://127.0.0.1:5000/photoldata/IMG_20221207_172228.jpg',
    method:'GET',
    success: (res) => {
      console.log(res.data)
    },
    fail: (err) => {
      console.log(this.msg)
    },
  })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})