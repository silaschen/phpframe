// pages/section/order.js
var App = getApp();
var inte1 = false, inte2 = false, inte3 = false,ready=true;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur: ['', '', ''],
    index: '',
    datalist: [],
    p1: '1',
    p2: "1",
    p3: '1',
    overDatalist: [],
    waitDatalist: [],
    nodata1: false,
    nodata2: false,
    nodata3: false
  },
  //滑动切换页面
  ChangePage: function (e) {
    var index = e.detail.current;
    if (index == 0) {
      this.setData({
        cur: ['active', '', ''],
        index: index
      });
    }
    if (index == 1) {
      this.setData({
        cur: ['', 'active', ''],
        index: index
      });
    }
    if (index == 2) {
      this.setData({
        cur: ['', '', 'active'],
        index: index
      });
    }
  },
  //点击切换页面
  CurPage: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      index: index
    })
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
    this.setData({
      cur: ['active', '', '']
    });
    
  },
  //获取全部订单
  GetOrder: function (event, page) {
    if (inte1 == false) {
      inte1 = true;
      wx.showLoading({
        title: '加载中',
      })
      var that = this;
      wx.request({
        url: App.data['API_URL'] + '?m=Drive&a=myorder&status=&sessionkey=' + wx.getStorageSync('sessionkey'),
        method: "GET",
        data: { "p": page },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          wx.hideLoading();
          if (res.data.code == 0) {
            that.setData({
              nodata1: true
            })
          } else {
            inte1 = false;
            if (event == "ready") {
              that.setData({
                datalist: res.data.list,
                p1: 2
              });
            } else {
              that.setData({
                datalist: that.data.datalist.concat(res.data.list),
                p1: (that.data.p1) * 1 + 1
              });
            }

          }
        }
      })
    }
  },
  //获取已支付的订单
  GetOverOrder: function (event, page) {
    if (inte2 == false) {
      inte2 = true;
      wx.showLoading({
        title: '加载中',
      })
      var that = this;
      wx.request({
        url: App.data['API_URL'] + '?m=Drive&a=myorder&status=2&sessionkey=' + wx.getStorageSync('sessionkey'),
        method: "GET",
        data: { "p": page },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {

          wx.hideLoading();
          if (res.data.code == 0) {
            that.setData({
              nodata2: true
            })
          } else {
            inte2 = false;
            if (event == "ready") {
              that.setData({
                overDatalist: res.data.list,
                p2: 2
              })
            } else {
              that.setData({
                overDatalist: that.data.overDatalist.concat(res.data.list),
                p2: (that.data.p2) * 1 + 1
              })
            }

          }
        }
      })
    }
  },
  //获取待支付订单
  GetWaitOrder: function (event, page) {
    if (inte3 == false) {
      inte3 = true;
      wx.showLoading({
        title: '加载中',
      })
      var that = this;
      wx.request({
        url: App.data['API_URL'] + '?m=Drive&a=myorder&status=1&sessionkey=' + wx.getStorageSync('sessionkey'),
        method: "GET",
        data: { "p": page },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          wx.hideLoading();
          if (res.data.code == 0) {
            that.setData({
              nodata3: true 
            })
          } else {
            inte3 = false;
            if (event == "ready") {
              that.setData({
                waitDatalist: res.data.list,
                p3: 2
              })
            } else {
              that.setData({
                waitDatalist: that.data.waitDatalist.concat(res.data.list),
                p3: (that.data.p3) * 1 + 1
              })
            }
          }
        }
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    App.IsLogin();
    this.GetOrder("ready", 1);
    this.GetOverOrder("ready", 1);
    this.GetWaitOrder("ready", 1);

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    inte1=false;
    inte2=false;
    inte3=false;
    ready = true;
    this.setData({
      nodata1: false,
      nodata2: false,
      nodata3: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    inte1 = false;
    inte2 = false;
    inte3 = false;
    ready = true;
    this.setData({
      nodata1: false,
      nodata2: false,
      nodata3: false
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (res) {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (res) {
    if (this.data.index == 0) {
      this.GetOrder("pull", this.data.p1);
    }
    if (this.data.index == 1) {
      this.GetOverOrder("pull", this.data.p2);
    }
    if (this.data.index == 2) {
      this.GetWaitOrder("pull", this.data.p3);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})