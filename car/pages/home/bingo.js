// pages/home/bingo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  CallMe:function(){
    wx.showModal({
        title: '拨打电话',
        content: '是否向我拨打电话，咨询相关问题？',
        showCancel:true,
        success:function(res){
            if(res.confirm){
                wx.makePhoneCall({
                    phoneNumber: '15890602030'
                })
            }
        }
    })
  },
  AddContact:function(){
      wx.addPhoneContact({
          firstName: '杨林',
          organization:'宾果智造',
          hostNumber:'0371-88884224',
          workAddressCountry:'中国',
          workAddressState:'河南',
          workAddressCity:'郑州',
          email:'mail@binguo.me',
          url:'http://binguo.me',
          weChatNumber:'15890602030',
          mobilePhoneNumber:'15890602030',
          photoFilePath:'../../res/author.jpg',
          remark:'微信平台|小程序|APP|软件开发',
          success:function(){
              wx.showToast({
                  title: '感谢您保留我的名片!',
                  duration:3000
              })
          }
      })
  }
})