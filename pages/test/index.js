var wxMarkerData = []; 
Page({ 
    data: { 
        markers: [], 
        latitude: '', 
        longitude: '', 
        placeData: {},
        scale: 15
    }, 
    makertap: function(e) { 
        var that = this; 
        var id = e.markerId; 
        that.showSearchInfo(wxMarkerData, id); 
        that.changeMarkerColor(wxMarkerData, id); 
    }, 
    onLoad: function() { 
        var that = this; 
        // 新建百度地图对象 
        // this.setScale();
  
        wx.getLocation({
            type: "gcj02",
            success: function(res) {
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    markers: [{
                        latitude: res.latitude,
                        longitude: res.longitude,
                        iconPath: '../../img/marker_yellow.png'
                    }]
                })
                // that.test({
                //     latitude: res.latitude,
                //     longitude: res.longitude
                // })
            }
        })
        return;
        var BMap = new bmap.BMapWX({ 
            ak: 'u873McMisoB9GdO1pAGlPR5xiobfKmXo' 
        }); 
        var fail = function(data) { 
            console.log(data) 
        }; 
        var success = function(data) { 
            wxMarkerData = data.wxMarkerData; 
            console.log(wxMarkerData);
            that.setData({ 
                markers: wxMarkerData 
            }); 
            that.setData({ 
                latitude: wxMarkerData[0].latitude 
            }); 
            that.setData({ 
                longitude: wxMarkerData[0].longitude 
            }); 
        } 
       // 发起POI检索请求 
        BMap.search({ 
            "query": '酒店', 
            fail: fail, 
            success: success, 
            // 此处需要在相应路径放置图片文件 
            iconPath: '../../img/marker_red.png', 
            // 此处需要在相应路径放置图片文件 
            iconTapPath: '../../img/marker_red.png' 
        }); 
    }, 
    setScale: function () {
        if(this.data.scale > 14){
            return;
        }
        this.setData({
            scale: this.data.scale + 1
        });
        setTimeout(this.setScale, 150);
    },
    showSearchInfo: function(data, i) { 
        var that = this; 
        that.setData({ 
            placeData: { 
                title: '名称：' + data[i].title + '\n', 
                address: '地址：' + data[i].address + '\n', 
                telephone: '电话：' + data[i].telephone 
            } 
        }); 
    }, 
    test: function (obj) {
        var distance = 0.5;
        var lon = 2 * Math.asin(Math.sin(distance / (2 * 6371)) / Math.cos(this.deg2rad(obj.latitude)));
        lon = this.rad2deg(lon);
        var lat = this.rad2deg(distance / 6371);     
        this.data.markers.push({
            longitude: obj.longitude - lon,
            latitude: obj.latitude - lat,
            iconPath: '../../img/marker_red.png'            
        })    
        this.data.markers.push({
            longitude: obj.longitude + lon,
            latitude: obj.latitude - lat,
            iconPath: '../../img/marker_red.png'            
        })    
        this.data.markers.push({
            longitude: obj.longitude - lon,
            latitude: obj.latitude + lat,
            iconPath: '../../img/marker_red.png'            
        })    
        this.data.markers.push({
            longitude: obj.longitude + lon,
            latitude: obj.latitude + lat,
            iconPath: '../../img/marker_red.png'            
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
    changeMarkerColor: function(data, i) { 
        var that = this; 
        var markers = []; 
        for (var j = 0; j < data.length; j++) { 
            if (j == i) { 
                // 此处需要在相应路径放置图片文件 
                data[j].iconPath = "../../img/marker_yellow.png"; 
                data[j].width = 50;
                data[j].height = 50;
            } else { 
                // 此处需要在相应路径放置图片文件 
                data[j].iconPath = "../../img/marker_red.png"; 
            } 
        } 
        that.setData({ 
            markers: data 
        }); 
    } 
})