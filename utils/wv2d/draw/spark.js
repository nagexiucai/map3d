define(function(require) {
    var Arc = require('./arc');
    var mixin = require('./mixin');

    function drawArc(ctx, x, y, r, sa, ea, lw, anti, color) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lw || 2;
        ctx.arc(x, y, r, sa, ea, anti);
        ctx.stroke();
        ctx.restore();
    }

    var _opts = {
        color: "rgb(255, 255, 255)",
        lineWidth: 5,
        loop: false,
        speed: 1
    };

    function Sparkarc(pstart, pend, opts) {
        this.circleLineData = null;
        this.opts = null;
        this.start = null;
        this.end = null;
        this.center = null;
        this.radius = null;
        this.angle = null;
        this.arcFrag = Math.PI / 800;
        this.arcs = 40;
        this.speed = 0.05; //times/ms
        this.slowSpeed = 0.0177;
        this.opts = null;

        if (pstart && pend && opts) {
            this.setLocation(pstart, pend, opts);
        }
    }

    var p = Sparkarc.prototype;

    p.play = function() {
        createjs.Tween.get(this, {
            loop: true,
            override: true //当再次调用play方法时覆盖上次的
        }).to({
            angle: (this.start > this.end && this.end < 0) ? (2 * Math.PI + this.end) : this.end
        }, this.circleLineData.length >= 50 ? (this.circleLineData.length / this.speed) : (this.circleLineData.length / this.slowSpeed), createjs.Ease.linear);
    }

    p.paint = function(ctx) {
        var end = this.end;
        var sparkWidth = this.opts.lineWidth;
        ctx.lineCap = "round";
        var color;

        var sparkColorRgba = this.opts.color.replace("rgb", "rgba").replace(")", "") + ",";

        for (var i = (this.angle > this.start + this.arcFrag * this.arcs) ? this.arcs : Math.round((this.angle - this.start) / this.arcFrag); i > 0; i--) {
            if (i < 4) {
                color = 'rgba(255,255,255,' + 1 / i + ')';
            } else {
                color = sparkColorRgba + 3 / i + ')';
            }
            var start = this.angle - i * this.arcFrag;
            var end = start + this.arcFrag;
            drawArc(ctx, this.center.x, this.center.y, this.radius, start, end, sparkWidth, false, color);
            color = sparkColorRgba + 0.35 / (i + 10) + ')';
            drawArc(ctx, this.center.x, this.center.y, this.radius, start, end, this.circleLineData.length >= 50 ? 26 : 10, false, color);
        }
    };

    p.setLocation = function(pstart, pend, opts) {
        this.circleLineData = Arc.prototype.getCircle(pstart, pend);
        var start = this.circleLineData.startAngle,
            end = this.circleLineData.endAngle,
            centerX = this.circleLineData.x,
            centerY = this.circleLineData.y,
            radius = this.circleLineData.radius,
            center = {
                x: centerX,
                y: centerY
            }
        this.opts = mixin(_opts, opts);
        this.start = start;
        this.end = end;

        this.center = center;
        this.radius = radius;
        this.angle = start;
    }

    return Sparkarc;
});