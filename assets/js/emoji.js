
var results = "";
var counter = 0; // Controls the number of elements in the story

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
    // Shuffler story handler
    if (counter == 5) 
    {
        results = "";
        counter = 0;
    }
    var pos = 0;
    var interval = setInterval(function() 
    {
        get(2, pos, interval);
    }, 80);
    handleTranslation();
}

function handleTranslation()
{
    var translationString = ""
    var e = document.getElementById("lang")
    language = e.options[e.selectedIndex].value;
    for (var i = 0; (i < resultsList.length || i < 5); i++)
    {
        var q = resultsList[i]["description"];
        var thisTranslation = translationList[q][language];
        translationString += resultsList[i]["emoji"] + thisTranslation + "<br>";
    }

    document.getElementById("translation-result").innerHTML = translationString;
}

function get(n, pos, interval) 
{
    var i;
    var output = "";
    
    for (i = 0; i < n; i++) 
    {
        var item = emojiList[Math.floor(Math.random() * emojiList.length)];
        output += item.emoji;
    }
    document.getElementById("demo").innerHTML = output;
    
    var lottery = false
    if (item.category == "People & Body")
    {
        lottery = Math.random() < 0.2;
    }
    
    pos++;
    if (pos == 20)
    {
        clearInterval(interval)
        results += output;
        resultsList.unshift(item);

        // TODO: Add a populate page method
        document.getElementById("story").innerHTML = results;
        counter++;
        
        if (counter == 4)
        {
            document.getElementById("alert").innerHTML = "Last!!";
        }
        if (counter == 5)
        {
            document.getElementById("alert").innerHTML = "";
        }
    }
}
