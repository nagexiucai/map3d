define(function(require) {

    var drawPolygon = require('./polygon.js');

    function Draw(canvas) {
        this.ctx = canvas.getContext('2d');
    }

    Draw.prototype.geojson = function(geojson, hasName) {
        this.ctx.font = 'normal 5px normal';
        for (var i in geojson) {
            for (var j = 0; j < geojson[i][1].length; j++) {
                drawPolygon(this.ctx, geojson[i][1][j]);
            }

            if (hasName) {
                this.ctx.fillStyle = 'rgba(255,255,255,0.75)';
                this.ctx.textAlign = 'center';

                this.ctx.fillText(i, geojson[i][0][0], geojson[i][0][1]);
            }
        }
        this.drawLegend();
    };

    Draw.prototype.drawLegend = function() {
        drawPolygon(this.ctx, undefined, true);
    }

    return Draw;
});