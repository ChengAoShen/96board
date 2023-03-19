// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum:0,
    nums:0,
    
   },
  /**
   * 更改值函数
   */
  inputChange: function (e) {
     this.setData({ nums: e.detail.value });
},

calculateSum: function () { 
  var nums = this.data.nums.split(','); 
  var sum = 0; 
  sum = parseInt(nums[0])*12+parseInt(nums[1])
//  for (var i = 0;i < nums.length; i++)
 //   if(sun==0)
//   { sum += parseInt(nums[i])*12; } 
   this.setData({ sum: sum }) 
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})