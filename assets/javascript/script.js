var objImage;
var topics = ["panda","bear","frog", "bill gates", "iphone",];
var global_response;


function buttonGen(object) {
    var button = $("<button>");
    button.attr("value",object);
    button.addClass('objecty mr-1 ml-1 btn-secondary');
    button.text(object);
    $(".button-area").append(button);
}


$(".object-button").on("click", function(e) {
    e.preventDefault();
    var object = $("#button-gen").val();   
    topics.push(object);
    console.log(topics);    
    if(object.length >0) {  
        buttonGen(object);
        $("#button-gen").val("");
    }

});


$(".image-area").on("click",".card-img-top", function(e) {

    var temp = $(this).attr("src");
    console.log("image src on click: "+temp);  

   
    if(temp.includes("_s.gif") ) {  
        
        console.log("still detected");
        temp = temp.replace("_s.gif", ".gif"); 
        console.log(temp);
        $(this).attr("src",temp);

    }
    else {
        
        console.log("animated detected");
        temp =temp.replace(".gif", "_s.gif");
        console.log(temp);
        $(this).attr("src",temp);    
    }

});

$(".favorite-area").on("click",".card-img-top", function(e) {

    var temp = $(this).attr("src");
    console.log("image src on click: "+temp);  

   
    if(temp.includes("_s.gif") ) {   

        
        console.log("still detected");
        temp = temp.replace("_s.gif", ".gif"); 
        console.log(temp);
        $(this).attr("src",temp);

    }
    else {
       
        console.log("animated detected");
        temp =temp.replace(".gif", "_s.gif"); 
        console.log(temp);
        $(this).attr("src",temp);    
    }

});


$(".image-area").on("click",".card .favorite", function(e) {
    var stored = JSON.parse(localStorage.getItem('favorites')); 
    e.preventDefault();
    var favCard = $("<div>");
    favCard.addClass("card mb-1");  
    favCard.attr("style","width: 18rem");
    var temp = $(this).closest('.card').html();   
    favCard.append(temp);
    $(".favorite-area").append(favCard);
    stored.push(favCard.html());  
    console.log(favCard);
    localStorage.setItem("favorites", JSON.stringify(stored));  


});


$(".image-area").on("click",".card .download", function(e) {
    e.preventDefault();
    
    var favCard = $("<div>");
    favCard.addClass("card mb-1");
    favCard.attr("style","width: 18rem");
    console.log("download clicked");
    var temp = $(this).closest('.card-img-top').html();    
});


$(".button-area").on("click",".objecty", function(e) {
    e.preventDefault(); 
    var objectName = $(this).val();   
    console.log(objectName);
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Z4v8bNQShUGV21HziHzyKa5Xx8fVH8sX&q="+objectName+"&limit=150";
    console.log(queryURL);
   
    
    $.ajax({
    url: queryURL,
    method: "GET"
    })

   
    .then(function(response) {
        console.log(response);

        global_response = response; 
        for(var i=0; i<10;i++) {

            
            var imageUrl = response.data[i].images.original_still.url;    
            var imgRating =response.data[i].rating;   
            var imgTitle = response.data[i].title;

            console.log(imgRating);
            var card = $("<div>");  
            card.addClass("card mb-1");
            card.attr("style","width: 18rem");

            var img = $("<img>");  
            img.addClass("card-img-top p-1");
            img.attr("src",imageUrl);
            img.attr("alt","giphy photo");

            
            var cardList = $("<ul>");
            cardList.addClass("list-group list-group-flush");

            
            var rating = $("<li>");
            rating.text("Rating: "+imgRating);
            rating.addClass("list-group-item");

            
            var title = $("<li>");
            title.text("GIF Title: "+imgTitle);
            title.addClass("list-group-item");

            cardList.append(rating);
            cardList.append(title);

            var cardBody = $("<div>");
            cardBody.addClass("card-body");

            
            var favorite = $("<button>");
            var download = $("<button>");

            favorite.text("favorite");
            favorite.addClass("btn btn-secondary mr-1 mt-1 favorite")
            download.text("download");
            download.addClass("btn btn-secondary mt-1 download");


           
            cardBody.append(cardList);
            cardBody.append(favorite);
            cardBody.append(download);
            card.append(img);
            card.append(cardBody);

            
            $(".image-area").prepend(card);
        }
    });


});


for(var i =0; i<topics.length;i++) {
    buttonGen(topics[i]); 
}


var stored = JSON.parse(localStorage.getItem("favorites"));
console.log(stored);
    
if(stored) {
    console.log(stored);
    
    for(var i=0;i<stored.length;i++) {
        var card = $("<div>"); 
        card.addClass("card mb-1");
        card.attr("style","width: 18rem");
        card.append(stored[i]);
        console.log(card);
        $(".favorite-area").append(card);
    
    }
}
else {
    var stored = [];    
    localStorage.setItem("favorites", JSON.stringify(stored));
}