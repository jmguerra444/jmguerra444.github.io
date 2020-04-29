var pos = 0;

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

function handleRun() 
{
    pos = 0;
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

        if (i >= 10) { break; }
    }
    
    document.getElementById("translation-result").innerHTML = translationString;
}

function handleStoryline()
{
    // Populate results
    console.log(resultsList[0]);

    var story = ""
    for (var i = 0; i < resultsList.length; i++)
    {
        story = story + resultsList[i].emoji;
    }
    document.getElementById("story").innerHTML = story
}


function clearResults()
{
    resultsList = []
}

function get(n, interval) 
{

    var item_1 = emojiList[Math.floor(Math.random() * emojiList.length)];
    var item_2 = emojiList[Math.floor(Math.random() * emojiList.length)];

    
    document.getElementById("spin").innerHTML = item_1.emoji + item_2.emoji;
    
    // TODO: Refactor this
    var lottery = false
    if (item_1.category == "People & Body" || item_2.category == "People & Body")
    {
        lottery = Math.random() < 0.2;
    }

    pos++;
    if (pos == 20)
    {
        clearInterval(interval)
        resultsList.unshift(item_2);
        resultsList.unshift(item_1);
        handleStoryline();
        console.log(resultsList);
    }
    handleTranslation();
}
