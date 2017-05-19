define(function() {
    return function(ctx, polygon, isLine) {

        ctx.beginPath();
        if (isLine) {
            ctx.save();
            var grad = ctx.createLinearGradient(20, 360, 40, 440);
            grad.addColorStop(0, 'rgb(255,0,0)');
            grad.addColorStop(0.2, 'rgb(255,179,0)');
            grad.addColorStop(0.4, 'rgb(213,255,0)');
            grad.addColorStop(0.6, 'rgb(48,255,0)');
            grad.addColorStop(0.8, 'rgb(0,255,236)');
            ctx.fillStyle = grad;
            ctx.rect(20, 360, 20, 80);
            ctx.fill();
            ctx.restore();

            ctx.font = "15px Arial";
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(255,255,255,0.75)';
            ctx.fillText('高', 30, 350);
            ctx.fillText('低', 30, 460);

        } else {
            ctx.strokeStyle = 'rgba(255,255,255,0.4)';
            ctx.fillStyle = 'rgba(0,40,131,0.35)';
            ctx.lineWidth = 1;
            ctx.moveTo(polygon[0], polygon[1]);

            for (var i = 2; i < polygon.length; i += 2) {
                ctx.lineTo(polygon[i], polygon[i + 1]);
            }

            ctx.closePath();
            ctx.fill();
        }

        ctx.stroke();
    };
});