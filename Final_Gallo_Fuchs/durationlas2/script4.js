d3.csv("datosfinal.csv", d3.autoType).then((data) => {
  const duenas = Array.from(new Set(data.map((d) => d.duena)));
  const promedios = duenas.map((duena) => {
    const songs = data.filter((d) => d.duena === duena);
    const promedio = d3.mean(songs, (d) => d.duration_ms);
    return { duena, promedio };
  });

  const sortedPromedios = promedios.sort((a, b) => d3.descending(a.promedio, b.promedio));

  const width = 600;
  const height = 450;

  const svg = d3.select("#chart")
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
});
