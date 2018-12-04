// pages/section/pay.js
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    name: '',
    tel: '',
    money: '',
    code: '',
    stat: '9',
    addr: '',
    company:'',
    num:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
  this.setData({
      orderId: opt.id
    })
    
  },
  //获取订单信息
  GetOrderInfo: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: App.data['API_URL'] + '?m=Exempt&a=orderinfo&id=' + this.data.orderId+'&sessionkey=' + wx.getStorageSync('sessionkey'),//改成你自己的链接
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        if(res.data.code==1){
          that.setData({
            money: res.data.info.fee,
            code: res.data.info.cphm,
            name: res.data.info.name,
            stat: res.data.info.status,
            tel: res.data.info.tel,
            company: res.data.info.express,
            num: res.data.info.expressnum,
            wtd:res.data.info.wtadr,
            addr: res.data.info.a1 + res.data.info.a2 + res.data.info.a3 + res.data.info.adr
          })
        }
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   this.GetOrderInfo();
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    App.IsLogin();
  },


//去支付
  ToPay: function () {
    var that =this;
    wx.request({
      url: App.data['API_URL'] + '?m=Exempt&a=GetPay&id=' + this.data.orderId +'&sessionkey=' + wx.getStorageSync('sessionkey'),
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        console.log('调起支付');
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                wx.navigateTo({
                  url: 'order',
                })
              }
            })
             
          },
          'fail': function (res) {
            wx.showToast({
              title: '支付失败',
              image: '../../res/fail.png',
              duration: 3000
            });
          },
          'complete': function (res) {
            console.log('complete');
          }
        });
      },
      fail: function (res) {
        console.log(res.data)
      }
    });
  },
  //取消订单
  CancelOrder:function(){
    var that=this;
    wx.showLoading({
      title: '取消中',
    });
    wx.request({
      url: App.data['API_URL'] + '?m=Exempt&a=UserCancel&id=' + this.data.orderId+'&sessionkey=' + wx.getStorageSync('sessionkey'),
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success:function(res){
        wx.hideLoading();
        if(res.data.code==1){
          that.setData({
            stat:0
          })
        }
      }
    })
  },
  //确认收货
  GetLetter:function(){
    var  that = this;
    wx.showModal({
      title: '提醒',
      content: '确定已收到货？',
      confirmColor: "#129FE7",
      success:function(res){
        if(res.confirm){
          wx.request({
            url: App.data['API_URL'] + '?m=Exempt&a=ConfirmOrder&id=' + that.data.orderId + '&sessionkey=' + wx.getStorageSync('sessionkey'),
            header: {
              'Content-Type': 'application/json'
            },
            method: 'GET',
            success: function (res) {
              if (res.data.code == 1) {
                that.setData({
                  stat: 4
                })
              }
            }
          })
        }
      }
    })
    
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

  }
})