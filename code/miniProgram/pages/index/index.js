// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */

 
  data: {
    goods_photo_flag:'',
    good_url: '',
    flag_tp: false

  },

  //跳转到第二页
  JumpNext(){
    let _this = this
    wx.reLaunch({
      url: '/pages/second/second?url='+_this.data.goods_photo_flag,
    })
  },

  //跳转函数1
  uploadImg () {
    let _this = this
    wx.showActionSheet({
        itemList: ['从手机相册选择'],
        success (res) {
            console.log(res.tapIndex)
            if (res.tapIndex == 0) {
                _this.chooseImage()
            }
        },
        fail (res) {
            console.log(res.errMsg)
        }
    })
},

//选择照片
chooseImage() {
  let _this = this
  wx.chooseMedia({
    success (res) {
      const tempFilePaths = res.tempFiles[0].tempFilePath
      console.log(tempFilePaths)
      _this.setData({
        flag_tp: true,
        good_url:tempFilePaths
      })
    }
  })
 
},

//上传图片
handIN(){
  let _this = this
  wx.uploadFile({
    url: 'http://127.0.0.1:5000/photo', 
    filePath: _this.data.good_url,
    name: 'file',
    formData: {
      'user': 'test'
    },
    success (res){
      const data = res.data
      console.log(data)
      _this.setData({
        goods_photo_flag:data
      })
    }
  })
  _this.JumpNext()
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  //加载图片并跳转下一页

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})