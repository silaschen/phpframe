var Common = require("../../res/common.js");
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'Province': [],
    'City': [],
    'Area': [],
    'A1': 8,
    'A2': 0,
    'A3': 0,
    name:'',
    tel:"",
    cphm:'',
    addr:'',
    price:'',
    sfz1: '',
    sfz2:'',
    carCert1:'',
    carCert2: '',
    CarCodes: App.data['CarCodes'],
    CarIndex: 0,
    modal:false,
    exImg:'',
    ShowCode:false
  },
  ShowCode: function () {
    this.setData({
      ShowCode: true
    })
  },
  HideCode: function () {
    this.setData({
      ShowCode: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //或许已有信息
  GetUserInfo: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: App.data['API_URL'] + '?m=Mini&a=UserInfo&type=4&sessionkey=' + wx.getStorageSync('sessionkey'),
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          var info = res.data.user;
          if (info != '' && info != null) {
            if ( info.a2 != 0 || info.a3 != 0) {
              that.FullArea(info.a1, info.a2, info.a3);
            }
            
            that.setData({
              name: info.name,
              tel: info.tel,
              addr: info.adr,
              CarIndex:info.cpm,
              cphm: info.cphm.substr(2,5),
              sfz1:info.sfz1,
              sfz2:info.sfz2,
              carCert1:info.xcz1,
              carCert2:info.xcz2,
              price: res.data.info.price
            })
          } else {
            that.setData({
              price: res.data.info.price
            })
          }
        }
      }
    })
  },
  //填充已选区域
  FullArea: function (a1, a2, a3) {
    var ProIndex = '';//省份下标
    var CityIndex = '';//市区下标
    var AreaIndex = '';//县城下标
    var City = [];
    var Area = [];
    for (var i in (this.data.Province)) {
      if ((this.data.Province)[i].id == a1) {
        ProIndex = i;
      }
    }
    //取出城市
    var Allcitys = Common.GetData(2, a1);
    for (var j in Allcitys) {
      if (Allcitys[j].id == a2) {
        CityIndex = j;
      }
    }
    // 取出区域
    var Area = Common.GetData(3, a2);
    for (var k in Area) {
      if (Area[k].id == a3) {
        AreaIndex = k;
      }
    }
    this.setData({
      City: Allcitys,
      Area: Area,
      A1: ProIndex,
      A2: CityIndex,
      A3: AreaIndex
    })
  },
  onLoad: function (options) {
    //初始化地区数据
    this.setData({ 'Province': Common.AreaData1, 'City': Common.GetData(2, Common.AreaData1[8].id) });
    this.setData({ 'Area': Common.GetData(3, this.data.City[0].id) })
  },
  SetArea: function (e) {
    //  console.log(e);
    var i = e.currentTarget.dataset.id;
    var n = e.detail.value; //序号
    if (i == 1) {
      var City = Common.GetData(2, this.data.Province[n].id);
      var Area = Common.GetData(3, City[0].id);
      this.setData({ 'A1': n, 'City': City, 'Area': Area, 'A2': 0, 'A3': 0 })
    } else if (i == 2) {
      var Area = Common.GetData(3, this.data.City[n].id);
      this.setData({ 'Area': Area, 'A2': n, 'A3': 0 })
    } else {
      this.setData({ 'A3': n })
    }
  },
  SubmitData: function (e) {
    console.log(e);
    var formid = e.detail.formId;
    var cphm = e.detail.value.cphm;
    var tel = e.detail.value.tel;
    var adr = e.detail.value.adr;
    var name = e.detail.value.name;
    if (cphm.length != 5) {
      Common.ErrTips('请填写五位车牌号码！')
    } else if (tel == '') {
      Common.ErrTips('请填写联系电话！')
    } else if (name == '') {
      Common.ErrTips('请填写车主姓名！')
    }else if (adr == '') {
      Common.ErrTips('请填写详细地址！')
    }else if(this.data.sfz1==''){
      Common.ErrTips('请上传身份证正面！')
    } else if (this.data.sfz2 == '') {
      Common.ErrTips('请上传身份证反面！')
    }else if(this.data.carCert1==''){
      Common.ErrTips('请上传行车证正本！')
    } else if (this.data.carCert2== '') {
      Common.ErrTips('请上传行车证副本！')
    } else {
      var a1 = this.data.Province[this.data.A1].id;
      var a2 = this.data.City[this.data.A2].id;
      var a3 = this.data.Area[this.data.A3].id;
      wx.showLoading({
        title: '正在提交',
      })
      wx.request({
        url: App.data['API_URL'] + '?m=RePlate&a=MakeOrder&sessionkey=' + wx.getStorageSync('sessionkey'),
        data: { 'formid': formid, 'cphm': cphm, 'tel': tel, 'adr': adr, 'name': name, 'a1': a1, 'a2': a2, 'a3': a3, "sfz1": this.data.sfz1, "sfz2": this.data.sfz2,  "xcz1": this.data.carCert1, "xcz2": this.data.carCert2,"cp":this.data.CarIndex},
        method: 'POST',
        fail: function () {
          wx.hideLoading();
          Common.ErrTips('请求失败！')
        },
        success: function (r) {
          wx.hideLoading();
          if (r.data.code == 1) {
            // 跳转到支付页
            wx.navigateTo({ url: 'pay?id=' + r.data.id });
          } else {
            Common.ErrTips(r.data.msg)
          }
        }
      })
    }
  },
  //删除图片
  DelImg: function (e) {
    var ty = e.currentTarget.dataset.type;
    if (ty == "sfz1") {
      this.setData({
        sfz1: ''
      })
    }
    if (ty == "sfz2") {
      this.setData({
        sfz2: ''
      })
    }
    if (ty == "carCert1") {
      this.setData({
        carCert1: ''
      })
    }
    if (ty == "carCert2") {
      this.setData({
        carCert2: ''
      })
    }

  },
  //选择图片
  ChooseImg: function (e) {
    var ty = e.currentTarget.dataset.type;
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.UploadFile(tempFilePaths, ty);
      }
    })
  },

  //上传照片
  UploadFile: function (data, style) {
    var that = this;
    for (var i in data) {
      wx.uploadFile({
        url: App.data["API_URL"] + '?m=Mini&a=UploadFile',
        filePath: data[i],
        header: {
          'content-type': 'application/json'
        },
        name: 'file',
        success: function (res) {
          var data = JSON.parse(res.data);
          if (data.code == 1) {
            //如果是上传行车证
            if (style == "CarCert1") {
              that.setData({
                carCert1: App.data["API_URL"] + data.file
              })
            }
            if (style == "sfz1") {
              that.setData({
                sfz1: App.data["API_URL"] + data.file
              })
            }
            if (style == "CarCert2") {
              that.setData({
                carCert2: App.data["API_URL"] + data.file
              })
            }
            if (style == "sfz2") {
              that.setData({
                sfz2: App.data["API_URL"] + data.file
              })
            }
          }
        }
      })
    }
  },
  //预览图片
  PreviewImg: function (res) {
    var ty = res.currentTarget.dataset.type;
    if (ty == "sfz1") {
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [this.data.sfz1], // 需要预览的图片http链接列表
      })
    }
    if (ty == "sfz2") {
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [this.data.sfz2], // 需要预览的图片http链接列表
      })
    }
    if (ty == "carCert1") {
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [this.data.carCert1], // 需要预览的图片http链接列表
      })
    }
    if (ty == "carCert2") {
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [this.data.carCert2], // 需要预览的图片http链接列表
      })
    }
  },
  //选择车牌
  ChangeCarCode: function (e) {
    this.setData({
      CarIndex: e.detail.value
    })
  },
  //示例图片
  ShowImg: function (e) {
    var src = e.currentTarget.dataset.img;
    console.log(src);
    this.setData({
      exImg: '../../res/' + src + '.jpg',
      modal: true
    })
  },
  //隐藏模态
  HideModal: function () {
    this.setData({
      modal: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.GetUserInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    App.IsLogin();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  CallUs: function () {
    wx.makePhoneCall({
      phoneNumber: '037168901001'
    })
  }
})