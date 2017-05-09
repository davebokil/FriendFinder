// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });



// API POST Requests
// ---------------------------------------------------------------------------

app.post("/api/friends", function(req, res) {

    // User's score stored as array
    var newUserScore = req.body.scores

    var scoresArray = [];

    // push new user to the list
    friends.push(req.body); 
    
    // for everybody EXCEPT the new user...
    for (var i = 0; i < friends.length-1; i++) {
        var scoreDiff = 0
        // where i = length of friend list, j = 10, calculate the absolute value of the user entry against each instance of the friend list score
        for (var j = 0; j <newUserScore.length; j++) {
            scoreDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newUserScore[j])));
        }
        
        // push the results to an array
        scoresArray.push(scoreDiff);
    }
    // Test finally proves successful!!!!! PARTY TIME!!!!
    console.log("This is the score array: " + scoresArray)

    // Best match stored here:
    var bestMatch = scoresArray[0]

    // Iterate through the array to find the lowest number aka best match.
    for (var i = 1; i < scoresArray.length; i++) {
        if (scoresArray[i] < bestMatch) {

            // storing the best match based on the match position in the array (indexOf)
            bestMatch = scoresArray.indexOf(scoresArray[i])
        }
    }

    // Testing...
    console.log("Best match in the array is: " + bestMatch)
    console.log("This is the best Match: " + friends[bestMatch].name)

    // Return this info for the modal
    var bae = friends[bestMatch]
    res.json(bae);

});


};