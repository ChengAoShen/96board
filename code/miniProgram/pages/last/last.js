// pages/last/last.js
import config from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:'',
    id:'',
    rs:'',
    host:config.host,
    resrc:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var data = JSON.parse(options.data);
    let s = data.s;
    let id = data.id;
    this.setData({
      rs:s,
      id:id
    })
    this.ask()
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

  },

  //
  previewImg: function (e) {
    var imgUrl = this.data.imgUrl;
    wx.previewImage({
      current: imgUrl, // 当前显示图片的http链接
      success: function (res) {
        console.log('预览成功！');
      }
    })
  },
  //
  ask(){
    let that = this
    console.log(config.host + '/analyse/'+that.data.id)
console.log("aaa")
    wx.request({
      url: config.host + '/analyse/'+that.data.id, 
      method:'POST',
      data: {
        "num":that.data.rs,
        "mode":1
      },
      success (res) {
        console.log(res.data)
        let src = res.data
        that.setData({
          imgUrl:config.host+'/photo/analyse/'+src
        })
      },
      fail: (err) => {
        console.log('发生错误')
      },
    })
  },

 //////
 
 goLast(){
  let that = this
  wx.navigateTo({
    url: '/pages/last/last?data='+JSON.stringify({s: this.data.sendData, id: this.data.goods_photo_flag}),
  })
},
 
  //
})