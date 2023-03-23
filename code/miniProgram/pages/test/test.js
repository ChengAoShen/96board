// pages/test/test.js
import config from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagUrl:'',
    host:config.host,
    id:'',
    text:""
    
   },
  /**
   * 更改值函数
   */




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var url = options.url
    this.setData({
      id:url
    })

    this.ask()

  },
  
  //提交返回字符串
  ask(){
    let that = this
    wx.request({
      url: this.data.host+'/quick_detection/'+this.data.id,
      method:'GET',
      success: (res) => {
        that.setData({
          text:res.data
        })
        console.log(res.data)
         console.log("////////////////")

       },
       fail: (err) => {
         console.log('请求快速检测失败')
       },
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})