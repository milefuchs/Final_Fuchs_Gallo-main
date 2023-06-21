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
    
    marginLeft: 10,
    marginBottom: 1000,
    width: 1500,
    nice: true,
    line: true,
    zero: true,
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
