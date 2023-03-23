// second/second/second.js
import config from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pre:'',
    cutting_url:'',
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
    flag:1,
    mode:0,
    src:"http://127.0.0.1:5001/static/image/icon.png"
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
  //
  introduction(){
    wx.showToast({
      title: 'mode:1(R-G) , 2(R-B) , 3(G-B) , 4(R/B-G/B) , 5(R/G-B/G) , 6(G/R-B/R)',
      icon:'none',
      duration:5000,
    })
  },

  //
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },
// 检验mode输入格式并获取值
getMode1:function (e){
  this.setData({
    inputValue:e.detail.value
  })
  this.getMode()
},

getMode :function (e) {
  console.log('getMode被调用')
  let input = this.data.inputValue 
  if (input !== "1" && input !== "2"&& input !== "3"&& input !== "4"&& input !== "5"&& input !== "6" && input !== " ") {  
    wx.showToast({
      title: '请正确输入模式数字',
      icon:'error'
    })
  } else {
    this.setData({ mode:input});  
  }
},

////////其他新增要求//////////////////////
//////////图片＋行列输入板块///////////////
    //弹出是否选择照片框架
    uploadImg() {
      let _this = this
      wx.showActionSheet({
        itemList: ['从手机相册选择'],
        success(res) {
          console.log(res.tapIndex)
          if (res.tapIndex == 0) {
            // _this.chooseImage()
  
          }
          //
          wx.chooseMedia({

            success:res => {
              const tempFilePaths = res.tempFiles[0].tempFilePath
              console.log(tempFilePaths)
              _this.setData({
                flag_tp: true,
                good_url: tempFilePaths
              })
              _this.handIN()
            },
            fail:res=>{
              console.log("本机图片src生成fail")
            }
          })
          //

        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    },
  
    //选择照片
    chooseImage() {
      let _this = this

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
    this.setData({pre:e.detail.value});

},
//
test(){
  let that = this
  let input = this.data.pre
  let regex = /^\d+,\d+$|^\d+,\d+$/
if (!regex.test(input)) {
wx.showToast({
  title: '输入格式错误',
  icon:'error',
  duration:1000,
})
} else {
this.setData({ nums: input });
that.calculateSum()
}
},
//
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

var myArray = [];
Object.keys(list).forEach(function(key) {
  myArray.push({
    key: key,
    value: list[key]
  });
});

/////////////
      _this.setData({
      colorData:myArray
  })
  //
  let colorData = _this.data.colorData
  let src = _this.data.src
  colorData.forEach(data => {
    data.src =src;
    console.log(data.src);
   console.log("添加src成功")
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
    console.log(e.currentTarget.dataset)
    var index =parseInt( e.currentTarget.dataset.key);  
    var colorData =  this.data.colorData                                        
    var sendData =  this.data.sendData                                        
    //从sendata中删除已经被选择删除的数字
    console.log(index)
    //var colorData = this.data.colorData).slice();
     colorData.splice(index, 1); 
     console.log("成功实现返回index删除数据")
     let id = sendData.indexOf(index);
     console.log('id')
     console.log(id)
     sendData.splice(id,1);
     this.setData({ 
 //     colorData: colorData,
      sendData:sendData,
    }) 
    this.commit()
},

//////

goLast(){
  let that = this
  if(that.data.mode){
  wx.navigateTo({
    url: '/pages/last/last?data='+JSON.stringify({s: this.data.sendData, id: this.data.goods_photo_flag,mode:this.data.mode}),
  })
}
},


/**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})