
//make sure that the page doesn't zoom
$(document).bind( "mobileinit", function(event) {
    $.extend($.mobile.zoom, {locked:true,enabled:false});
});


//check to see if the application has switched pages
$( window ).hashchange(function() {
	//alert("page has changed");
	checkMyStorage();
	docheck();
});

//use cookies for now
function createCookie(name, value, expires, path, domain) {
  var cookie = name + "=" + escape(value) + ";";
 
  if (expires) {
    // If it's a date
    if(expires instanceof Date) {
      // If it isn't a valid date
      if (isNaN(expires.getTime()))
       expires = new Date();
    }
    else
      expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);
 
    cookie += "expires=" + expires.toGMTString() + ";";
  }
 
  if (path)
    cookie += "path=" + path + ";";
  if (domain)
    cookie += "domain=" + domain + ";";
 
  document.cookie = cookie;
}

//get the cookie
function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

//delete the cookie
function deleteCookie(name, path, domain) {
  // If the cookie exists
  if (getCookie(name))
    createCookie(name, "", -1, path, domain);
}

//check the storage for saved data
function checkMyStorage(){
	//new check if there is a cookie saved
	if (getCookie("website")){
		saved = unescape(getCookie("website"));
		rewrite = JSON.parse(saved);
		ex = String(rewrite.excluded);
		savedExcludes = ex.split(",");//uncheck these items in the list
		cus = String(rewrite.custom);
		savedWords = cus.split(",");
	}
}

//things to do after the DOM loads
$( document ).ready(function() {

	content = unescape(getCookie("website"));
	
	savedExcludes = new Array();
	savedWords = new Array();
	switchArr = new Array();
	
	//check to see if there is stored data
	checkMyStorage();
	
	if($("#slider2").val() == "off"){
		$(".wordlist1g").addClass("ui-state-disabled");
	}
	if($("#slider3").val() == "on"){
		$(".wordlist2g").removeClass("ui-state-disabled");
	}
	if($("#slider3a").val() == "on"){
		$(".wordlist2gb").removeClass("ui-state-disabled");
	}
	if($("#slider4").val() == "on"){
		$(".wordlist1b").removeClass("ui-state-disabled");
	}
	if($("#slider5").val() == "on"){
		$(".mywordlist").removeClass("ui-state-disabled");
	}
	
	//decks of words
	var Deck1G = new Array("a", "all", "am", "an", "and", "are", "at", "be", "big", "can", "can't", "come", "do", "down", "for", "get", "go", "had", "has", "have", "he", "here", "I", "in", "is", "it", "like", "little", "live", "look", "lots", "love", "me", "my", "no", "of", "on", "one", "said", "see", "she", "that", "the", "there", "they", "this", "to", "up", "want", "was", "we", "went", "what", "where", "who", "why", "will", "with", "yes", "you");
	
	var Deck2G = new Array("about", "animal", "as", "beside", "boy", "but", "by", "came", "could", "day", "did", "does", "eat"," from", "fun", "gave", "girl", "give", "goes", "going", "good", "got", "happy", "her", "him", "his", "home", "house", "how", "if", "into", "jump", "make", "many", "new", "not"," now", "off", "oh", "or", "our", "out", "over", "play", "put", "ran", "saw", "some", "stop", "take", "them", "then", "these", "too", "under", "were", "when", "would", "your");
	
	var Deck2GB = new Array("two", "six", "five", "nine", "one", "seven", "four", "ten", "eight", "three", "triangle", "rectangle", "square", "circle", "Saturday", "Wednesday", "Sunday", "Thursday", "Monday", "Friday", "Tuesday", "around", "through", "across", "outside", "mom", "mommy", "mother", "dad", "daddy", "father", "sister", "brother", "aunt", "uncle","grandmother", "grandfather", "baby", "family", "can't", "don't", "won't", "didn't", "wasn't", "aren't", "couldn't", "shouldn't", "wouldn't", "she's", "he's", "it's", "I'll", "I'm", "you're", "they're", "red", "yellow", "pink", "green", "purple", "orange", "blue", "black", "white", "brown", "gray");
	
	var Deck1B = new Array("after", "again", "always", "another", "any", "away", "beautiful", "because", "become", "before", "begin", "birthday", "both", "buy", "catch", "color", "count", "every", "fight", "find", "first", "found", "friend", "full", "funny", "hello", "help", "know", "laugh", "light", "long", "might", "much", "myself", "never", "night", "old", "only", "other", "own", "party", "people", "please", "pretty", "pull", "read", "right", "school", "something", "surprise", "their", "those", "today", "very", "walk", "which", "whose", "word", "write");

	
	//build out the word cards 
	$("#1GWords_display .words").append("<p></p>");
	var IGwords = "";
	$.each(Deck1G, function( i, val ) {//show first card
	IGwords += "<input name='checkbox-h-"+i+"' id='checkbox-h-"+i+"' class='"+val+"' type='checkbox' checked='checked'><label for='checkbox-h-"+i+"'>"+val+"</label>";
	}); 
	$("#1GWords_display .words p").html("<form><fieldset data-role='controlgroup' data-iconpos='right'>" + IGwords + "</fieldset></form>");

	$("#2GWords_display .words").append("<p></p>");
	var IIGwords = "";
	$.each(Deck2G, function( i, val ) {//show first card
	IIGwords += "<input name='checkbox-h-"+i+"' id='checkbox-h-"+i+"' class='"+val+"' type='checkbox' checked='checked'><label for='checkbox-h-"+i+"'>"+val+"</label>";
	}); 	
	$("#2GWords_display .words p").html("<form><fieldset data-role='controlgroup' data-iconpos='right'>" + IIGwords + "</fieldset></form>");
	
	$("#2GBWords_display .words").append("<p></p>");
	var IIGBwords = "";
	$.each(Deck2GB, function( i, val ) {//show first card
	IIGBwords += "<input name='checkbox-h-"+i+"' id='checkbox-h-"+i+"' class='"+val+"' type='checkbox' checked='checked'><label for='checkbox-h-"+i+"'>"+val+"</label>";
	}); 	
	$("#2GBWords_display .words p").html("<form><fieldset data-role='controlgroup' data-iconpos='right'>" + IIGBwords + "</fieldset></form>");

	$("#1BWords_display .words").append("<p></p>");
	var IIBwords = "";
	$.each(Deck1B, function( i, val ) {//show first card
	IIBwords += "<input name='checkbox-h-"+i+"' id='checkbox-h-"+i+"' class='"+val+"' type='checkbox' checked='checked'><label for='checkbox-h-"+i+"'>"+val+"</label>";
	});
		
	$("#1BWords_display .words p").html("<form><fieldset data-role='controlgroup' data-iconpos='right'>" + IIBwords + "</fieldset></form>");
	
	docheck();
	
	//do each instead to wrap in a checkbox
	//create a left out word array to remove words that are not checked. 
	testvar = "";
	
	//create a list of items to be excluded if unchecked.
	$("input[type='checkbox']").click(function() {
		
		selected = this.getAttribute("class");
		check = jQuery.inArray(selected,savedExcludes);
		if(check != -1){
			//alert("found");
			index = jQuery.inArray(selected,savedExcludes);
			savedExcludes.splice(index , 1);
		}else{
			savedExcludes.push(selected);
		}
		
		//reset the deck if thie happens while in use. 
		$("#cards").hide();
		$("#begin").show();//this should reshuffle the deck
		$(".introtext").show();
		$("#head h1").html("Home");
		$(".ui-li-count").html("");
		$("#next").addClass("ui-state-disabled");
		$("#prev").addClass("ui-state-disabled");
		$("#shuffle").addClass("ui-state-disabled");
	});
	
	$("#next").addClass("ui-state-disabled");
	$("#prev").addClass("ui-state-disabled");
	$("#shuffle").addClass("ui-state-disabled");
	
	/*http://sedition.com/perl/javascript-fy.html*/
	function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
	    var j = Math.floor(Math.random() * (i + 1));
	    var temp = array[i];
	    array[i] = array[j];
	    array[j] = temp;
	}
	return array;
	}	
	


$( "#begin" ).click(function() {
	//determine which toggles are selected
	//checkMyStorage();
	mydeck = new Array();
	
	$("#head h1").html("Sets - ");
	if($("#slider2").val() == "on"){
		mydeck = mydeck.concat(Deck1G); 
		$("#head h1").append(" 1G");
	}
	if($("#slider3").val() == "on"){
		mydeck = mydeck.concat(Deck2G);
		$("#head h1").append(" 2G");
	}
	if($("#slider3a").val() == "on"){
		mydeck = mydeck.concat(Deck2GB);
		$("#head h1").append(" 2GB");
	}
	if($("#slider4").val() == "on"){
		mydeck = mydeck.concat(Deck1B);
		$("#head h1").append(" 1B");
	}
	if($("#slider5").val() == "on"){
		savedWords = savedWords.filter(function(n){return n});
		mydeck = mydeck.concat(savedWords);
		$("#head h1").append(" Custom");
	}
	
	$('.excludes').html("<strong>Excluded Words</strong><br>");
	
	//now check to see if any words have been unchecked if so go through and remove them from the main array. 
	$.each(savedExcludes, function( i, val ) {//build the deck
		index = mydeck.indexOf(val);
		
		if (index > -1) {
			mydeck.splice(index, 1);
			$('.excludes').append(i + "-" + val + "<br>");
		}
	});
	//display the custom words deck
	$(".custom").html("<strong>Custom Words</strong><br>");
	$.each(savedWords, function( i, val ) {
		if(val != ""){//if its not empty
			$(".custom").append(i + " - " + val + "<br>");
		}
	});
	
	$('.debug').html("<strong>Included Words</strong><br>");
	$.each(mydeck, function( i, val ) {
		$('.debug').append(i + "-" + val + "<br>");
	});
	
	decklength = mydeck.length;
	startkey = 0;
	
	//need to add a save state to the settings. 
	
	shuffleArray(mydeck);//shuffle deck
	
	var mycards = "";
	$.each(mydeck, function( i, val ) {//build the deck
		//template for the card pages
		header = '<div data-role="page" id="Card'+i+'" data-theme="a"><div data-role="header" style="overflow:hidden;" class="headtitle"><h1></h1><a href="#options" data-icon="gear" class="ui-btn-right">Options</a><div data-role="navbar"><ul><li><a href="#" id="prev" class="ui-btn-icon-left ui-icon-carat-l ui-state-disabled prev">Previous</a></li><li><a href="#" id="next" class="ui-btn-icon-right ui-icon-carat-r next">Next</a></li><li><a href="#" id="shuffle" class="ui-btn-icon-right ui-icon-recycle shuffle">Shuffle</a></li></ul></div><!-- /navbar --></div><!-- /header -->';
		content = '<div role="main" class="ui-content"><div class="ui-body ui-body-a ui-corner-all cardbody"><h1>'+val+'</h1>';
		foot ='</div></div></div>';

		//$('body').append(header + content + foot);
		$('body').append("\r\n" + header + "\r\n" + content + "\r\n" + foot + "\r\n");
	});

	$(".headtitle h1").html("1 / " + decklength);//create a starter total
	$(":mobile-pagecontainer").pagecontainer("change","#Card0",{//update the navigation
		reloadPage: false,
		transition: 'pop',
		reverse: 'true'
	});
});

//SHUFFLE//
$('body').on("click", ".shuffle", function() {

	$(":mobile-pagecontainer").pagecontainer("change","#home");
	
	shuffleArray(mydeck);//shuffle deck
	//remove old cards 
	//for(y=0;y<mydeck.length;y++){//clear out old
		//$("#Card" + y).empty();
		//$('body').append(y + "removed");
	//}
	var mycards = "";
	$.each(mydeck, function( i, val ) {//show first card
		$("#Card" + i).html("");
		
		header = '<div data-role="header" style="overflow:hidden;" class="headtitle"><h1></h1><a href="#options" data-icon="gear" class="ui-btn-right">Options</a><div data-role="navbar"><ul><li><a href="#" id="prev" class="ui-btn-icon-left ui-icon-carat-l ui-state-disabled prev">Previous</a></li><li><a href="#" id="next" class="ui-btn-icon-right ui-icon-carat-r next">Next</a></li><li><a href="#" id="shuffle" class="ui-btn-icon-right ui-icon-recycle shuffle">Shuffle</a></li></ul></div><!-- /navbar --></div><!-- /header -->';
		content = '<div role="main" class="ui-content"><div class="ui-body ui-body-a ui-corner-all cardbody"><h1>'+val+'</h1>';
		foot ='</div></div>';
		
		$('#Card' + i).append("\r\n" + header + "\r\n" + content + "\r\n" + foot + "\r\n");
		//$('body').append(header + content + foot);
	});

	//now check to see if any words have been unchecked if so go through and remove them from the main array. 
	$.each(savedExcludes, function( i, val ) {
		index = mydeck.indexOf(val);
		if (index > -1) {
			mydeck.splice(index, 1);
		}
	});
	$(".headtitle h1").html("1 / " + decklength);//create a starter total
	$(":mobile-pagecontainer").pagecontainer("change","#Card0",{//update the navigation
		reloadPage: false,
		transition: 'pop',
		reverse: 'true'
	});
	decklength = mydeck.length;
	startkey = 0;
});

/*PREV*/
$('body').on("click", ".prev", function() {
	$(".next").removeClass("ui-state-disabled");//clear out the disabled state if they click prev
	if(startkey == 1){//check if the button should be disabled
		$(".prev").addClass("ui-state-disabled");
	}
	if(startkey != 0){
		startkey --;
		$(":mobile-pagecontainer").pagecontainer("change","#Card"+(startkey),{
			reloadPage: false,
			transition: 'slideup',
			reverse: 'true'
		});
		$(".headtitle h1").html((startkey + 1) + " / " + decklength);
	}else{
		alert("you are at the beginning");
	}
});

//mobile swipes
/*$(window).on( "swiperight", function( event ) {
	$("#next").removeClass("ui-state-disabled");//clear out the disabled state if they click prev
	//check if the button should be disabled
	if(Number(decklength - (startkey + 1)) == 1){
		$("#prev").addClass("ui-state-disabled");
	}
	$("#cards .card" + (startkey + 1)).animate({
		opacity: 1,
		left: "50%",
		width: "80%"
	}, 1000, function() {
	// Animation complete.
	});
	
	if(Number(decklength - (startkey + 1)) != 0){
		$(".ui-li-count").html("<div class='currentcount'>" + Number(decklength - (startkey + 1)) + " / " + decklength + "</div>");
		startkey ++;
		$("#cards .card" + (startkey - 1)).hide('slow');
	}
});*/
/*NEXT*/
$('body').on("click", ".next", function() {
	$(".prev").removeClass("ui-state-disabled");//clear out the disabled state if they click next
	//check if the button should be disabled
	if((startkey + 1) == decklength){
		$(".next").addClass("ui-state-disabled");
	}
	//if(startkey != 0){
	if(startkey != decklength){
		startkey ++;
		$(":mobile-pagecontainer").pagecontainer("change","#Card"+startkey,{
			reloadPage: false,
			transition: 'slidedown',
			reverse: 'true'
		});
		$(".headtitle h1").html((startkey + 1)  + " / " + decklength);
	}else{
		alert("you are at the end - ");//create a fancier message here. 
	}
});

/*$(window).on( "swipeleft", function( event ) {
	$("#prev").removeClass("ui-state-disabled");//clear out the disabled state if they click next
	//check if the button should be disabled
	if(Number(decklength - (startkey - 1)) == decklength){
		$("#next").addClass("ui-state-disabled");
	}
	if(Number(decklength - (startkey - 1)) <= decklength){//make sure that we don't go over the end. 
		$("#cards .card" + startkey).animate({
			opacity: 0.5,
			left: "-150px",
			width: "5px"
		}, 1000, function() {// Animation complete.
		});
	}
	//if(startkey != 0){
	if(Number(decklength - (startkey - 1)) <= decklength){
		$(".ui-li-count").html("<div class='currentcount'>" + Number(decklength - (startkey - 1)) + " / " + decklength + "</div>");
		startkey --;
		$("#cards .card" + startkey).show('fast');
	}
});*/

//reset if the options are toggled
$( "#slider2" ).change(function() {
	$("#cards").hide();
	$("#begin").show();
	$(".introtext").show();
	$("#head h1").html("Home");
	$(".ui-li-count").html("");
	$("#next").addClass("ui-state-disabled");
	$("#prev").addClass("ui-state-disabled");
	$("#shuffle").addClass("ui-state-disabled");
	if($("#slider2").val() == "off"){
		$(".wordlist1g").addClass("ui-state-disabled");
	}else{
		$(".wordlist1g").removeClass("ui-state-disabled");
	}
});
$( "#slider3" ).change(function() {
	$("#cards").hide();
	$("#begin").show();
	$(".introtext").show();
	$("#head h1").html("Home");
	$(".ui-li-count").html("");
	$("#next").addClass("ui-state-disabled");
	$("#prev").addClass("ui-state-disabled");
	$("#shuffle").addClass("ui-state-disabled");
	if($("#slider3").val() == "off"){
		$(".wordlist2g").addClass("ui-state-disabled");
	}else{
		$(".wordlist2g").removeClass("ui-state-disabled");
	}
});
$( "#slider3a" ).change(function() {
	$("#cards").hide();
	$("#begin").show();
	$(".introtext").show();
	$("#head h1").html("Home");
	$(".ui-li-count").html("");
	$("#next").addClass("ui-state-disabled");
	$("#prev").addClass("ui-state-disabled");
	$("#shuffle").addClass("ui-state-disabled");
	if($("#slider3a").val() == "off"){
		$(".wordlist2gb").addClass("ui-state-disabled");
	}else{
		$(".wordlist2gb").removeClass("ui-state-disabled");
	}
});
$( "#slider4" ).change(function() {
	$("#cards").hide();
	$("#begin").show();
	$(".introtext").show();
	$("#head h1").html("Home");
	$(".ui-li-count").html("");
	$("#next").addClass("ui-state-disabled");
	$("#prev").addClass("ui-state-disabled");
	$("#shuffle").addClass("ui-state-disabled");
	if($("#slider4").val() == "off"){
		$(".wordlist1b").addClass("ui-state-disabled");
	}else{
		$(".wordlist1b").removeClass("ui-state-disabled");
	}
});
$( "#slider5" ).change(function() {
	$("#cards").hide();
	$("#begin").show();
	$(".introtext").show();
	$("#head h1").html("Home");
	$(".ui-li-count").html("");
	$("#next").addClass("ui-state-disabled");
	$("#prev").addClass("ui-state-disabled");
	$("#shuffle").addClass("ui-state-disabled");
	if($("#slider5").val() == "off"){
		$(".mywordlist").addClass("ui-state-disabled");
	}else{
		$(".mywordlist").removeClass("ui-state-disabled");
	}
});

function removeSavedWord(){
	//alert("test");/*Check here to figure out what is going on with the remove function*/
	//alert("clicked");
	selected = this.getAttribute("id");
	
	check = jQuery.inArray(selected,savedWords);
	if(check != -1){
		index = jQuery.inArray(selected,savedWords);
		savedWords.splice(index , 1);
	}
	$("#"+selected).hide();
}

$(".remove-custom").click(removeSavedWord);


function validateMyForm(){
	searchWord = $("#my-word").val()
	index = savedWords.indexOf(searchWord);
	if (index == -1) {
		if(searchWord == ""){
			$.mobile.changePage("#error2");
		}else{
			if(isNaN(searchWord)){
				savedWords.push($("#my-word").val());//add to array
				if($("#Myoptions .words").html() == "No Words Added"){
					var link = $("<a href='#' class='ui-btn ui-icon-delete ui-btn-icon-left remove-custom' id='"+$("#my-word").val()+"'>" + $("#my-word").val() + "</a>");
					$("#Myopt_display .words").append(link);
					link.click(removeSavedWord);//need to add click function after generation
				}else{
					var link = $("<a href='#' class='ui-btn ui-icon-delete ui-btn-icon-left remove-custom' id='"+$("#my-word").val()+"'>" + $("#my-word").val() + "</a>");
					$("#Myopt_display .words").append(link);
					link.click(removeSavedWord);//need to add click function after generation
				}
			}else{
				$.mobile.changePage("#error3");
			}
		}
	}else{
		$.mobile.changePage("#error1");
	}
}

$("#submit-1").click(function() {
	validateMyForm();
});

//changed to save to a cookie instead local db was flaky on iOS
$(".saveSettings").click(function(){
	var gameDetails = {
	   excluded: savedExcludes,
	   custom: savedWords
	};
	deets = JSON.stringify(gameDetails);//encode the saved data
	createCookie("website", deets, 30);
	//do the check moved to when switching pages
	$.mobile.changePage("#diag");
	return true;
});
/*check to see if the data from the cookie is updated*/

function docheck(){
	//alert("check run");
	
	//check the checkboxes
	$.each(savedExcludes, function( i, val ) {//build the deck
		if(val != ""){
			$(".words").find("." + val).attr("checked",false);
		}
	});
	
	//add in the custom words
	buttondisp = "";//clear the button display 
	$("#Myopt_display .words").html("");//clear out the space
	$.each(savedWords, function( i, val ) {//build the deck
		if(val != ""){//if its not empty
			var mylink = "<a href='#' class='ui-btn ui-icon-delete ui-btn-icon-left remove-custom' id='"+val+"'>"+val+"</a>";
			$("#Myopt_display .words").append(mylink);
			//mylink.click(removeSavedWord);
			//$(".custom").append(i + " - " + val + "<br>");
			//$("#Myopt_display .words").append("cookie");
		}
	});
	//}
}

});