// second/second/second.js
import config from '../../utils/config'
var app=getApp();
var host = app.globalData.host;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cutting_url:'',
  //  host:config.host,
    colorData:[],
    sendData:[],
    send_url:'',
    id:'',
    sum:0,
    nums:0,
    goods_photo_flag: '',
    good_url: '',
    flag_tp: false,
    host:config.host,
    inputValue:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
 //   let url = config.host+options.url
 //   let url2 = config.host+/data/+options.url
 //   let id =options.url
 //   console.log(url2)
 //   this.setData({
     // cutting_url:'http://127.0.0.1:5000/photo/cutting/'+id,注：拼接之后未知原因无法正常运行
 //    cutting_url:'http://127.0.0.1:5000/photo/cutting/821e3657-a150-11ed-879e-126fd9321dcb',
 //     send_url:url2,
 //     id:options.url,
//  })
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


  concel(){
  this.setData({
      inputValue: ''
  })

  },
/////////////////////////
    //弹出是否选择照片框架
    uploadImg() {
      let _this = this
      wx.showActionSheet({
        itemList: ['从手机相册选择'],
        success(res) {
          console.log(res.tapIndex)
          if (res.tapIndex == 0) {
            _this.chooseImage()
  
          }
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    },
  
    //选择照片
    chooseImage() {
      let _this = this
      wx.chooseMedia({
        success(res) {
          const tempFilePaths = res.tempFiles[0].tempFilePath
          console.log(tempFilePaths)
          _this.setData({
            flag_tp: true,
            good_url: tempFilePaths
          })
        }
      })
      _this.handIN()
    },
  
  
  
    //上传图片，正确版本
    handIN() {
      console.log("upload image")
      let _this = this;
      wx.uploadFile({
        url:config.host + '/photo',
        filePath: _this.data.good_url,
        name: 'file',
        success(res) {
          _this.setData({
            goods_photo_flag: res.data,
          }),
          console.log(_this.data.goods_photo_flag)
        _this.setData({
         cutting_url:'http://127.0.0.1:5000/photo/cutting/'+_this.data.goods_photo_flag
      })  
          console.log(_this.data.cutting_url)
        },
        fail(res){
          console.log("fail")
          console.log(res)
        }
      })
    },
////////////    



  //请求上传的图片
  ask(){
    let _this = this
  wx.request({
    url: "config.host + '/photo/cutting'",
    method:'GET',
    success: (res) => {
     console.log(res.data)
      console.log("////////////////")
      ///////////////////////
    },
    fail: (err) => {
      console.log(this.msg)
    },
  })
  },
  //更改值，新增更改值的方法
  
  inputChange: function (e) {
    this.setData({ nums: e.detail.value });
},
calculateSum: function () { 
  var nums = this.data.nums.split(','); 
  var sum = 0; 
  sum = parseInt(nums[0])*12+parseInt(nums[1])
   this.setData({ sum: sum }) 
   this.sumup()
   this.commit()
  },
  //////sum多值构成数列
  sumup(){
  this.data.sendData.push(this.data.sum)
  this.setData({
    sendData:this.data.sendData
  })


  },


//提交行列位置,已修改版本
commit(){
  let _this = this
  console.log(_this.data.send_url)
  wx.request({  
   url: 'http://127.0.0.1:5000/data/'+_this.data.goods_photo_flag,
   // url: 'http://127.0.0.1:5000/data/821e3657-a150-11ed-879e-126fd9321dcb',//测试方便版本，记删除
    method:'POST',
    data:{
    "num":_this.data.sendData
  },
    success (res) {
      console.log("co函数调用成功")
      console.log(res.data)
      _this.setData({
        colorData:[ res.data[_this.data.sendData][0]+ ','+res.data[_this.data.sendData][1]+ ','+res.data[_this.data.sendData][2]+','+res.data[_this.data.sendData][3]+','+res.data[_this.data.sendData][4]+','+res.data[_this.data.sendData][5] ].concat(_this.data.colorData)
       // colorData:res.data
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