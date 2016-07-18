const fs = require('fs');
const Converter = require("csvtojson").Converter;

// read csv file from  ./db/source1.csv
const converterOne = new Converter({});
fs.createReadStream("./db/source1.csv").pipe(converterOne);

// read csv file from  ./db/source1.csv
const converterTwo = new Converter({});
fs.createReadStream("./db/source2.csv").pipe(converterTwo);




/* First Question: How many unique campaigns ran in February? */
const questionOne = (array)=>{

  // an empty array variable to store all the unique campaigns
  const uniqueCompaigns = [];

  // look through the entire array
  array.forEach((campaign)=>{

    // remove "/" from each of the string in the campaign.date and convert into an array data [month, day, year]
    const date = campaign.date.split("/")

    // check if the array contains months(date[0]) equal to February("2")
    if (date[0] === "2"){

      // check for the first occurance of each campaign
      if (uniqueCompaigns.indexOf(campaign.campaign) === -1) {

        // if cound push the first occurange of camapgin into array uniqueCompaigns
        uniqueCompaigns.push(campaign.campaign)
      }

    }
  })

  // return the lenght of the array uniqueCompaigns
  return uniqueCompaigns.length
}



/* Second Question: What is the total number of conversions on plants? */
const questionTwo = (array) => {

  // set the initial plantConversions value to 0
  let plantConversions = 0;

  // look through the entire array
  array.forEach( (campaign)=>{

    // assign all campaign actions data to variable actions
    const actions = campaign.actions

    // loop through actions and
    actions.forEach((conversion)=>{

      // if there is conversion and action type X
      if (conversion.x && conversion.action === "conversions") {

        // increase the number of plantConversions by the # of conversion of x
        plantConversions += conversion.x

      // if there is conversion and action type Y
      } else if (conversion.y && conversion.action === "conversions"){

        // increase the number of plantConversions by the # of conversion of y
        plantConversions += conversion.y
      }

    })

  })
  return plantConversions
}





/* Third Question: what auidence, asset combination had the least expensive conversions? */





/* Fourth Question: What was the total cost per video view? */



// return parsed data from converterOne
converterOne.on("end_parsed", function(sourceOne){

  // answer to First Question
  console.log("Q1) Number of unique campaigns ran in February: " + questionOne(sourceOne));

  // answer to Second Question

  console.log("Q2) Total number of plants conversion: " +questionTwo(sourceOne))

})

// return parsed data from converterOne
// converterTwo.on("end_parsed", function(sourceTwo){
//   console.log(sourceTwo)
// })
