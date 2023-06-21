// using d3 for convenience
let main = d3.select("main");
let scrolly = main.select("#scrolly");
let $figure = scrolly.select("figure");
let wChart = 1200
let hChart = wChart * 0.5;
let dataChart = [];
let $step;


// initialize the scrollama
let scroller = scrollama();

// fetch data
d3.csv("datosfinal.csv", d3.autoType).then(function (data) {
    dataChart = data;
    // kick things off
    init();
  });

function handleStepExit(response) {
  // if ($step) {
  console.count("classed");
  d3.select(response.element).classed("is-active", false);
  // }
}

// scrollama event handlers
function handleStepEnter(response) {
  // console.log(response);
  $step = d3.select(response.element);

  // add color to current step only
  // if ($step) {
  $step.classed("is-active", true);
  console.count("classed");
  // }

  $step.style("background", "#000000");


  // create new chart
  const key = $step.attr("data-step");
  


  // console.log("response.element", response.element);
  // console.log("$step", $step);
  // console.log("key", key);

  //createChart(key);
  if(key == 'grafico1'){
    grafico1()
  }else if(key == 'grafico2'){
    grafico2()
  } else if(key == 'grafico3'){
    grafico3()
  }
}

function handleStepProgress(response) {
  // console.log(response);
  // $figure.style("opacity", response.progress);
  // $step = d3.select(response.element);
  // console.log($step.attr("data-step"));
  $step.select(".progress").text(d3.format(".1%")(response.progress));
}

function init() {
  // 1. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 2. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.33,
      debug: false,
      progress: true,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
    .onStepProgress(handleStepProgress);
}

/* DataViz */
function grafico1() {
  
    let chart1 =   Plot.plot({
        marks: [
          
          Plot.barY(
            dataChart, 
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
  var padre = d3.select("#scrolly figure")
  padre.selectAll("*").remove();
  d3.select("#scrolly figure").append(() => chart1);
}
function grafico2(){
  var padre = d3.select("#scrolly figure")
  padre.selectAll("*").remove();
    const duenas = Array.from(new Set(dataChart.map((d) => d.duena)));
    const promedios = duenas.map((duena) => {
      const songs = dataChart.filter((d) => d.duena === duena);
      const promedio = d3.mean(songs, (d) => d.duration_ms);
      return { duena, promedio };
    });
  
    const sortedPromedios = promedios.sort((a, b) => d3.descending(a.promedio, b.promedio));
  
    const width = 600;
    const height = 450;
  
    const svg = d3.select("#scrolly figure")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background", "hsl(0, 0%, 0%)");
  
    const margin = { top: 20, right: 100, bottom: 50, left: 80 };
  
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
  
    const xScale = d3.scaleBand()
      .domain(sortedPromedios.map((d) => d.duena))
      .range([0, innerWidth])
      .padding(0.1);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(sortedPromedios, (d) => d.promedio)])
      .range([innerHeight, 0]);
  
    const colorScale = d3.scaleOrdinal()
      .domain(duenas)
      .range(["#B91D82", "#1DB954"]);
  
    const bars = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .selectAll("rect")
      .data(sortedPromedios)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.duena))
      .attr("y", (d) => yScale(d.promedio))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.promedio))
      .attr("fill", (d) => colorScale(d.duena));
  
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat((d) => d + " ms");
  
    svg.append("g")
      .attr("transform", `translate(${margin.left},${innerHeight + margin.top})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "1em")
      .attr("fill", "white")
      .style("font-family", "Arial")
      .style("font-size", "10px"); // Ajuste del tamaño de la letra
  
    svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis)
      .selectAll("text")
      .attr("dx", "1em")
      .attr("fill", "white")
      .style("font-family", "Arial")
      .style("font-size", "10px"); // Ajuste del tamaño de la letra
  
    svg.append("text")
      .attr("x", innerWidth / 2 + margin.left)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-family", "Arial")
      .style("font-size", "12px") // Ajuste del tamaño de la letra
      .text("Usuario");
  
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2 - margin.top)
      .attr("y", margin.left - 60)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-family", "Arial")
      .style("font-size", "12px") // Ajuste del tamaño de la letra
      .text("Duración Promedio (ms)");
}
function grafico3() {
  
  var padre = d3.select("#scrolly figure")
  padre.selectAll("*").remove();
    const groupedData = d3.group(dataChart, (d) => d.duena);
    const chartData = Array.from(groupedData, ([duena, songs]) => ({
      duena,
      popularity: d3.mean(songs, (d) => d.popularity),
    }));
  
    const width = 800;
    const height = 400;

    const svg = d3.select("#scrolly figure")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background", "hsl(0, 0%, 0%)");

    const margin = { top: 50, right: 20, bottom: 70, left: 100 }; // Aumenté el espacio inferior y izquierdo para dar espacio a los textos

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
      .domain(chartData.map((d) => d.duena))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.popularity)])
      .range([innerHeight, 0])
      .nice(); // Extender el eje y

    const colorScale = d3.scaleOrdinal()
      .domain([0, d3.max(chartData, (d) => d.popularity)])
      .range(["#B91D82", "#1DB954"]);

    const bubbles = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .selectAll("circle")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.duena) + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(d.popularity))
      .attr("r", (d) => d.popularity * 2)
      .attr("fill", (d) => colorScale(d.popularity));

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
      .attr("transform", `translate(${margin.left},${innerHeight + margin.top})`)
      .call(xAxis)
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("fill", "white")
      .style("font-family", "Arial")
      .style("font-size", "12px")

    svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis)
      .selectAll("text")
      .attr("fill", "white")
      .style("font-family", "Arial")
      .style("font-size", "12px")

    svg.append("text")
      .attr("x", innerWidth / 2 + margin.left)
      .attr("y", height - 10) // Ajusté la posición vertical del texto
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-family", "Arial")
      .style("font-size", "12px")    .text("Dueña");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2 - margin.top)
      .attr("y", margin.left - 30) // Ajusté la posición vertical del texto
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-family", "Arial")
      .style("font-size", "12px")
      .text("Popularidad Promedio");
  
/*   d3.select("#scrolly figure figure").remove();
  d3.select("#scrolly figure").append(() => chart3); */
}