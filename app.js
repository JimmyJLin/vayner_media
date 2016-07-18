const fs = require('fs');
const Converter = require("csvtojson").Converter;

// read csv file from  ./db/source1.csv
const converterOne = new Converter({});
fs.createReadStream("./db/source1.csv").pipe(converterOne);

// read csv file from  ./db/source1.csv
const converterTwo = new Converter({});
fs.createReadStream("./db/source2.csv").pipe(converterTwo);




converterOne.on("end_parsed", function(sourceOne){
  console.log(sourceOne)
})

converterTwo.on("end_parsed", function(sourceTwo){
  console.log(sourceTwo)
})
