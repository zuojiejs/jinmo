// index.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        latitude: '',
        longitude: '',
        scale: 14,
        markers: [],
        showClass: false,
        mapHeight: app.globalData.sysInfo.windowHeight * 2,
        showCard: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        this.initPage();
        setTimeout(function(){
            that.setData({
                showCard: true,
                mapHeight: app.globalData.sysInfo.windowHeight * 2 - 300
            });
        }, 2000);
        // wx.getSystemInfo({
        //     success (res) {
        //         that.setData({
        //             mapHeight: res.windowHeight * 2,
        //             mapHeight2: res.windowHeight * 2 - 300
        //         });
        //     }
        // })
        // wx.getLocation({
        //     type: "gcj02",
        //     success: function(res) {
        //         that.setData({
        //             id: 1,
        //             latitude: res.latitude,
        //             longitude: res.longitude,
        //             markers: [{
        //                 id: 0,
        //                 latitude: res.latitude,
        //                 longitude: res.longitude,
        //                 iconPath: '../../img/boy.png',
        //                 width: 40,
        //                 height: 40
        //             }]
        //         })
        //         that.test({
        //             latitude: res.latitude,
        //             longitude: res.longitude
        //         })                
        //     }
        // })        
    },

    //初始化页面
    initPage: function() {
        var that = this;
        wx.getLocation({
            type: 'gcj02',
            success: function(res) {
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                });
                //拉取接口数据
            },
            fail: function(res) {  //用户未允许授权处理
                wx.showModal({
                    title: '提示',
                    content: '定位失败，请稍候重试',
                    success: function(res) {
                        if(res.confirm){

                        }else{

                        }
                    }
                })
            }
        });
    },

    cardClick: function () {

        wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })   
    },

    test: function (obj) {
        var distance = 0.5;
        var lon = 2 * Math.asin(Math.sin(distance / (2 * 6371)) / Math.cos(this.deg2rad(obj.latitude)));
        lon = this.rad2deg(lon);
        var lat = this.rad2deg(distance / 6371);     
        this.data.markers.push({
            id: 2,
            longitude: obj.longitude - lon,
            latitude: obj.latitude - lat,
            iconPath: '../../img/boy.png',
            width: 40,
            height: 40            
        })    
        this.data.markers.push({
            id: 3,
            longitude: obj.longitude + lon,
            latitude: obj.latitude - lat,
            iconPath: '../../img/boy.png',
            width: 40,
            height: 40            
        })    
        this.data.markers.push({
            id: 4,
            longitude: obj.longitude - lon,
            latitude: obj.latitude + lat,
            iconPath: '../../img/boy.png',
            width: 40,
            height: 40            
        })    
        this.data.markers.push({
            id: 5,
            longitude: obj.longitude + lon,
            latitude: obj.latitude + lat,
            iconPath: '../../img/boy.png',
            width: 40,
            height: 40            
        })
        this.setData({
            markers: this.data.markers
        })
    },

    rad2deg: function (angle) {
        return angle * 57.29577951308232 // angle / Math.PI * 180
    },

    deg2rad: function (angle) {
        return angle * 0.017453292519943295 // (angle / 180) * Math.PI;
    },

    /**
     * 点击标记点事件
     */
    markertap: function (e) {
        var that = this;
        this.setData({
            mapHeight: this.data.mapHeight2
        });
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

    }
})