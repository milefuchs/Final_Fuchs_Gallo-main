d3.csv("datosfinal.csv", d3.autoType).then((data) => {
  
  const arianaData = data.filter((d) => d.artist === "Ed Sheeran");

  
  const duenaSumData = d3.rollup(
    arianaData,
    (v) => d3.sum(v, (d) => d.duration_ms),
    (d) => d.duena
  );

  // Convertir los datos en un array de objetos
  const chartData = Array.from(duenaSumData, ([duena, sum]) => ({ duena, sum }));

  let chart = Plot.plot({
    marks: [
      Plot.barY(chartData, {
        x: "duena",
        y: "sum",
        fill: "duena",
      }),
    ],
    nice: true,
    line: true,
    zero: true,
    marginLeft:100,
    width:200,


    x: {
      labelOffset: 35,
      labelAnchor: "center",
    },
    
    style: {
      background: "hsl(0, 0%, 0%)",
      color: "white",
    },
    color: {
      range: ["#B91D82"],
    },
  });

  d3.select("#chart")
    .style("background-color", "black")
    .append(() => chart);
});
