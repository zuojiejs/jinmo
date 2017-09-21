//app.js
App({
    globalData: {
        sysInfo: null
    },

    onLaunch: function () {
        var t1 = Date.now()
        this.globalData.sysInfo = wx.getSystemInfoSync();
        var t2 = Date.now()
        wx.showToast({
            title: (t2-t1) + '',
            icon: 'success',
            duration: 2000
        })
    }
});
