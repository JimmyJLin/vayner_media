const fs = require('fs');
const Converter = require("csvtojson").Converter;

// read csv file from  ./db/source1.csv
const converterOne = new Converter({});
fs.createReadStream("./db/source1.csv").pipe(converterOne);

// read csv file from  ./db/source1.csv
const converterTwo = new Converter({});
fs.createReadStream("./db/source2.csv").pipe(converterTwo);




/* First Question: How many unique campaigns ran in February? */

function questionOne(array){

  // an empty array variable to store all the unique campaigns
  let uniqueCompaigns = [];

  // look through the entire array
  array.forEach( (campaign) => {

    // remove "/" from each of the string in the campaign.date and convert into an array data [month, day, year]
    const date = campaign.date.split("/")

    // check if the array contains months(date[0]) equal to February("2")
    if (date[0] === "2"){

      // check for the first occurance of each campaign
      // if cound push the first occurange of camapgin into array uniqueCompaigns
      if (uniqueCompaigns.indexOf(campaign.campaign) === -1) {
        uniqueCompaigns.push(campaign.campaign)
      }

    }
  })

  // return the lenght of the array uniqueCompaigns
  return uniqueCompaigns.length
}



/* Second Question: What is the total number of conversions on plants? */
function questionTwo(array){

  // set the initial plantConversions value to 0
  let plantConversions = 0;

  // look through the entire array
  array.forEach( (campaign) => {

    // assign all campaign actions data to variable actions
    const actions = campaign.actions

    // loop through actions and
    actions.forEach((conversion) => {

      // if there is conversion and action type X
      // increase the number of plantConversions by the # of conversion of x
      if (conversion.x && conversion.action === "conversions") {
        plantConversions += conversion.x

      // if there is conversion and action type Y
      // increase the number of plantConversions by the # of conversion of y
      } else if (conversion.y && conversion.action === "conversions"){
        plantConversions += conversion.y
      }

    })

  })
  return plantConversions
}





/* Third Question: what auidence, asset combination had the least expensive conversions? */
function questionThree(array){

  // set the currentLeastExpensiveCampaign to $100 for comparison
  const currentLeastExpensiveCampaign = {campaign: "campaignCost", costForConversion: 100}

  // loop through the array
  array.forEach( (campaign) => {

    // caculate each CPM ( (spend / impressions ) * 1000 ) & assign to variable
    let campaignCost = (campaign.spend / campaign.impressions) * 1000

    // compare campaignCost to currentLeastExpensiveCampaign
    // if campaign cost is less than currentLeastExpensiveCampaign - set the key value pair of the currentLeastExpensiveCampaign campaign & costForConversion with the value of the least expensive campaign
    // until the least expensive campaign is found
    if ( campaignCost < currentLeastExpensiveCampaign.costForConversion ) {
      currentLeastExpensiveCampaign.campaign = campaign.campaign
      currentLeastExpensiveCampaign.costForConversion = campaignCost

    }

  })
  return currentLeastExpensiveCampaign
}



/* Fourth Question: What was the total cost per video view? */

// store all campaign with videos into an array
let allVideos = []
converterTwo.on("end_parsed", (sourceTwo) => {
  sourceTwo.forEach( (video) => {
    if (video.object_type === "video") {
      allVideos.push(video.campaign)
    }
  })
})


function questionFour(array){

  // set the initial value of totalCost to 0
  let totalCost = 0;

  // look through the entire array
	array.forEach(function(video){

    // store all actions to variable vidActions
		const vidActions = video.actions

    // loop through dataset vidActions
		vidActions.forEach( (actions) => {

      // check for the first occurance of each video
			if (allVideos.indexOf(video.campaign) !== -1){

        // if there is views and action type X
        // increase the totalCost count by the value of the actions X
				if (actions.x && actions.action === "views"){
					totalCost += video.spend/actions.x

          // else if there is views and action type Y
          // increase the totalCost count by the value of the actions Y
				} else if (actions.y && actions.action === "views"){
						totalCost += video.spend/actions.y
					}
			}
		})
	})

	return totalCost

}



// return parsed data from converterOne
converterOne.on("end_parsed", function(sourceOne){

  // answer to First Question
  console.log("Q1) Number of unique campaigns ran in February: " + questionOne(sourceOne));

  // answer to Second Question
  console.log("Q2) Total number of plants conversion: " + questionTwo(sourceOne))

  // answer to Third Question
  console.log("Q3) The least expensive audience, asset combination is: " +  questionThree(sourceOne).campaign + ". with estimated cost of: " + "$" +  questionThree(sourceOne).costForConversion)

  // answer to Fourth Question
  console.log("Q4) Total cost per video viewed: $" + questionFour(sourceOne).toFixed(2))
})
