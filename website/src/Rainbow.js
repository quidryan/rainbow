import React, { useLayoutEffect } from 'react';

export function Rainbow(props) {

  const canvasRef = React.useRef(null);

  useLayoutEffect(() => {
    const size = props.size, redWeight = props.red, greenWeight = props.green, violetWeight = props.violet;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const weights = redWeight + greenWeight + violetWeight;
    const scalingFactor = size / weights * 3;
    const redWidth = redWeight * scalingFactor;
    const greenWidth = greenWeight * scalingFactor;
    const violetWidth = violetWeight * scalingFactor;

    const greenIncr = (greenWidth - redWidth) / 3;
    const orangeWidth = greenIncr + redWidth;
    const yellowWidth = greenIncr * 2 + redWidth;

    const violetIncr = (violetWidth - greenWidth) / 3;
    const blueWidth = violetIncr + greenWidth;
    const indigoWidth = violetIncr * 2 + greenWidth;

    const colorWidths = {
      'red': redWidth,
      'orange': orangeWidth,
      'yellow': yellowWidth,
      'green': greenWidth,
      'blue': blueWidth,
      'indigo': indigoWidth,
      'violet': violetWidth
    };

    var radius = Object.keys(colorWidths).length * props.size; // starting radius

    canvas.width = radius * 4;
    canvas.height = radius * 2;

    //log(colorWidths);
    var drawArc = function (color) {
      var arcWidth = colorWidths[color];
      context.beginPath();
      context.arc(
        canvas.width / 2,
        canvas.height,
        radius,
        Math.PI,
        2 * Math.PI // end angle
      );
      context.lineWidth = arcWidth;
      context.strokeStyle = color;
      context.stroke();
      context.closePath();
      //log(`${color}: ${arcWidth} from ${radius}`)
      radius += arcWidth;
    };

    Object.keys(colorWidths).reverse().forEach(drawArc);
  }, [props.size, props.red, props.green, props.violet]);

  return (
    <div className="View">
      <canvas ref={canvasRef} width={625} height={400} />
    </div>
  );
}
