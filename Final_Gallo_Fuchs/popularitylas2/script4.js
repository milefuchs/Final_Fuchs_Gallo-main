d3.csv("datosfinal.csv", d3.autoType).then((data) => {
  // Agrupar los datos por "duena" y calcular la popularidad promedio
  const groupedData = d3.group(data, (d) => d.duena);
  const chartData = Array.from(groupedData, ([duena, songs]) => ({
    duena,
    popularity: d3.mean(songs, (d) => d.popularity),
  }));

  const width = 800;
  const height = 400;

  const chartContainer = d3.select("#chart")
  .append("div")
  .style("display", "flex")
  .style("justify-content", "center");

  const svg = chartContainer
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "hsl(0, 0%, 0%)");

  const margin = { top: 50, right: 20, bottom: 70, left: 200 }; // Aumenté el espacio inferior y izquierdo para dar espacio a los textos

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleBand()
    .domain(chartData.map((d) => d.duena))
    .range([0, innerWidth])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(chartData, (d) => d.popularity)])
    .range([innerHeight, 0])
    .nice();

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
});
