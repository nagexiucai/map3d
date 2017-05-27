define(function(require) {
    var mixin = require('./mixin');
    var minR = 1;
    var maxR = 15;
    var speed = 0.4;
    var fadeoutSpeed = 0.02;
    var fadeRSpeed = 0.02;
    var _opts = {
        color: "rgb(226,197,116)"
    };


    function Circle(x, y, opts) {
        this.centerX = null;
        this.centerY = null;
        this.opts = null;
        this.pulseR = null;
        this.fadeR = null;
        this.alpha = null;

        if (x && y && opts) {
            this.setLocation(x, y, opts);
        }

    }
    Circle.prototype.setLocation = function(x, y, opts) {
        this.centerX = x;
        this.centerY = y;
        this.pulseR = minR;
        this.fadeR = maxR;
        this.alpha = 0;
        this.opts = mixin(_opts, opts);
    }

    Circle.prototype.draw = function(ctx) {

        var pulseCircle_color_rgba = this.opts.color.replace("rgb", "rgba").replace(")", "") + ",";
        ctx.beginPath();
        ctx.strokeStyle = pulseCircle_color_rgba + this.alpha + ")";
        ctx.arc(this.centerX, this.centerY, this.fadeR, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.closePath();
        ctx.stroke();

        if (this.pulseR < maxR) {
            ctx.beginPath();
            ctx.strokeStyle = this.opts.color;
            ctx.shadowColor = this.opts.color;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 2;
            ctx.arc(this.centerX, this.centerY, this.pulseR, 0, 2 * Math.PI);
            ctx.lineWidth = 1;
            ctx.stroke();

        }

    }

    Circle.prototype.paint = function(ctx) {
        if (this.pulseR >= maxR) {
            this.pulseR = minR;
        } else {
            this.pulseR += speed;
            this.pulseR = +this.pulseR.toFixed(1);
            if (this.pulseR >= maxR) {
                this.alpha = 0.5;
                this.fadeR = maxR;
            } else {
                if (this.alpha > 0) {
                    this.alpha -= fadeoutSpeed;
                    this.fadeR -= fadeRSpeed;
                    this.fadeR = +this.fadeR.toFixed(2);
                    this.alpha = +this.alpha.toFixed(2);
                } else {
                    this.alpha = 0;
                }
            }
        }
        this.draw(ctx);
    }

    return Circle;
});