
var results = "";
var counter = 0; // Controls the number of elements in the story

var language = "en"
var translations = "" //Results but translated

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
    
    if (counter == 5) 
    {
        results = "";
        counter = 0;
    }
    var pos = 0;
    var interval = setInterval(function() 
    {
        get_1(2, pos, interval);
    }, 80);
}

function get_translation(sel, item)
{

}

function get_1(n, pos, interval) 
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
    if (pos == 40 || lottery)
    {
        clearInterval(interval)
        results += output
        document.getElementById("story").innerHTML = results;
        counter++;
        
        console.log(pos)
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