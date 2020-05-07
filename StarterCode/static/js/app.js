
// 1. Use the D3 library to read in samples.json

function buildPlots(id) {

    // Fetch the JSON data and console log it
    d3.json("../data/samples.json").then((data) => {
      console.log(data);
  
  
      // Filter it - rank
      var value = data.samples.filter(i => i.id.toString() === id)[0];
      console.log(value);
  
      //Slice and get the first 10
      var sample_values = value.sample_values.slice(0, 10).reverse();
  
      //Create variable with the first 10 - Label for the bar chat
      var top10_otu = value.otu_ids.slice(0, 10).reverse();
  
      //Define the hovertext for the chart
      var otu_labels = value.otu_labels.slice(0, 10);
  
    //   2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs
      
    //Plot the bar chart
      var trace1 = {
        type: "bar",
        x: sample_values,
        y: top10_otu.map(d => "OTU " + d),
        orientation: "h",
        text: otu_labels,
      };
  
      var data1 = [trace1];
  
      var layout = {
        title: `Top 10 OTUs`,
        yaxis: {
          tickmode: "linear",
        }
      };
  
    //   3. Create a bubble chart that display each sample

      Plotly.newPlot("bar", data1, layout);
  
      //Plot the bubble chart
      var trace2 = {
        x: value.otu_ids,
        y: value.sample_values,
        mode: "markers",
        marker: {
          size: value.sample_values,
          color: value.otu_ids
        },
        text: value.otu_labels
      };
  
      var data2 = [trace2];
  
      var layout_b = {
        xaxis: { title: "OTU ID" },
        height: 600,
        width: 1000
      };
  
      Plotly.newPlot("bubble", data2, layout_b);
  
    });
  }
  
  // 4. Displaying sample metadata, i.e, an individual's demographic information
  function metadata(id) {
  
    //fetch metadata - json
    d3.json("../data/samples.json").then((data) => {
  
      //define metadata and print 
      var metadata = data.metadata;
      console.log(metadata)
  
      //filter by id
      var filtered_data = metadata.filter(sample => sample.id.toString() === id)[0];
  
      //select demo info to print data + pushing it to HTML div tag id = "sample-metadata"
      var demo_info = d3.select("#sample-metadata")
  
      //clear already existing data inside the HTML
      demo_info.html("")
  
      //Use `Object.entries` to add each key and value pair to be displayed 
      Object.entries(filtered_data).forEach((key) => {
        demo_info.append("h5").text(key[0] + ": " + key[1] + "\n");
      });
    });
  }
  
  //Change event function
  function optionChanged(id) {
    buildPlots(id);
    metadata(id);
  }
  

//   Dropdown menu
  //Function to render data
  function init() {
    //reading the data
    d3.json("../data/samples.json").then((data) => {
      console.log(data)
  
      //selection of the drop down menu
      var dropdownmenu = d3.select("#selDataset");
  
      //set ids as options on the dropdown menu
      data.names.forEach(function (name) {
        dropdownmenu.append("option").text(name).property("value");
      });
  
      //display data and plots
      buildPlots(data.names[0]);
      metadata(data.names[0]);
    });
  }
  
  init();