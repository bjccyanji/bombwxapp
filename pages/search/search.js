  //index.js
//获取应用实例
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp();
var that;
Page({
   data: {
    writeDiary: false,
    loading: false,
    windowHeight: 0,
    windowWidth: 0,
    limit: 1000,
    name: [],
    modifyDiarys: false,
    totalRecord : 0
  },
  
    onLoad: function () {
    that = this;

  },
  
  onShow: function () {
    var iotest = Bmob.Object.extend("iotest");
    var query = new Bmob.Query(iotest);
    query.descending('createdAt');
    query.include("own")
    // 查询所有数据
    query.limit(that.data.limit);
    query.find({
      success: function (results) {
        // 循环处理查询到的数据
        console.log(results);
        that.setData({
          name: results
        })

 
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
      
    });

    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
})