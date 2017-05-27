define(function(require, exports, module) {

    var chinaData = require('./data/china.js'),
        cityData = require('./data/city.js'),
        Draw = require('./draw/draw.js'),
        PulseCircle = require('./draw/PulseCircle.js'),
        Arc = require('./draw/arc.js'),
        Spark = require('./draw/spark.js'),
        FrameManager = require('./draw/AnimationScene.js'),
        trendToColor = require('./draw/trendToColor.js');

    function View() {
        this.mapCanvas = document.getElementById('map-canvas');
        this.lineCanvas = document.getElementById('line-canvas');
        this.sparkCanvas = document.getElementById('animation-canvas');
        this.isMobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);

        this.drawMap = new Draw(this.mapCanvas);
        this.drawMap.geojson(chinaData, !this.isMobile);

        this.line = new Arc(this.lineCanvas);

        this.fmgr = new FrameManager(this.sparkCanvas);
        this.fmgr.start();
        this.sparks = [];
        this.pulseCircles = [];
    };

    View.prototype.render = function(routesArray, direction) {
        var view = this;

        view.clear();

        /*动画逻辑*/
        for (var i = 0, length = routesArray.length; i < length; i++) {

            var spark = this.sparks[i];
            var pulseCircle = this.pulseCircles[i];

            if (!spark) {
                spark = new Spark();
                this.sparks.push(spark);
            }
            if (!pulseCircle) {
                pulseCircle = new PulseCircle();
                this.pulseCircles.push(pulseCircle);
            }

            var r = routesArray[i];

            this.line.drawArc(cityData[r.start], cityData[r.end], {
                color: trendToColor(routesArray[0].trend, routesArray[length - 1].trend, r.trend)
            }); //轨道线

            if (this.line.getCircle(cityData[r.start], cityData[r.end]).length >= 50) {
                if (!!direction) {
                    pulseCircle.setLocation(cityData[r.end][0], cityData[r.end][1], {
                        color: trendToColor(routesArray[0].trend, routesArray[length - 1].trend, r.trend)
                    });
                } else {
                    pulseCircle.setLocation(cityData[r.start][0], cityData[r.start][1], {
                        color: trendToColor(routesArray[0].trend, routesArray[length - 1].trend, r.trend)
                    });
                }
                this.fmgr.addShape(pulseCircle); //点动画
            }

            spark.setLocation(cityData[r.start], cityData[r.end], {
                color: trendToColor(routesArray[0].trend, routesArray[length - 1].trend, r.trend)
            });

            this.fmgr.addShape(spark);
            spark.play(); //线动画
        }

    };

    View.prototype.clear = function() {
        this.line.clearRect();
        this.fmgr.clear();
    }

    return View;
});