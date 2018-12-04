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
    address: '',
    company: '',
    num: '',
    mapurl: '',
    lon: "",
    lat: ''
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
      url: App.data['API_URL'] + '?m=Check&a=orderinfo&id=' + this.data.orderId + '&sessionkey=' + wx.getStorageSync('sessionkey'),//改成你自己的链接
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        if (res.data.code == 1) {

          that.mapCtx = wx.createMapContext('myMap');
          that.setData({
            money: res.data.info.fee,
            code: res.data.info.cphm,
            name: res.data.info.name,
            stat: res.data.info.status,
            tel: res.data.info.tel,
            company: res.data.info.express,
            num: res.data.info.expressnum,
            wtd: res.data.info.wtadr,
            address: res.data.info.address,
            mapurl: res.data.info.url,
            lat: res.data.info.lat,
            lon: res.data.info.lon,
            markers: [
              {
                iconPath: "../../res/location.png",
                id: 0,
                latitude: res.data.info.lat,
                longitude: res.data.info.lon,
                width: 30,
                height: 30
              }
            ]
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
    // 使用 wx.createMapContext 获取 map 上下文

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    App.IsLogin();
  },

  OpenAdr: function () {
    var that = this;
    console.log(that.data.lat);
    wx.openLocation({
      latitude: that.data.lat*1,
      longitude: that.data.lon*1,
      scale: 28
    })
  },

  //去支付
  ToPay: function () {
    var that = this;
    wx.request({
      url: App.data['API_URL'] + '?m=Check&a=GetPay&id=' + this.data.orderId + '&sessionkey=' + wx.getStorageSync('sessionkey'),
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
  CancelOrder: function () {
    var that = this;

    wx.showLoading({
      title: '取消中',
    });
    wx.request({
      url: App.data['API_URL'] + '?m=Check&a=UserCancel&id=' + this.data.orderId + '&sessionkey=' + wx.getStorageSync('sessionkey'),
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            stat: 0
          })
        }
      }
    })
  },
  //确认收货
  GetLetter: function () {
    var that = this;
    wx.showModal({
      title: '提醒',
      content: '确定已收到货？',
      confirmColor: "#129FE7",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: App.data['API_URL'] + '?m=Check&a=ConfirmOrder&id=' + that.data.orderId + '&sessionkey=' + wx.getStorageSync('sessionkey'),
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
  //剪切板
  CopyAdr: function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.mapurl,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '成功复制到剪切板',
              icon: 'success',
              duration: 2000
            })

          }
        })
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