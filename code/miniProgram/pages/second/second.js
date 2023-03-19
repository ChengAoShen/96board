// second/second/second.js
import config from '../../utils/config'
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
         cutting_url:config.host+'/photo/cutting/'+_this.data.goods_photo_flag
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

  },
  //////sum多值构成数列
  sumup(){
  this.data.sendData.push(this.data.sum)
  this.setData({
    sendData:this.data.sendData
  })
 this.commit()
 console.log("commit again")
  },


//提交行列位置,已修改版本
commit(){
  let _this = this
  console.log(_this.data.send_url)
  wx.request({  
   url: config.host+'/data/'+_this.data.goods_photo_flag,
    method:'POST',
    data:{
    "num":_this.data.sendData
  },
    success (res) {
      console.log("commit函数调用成功")
      let list = res.data
      delete list.__proto__
      console.log(res.data) 


/////////
    //使用for循环遍历数组的元素，并粘上src
////////////将零散的data放到名为{{sum}}的键下
// var a = list[_this.data.sum]; // 获取数字变量 a 的值
// var arr = []; // 定义一个空数组 arr
// a.forEach(function(item, index) {
//   if (index) {
//     arr.push(item);
//   }
// });
///////////////将obj转化为array
var myArray = [];
Object.keys(list).forEach(function(key) {
  myArray.push({
    key: key,
    value: list[key]
  });
});

/////////////
      _this.setData({
   //   colorData:[ res.data[_this.data.sendData][0]+ ','+res.data[_this.data.sendData][1]+ ','+res.data[/_this.data.sendData][2]+','+res.data[_this.data.sendData][3]+','+res.data[_this.data.sendData][4]+','+res.data[_this.data.sendData][5] ].concat(_this.data.colorData)
      colorData:myArray
    //  colorData: Array.from(list).concat(_this.data.colorData)

     //     colorData:arr
  })
    },
    fail(res){
      console.log("fail")
      console.log(res)
    },
  })
},
  
  //新增点击图片删除列表函数
  deleteItem: function(e) {
    console.log(e.currentTarget)
    var index = e.currentTarget.dataset.index;
  
    var colorData =  this.data.colorData                                        //从sendata中删除已经被选择删除的数字
    console.log(index)
 //   var colorData = this.data.colorData).slice();
     colorData.splice(index, 1); 
     this.setData({ 
      colorData: colorData }) 
},

//////

goLast(){
  let that = this
  wx.navigateTo({
    url: '/pages/last/last?data='+JSON.stringify({s: this.data.sendData, id: this.data.goods_photo_flag}),
  })
},


/**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})