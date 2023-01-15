// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    goods_photo: '',
    goods_photo_flag: false,
    goods_photo_url: '',
    flag_tp: false

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
                wx.navigateTo({
                  url: '/second/second/second',
                  })
            }
        },
        fail (res) {
            console.log(res.errMsg)
        }
    })
},

//必要函数2
chooseImage() {
  let _this = this
  wx.chooseMedia({
      count: 1,
      mediaType:['image'],
      sourceType: ['album'],
      success (res) {
        console.log(res.tempFiles[0].tempFilePath)
          const tempFilePath = res.tempFiles[0].tempFilePath
          _this.setData({
            goods_photo :tempFilePath,
            goods_photo_flag : true
          })
          wx.uploadFile({
            url: 'http://127.0.0.1:5000/photo', 
            filePath: _this.goods_photo,
            name: 'file',
            success (res){
              const data = res.data
            }
          })
      }
  })
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