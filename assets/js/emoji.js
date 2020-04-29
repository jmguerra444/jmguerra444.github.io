var pos = 0;
var numStories = 5;
var language = "en"
var resultsList = [] // Contains the list of element results 
                     //TODO: refactor repeated variable

var emojiList = $.getJSON( "assets/json/emoji.json", function( json )
{
    emojiList = json;
});

var translationList = $.getJSON( "assets/json/translations.json", function( json )
{
    translationList = json;
});

function run() 
{
    pos = 0;
    if (resultsList.length == numStories * 2)
    {
        clearResults();
    }
    var interval = setInterval(function() 
    {
        get(2, interval);
    }, 80);
}

function handleTranslation()
{
    var translationString = ""
    var e = document.getElementById("lang")
    language = e.options[e.selectedIndex].value;
    for (var i = 0; i < resultsList.length; i++)
    {
        var q = resultsList[i]["description"];
        var thisTranslation = translationList[q][language];
        translationString += resultsList[i]["emoji"] + thisTranslation + "      ";
        if (i == 0 || i == 1)
        {
            translationString = "<strong>" + translationString + "</strong><br>";
        }

        if (i >= 16) { break; }
    }
    
    document.getElementById("translation-result").innerHTML = translationString;
}

function handleStoryline()
{
    // Populate results
    var story = ""
    for (var i = resultsList.length - 1; i >= 0; i--)
    {
        story = story + resultsList[i].emoji;
    }
    document.getElementById("story").innerHTML = story
}


function handleAlert()
{
    var s = ""
    if (resultsList.length > 0)
    {
        s = (resultsList.length / 2) + " of " + numStories;

        if (resultsList.length / 2 >= numStories - 1)
        {
            document.getElementById("alert").style.color = "#ff2121";

            if (resultsList.length / 2 == numStories)
            {
                s = "Finish the story!!";
            }

        }
        else
        {
            document.getElementById("alert").style.color = "inherit";
        }
    }
    document.getElementById("alert").innerHTML = s
}

function clearResults()
{
    resultsList = []
    handleTranslation();
    handleStoryline();
    handleAlert();
}

function get(n, interval) 
{

    var item_1 = emojiList[Math.floor(Math.random() * emojiList.length)];
    var item_2 = emojiList[Math.floor(Math.random() * emojiList.length)];
    
    document.getElementById("spin").innerHTML = item_1.emoji + item_2.emoji;
    
    var lottery = false
    if (item_1.category == "People & Body" || item_2.category == "People & Body")
    {
        lottery = Math.random() < 0.2;
    }

    pos++;
    if (pos == 20)
    {
        clearInterval(interval)
        resultsList.unshift(item_1);
        resultsList.unshift(item_2);
        handleStoryline();
        handleAlert();
    }
    handleTranslation();
}
