// index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        latitude: '',
        longitude: '',
        scale: 14,
        markers: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        wx.getLocation({
            type: "gcj02",
            success: function(res) {
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    markers: [{
                        latitude: res.latitude,
                        longitude: res.longitude,
                        iconPath: '../../img/boy.png',
                        width: 40,
                        height: 40
                    }]
                })
                that.test({
                    latitude: res.latitude,
                    longitude: res.longitude
                })                
            }
        })
    },

    test: function (obj) {
        var distance = 0.5;
        var lon = 2 * Math.asin(Math.sin(distance / (2 * 6371)) / Math.cos(this.deg2rad(obj.latitude)));
        lon = this.rad2deg(lon);
        var lat = this.rad2deg(distance / 6371);     
        this.data.markers.push({
            longitude: obj.longitude - lon,
            latitude: obj.latitude - lat,
            iconPath: '../../img/boy.png',
            width: 40,
            height: 40            
        })    
        this.data.markers.push({
            longitude: obj.longitude + lon,
            latitude: obj.latitude - lat,
            iconPath: '../../img/boy.png',
            width: 40,
            height: 40            
        })    
        this.data.markers.push({
            longitude: obj.longitude - lon,
            latitude: obj.latitude + lat,
            iconPath: '../../img/boy.png',
            width: 40,
            height: 40            
        })    
        this.data.markers.push({
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