d3.csv("datosfinal.csv", d3.autoType).then((data) => {
  console.log(data)
  let chart =   Plot.plot({
    marks: [
      
      Plot.barY(
        data, 
        Plot.groupX({
          y:'sum',
        },
          {
          x: 'artist',
          y: 'duration_ms',
          fill:'duena'
          },
      )),
    ],
    
    nice: true,
    line: true,
    zero: true,
    marginLeft:200,


    x: {
      labelOffset: 35,
      labelAnchor: 'center',
      tickRotate:-45,
    },
    style: {
      background:'hsl(0, 0%, 0%)',
      color: 'white',
    },
    color:{
      legend: true,
      range: ["#1DB954","#B91D82"],
    },
    
    
  });
  d3.select("#chart").append(() => chart);
});
