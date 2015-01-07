function createChecklist(jsonFeatureList) {
    
}
var checkboxIDs = [];


var colors =  d3.scale.category20(); 

var sequenceLength;
RandomColor = function() {   
	var rand = Math.floor(Math.random()*20);	
	var color = colors(rand);	
    return color;
}

function reset() {	
	for(i=1;i<=sequenceLength;i++) {  document.getElementById("feature"+i).style.background = "white"; }
}


function highlight() {
reset();
var checkboxes = $('input:checkbox:checked');
  for(i=0;i<checkboxes.length;i++) {
	//var id = checkboxes[i].name + checkboxes[i].id;	
	if(checkboxes[i].hasMultiple) { 
		var location = checkboxes[i].location;
		for(i=0;i<location.length;i++) { 
			var start = parseInt(location[i].start);	
			var end = parseInt(location[i].end);	
			var color = RandomColor();
			for(j=start;j<=end;j++) {
				document.getElementById("feature"+j).style.background = color;
			}
		}
	} else {
		var start = parseInt(checkboxes[i].start);	
		var end = parseInt(checkboxes[i].end);	
		var color = RandomColor();
		for(j=start;j<=end;j++) {
			document.getElementById("feature"+j).style.background = color;
		}
	}
	
  }
}


function addSpans(sequence) {
var rslt  = "";
var count_div ="<div class='row'><div class='col-md-1'>";
var start_inn = "<div class='col-md-11'>";
var start_row = "<div class='row'>";
var start_div = "<div class='col-md-2'>";
var sep  = "<div class='seperator'></div>";
var end = "</div>";
var linesep = "<div class='line-seperator'></div>";
rslt = count_div + "1" +end+start_inn + start_row + start_div;
for (var i = 0; i < sequence.length; i++){ 
	var j = i+1;
	rslt = rslt + "<span id=feature"+j+">"+sequence[i]+"</span>";
	if(i%60==0 && i!=0) { rslt = rslt + end+ end + end+ end +count_div + j +end+start_inn + start_row + start_div; } else	if(i%10==0 && i!=0) { rslt = rslt + end + start_div ;}
	
}
sequenceLength = sequence.length;
return rslt;
}


var checkedNum = 0;


function add(type, appendTo) {
    //Create an input type dynamically.   
    var element = document.createElement("input");
    //Assign different attributes to the element. 
    
    element.onclick = function() { // Note this is a function
         writeToFile("Hello", "World");
    };
    element.setAttribute('type','button');
	element.setAttribute('name','Export Feature');
	element.setAttribute('value','Export Feature');
	
	appendTo.appendChild(element);

}

function writeToFile(d1, d2){
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var fh = fso.OpenTextFile("data.txt", 8, false, 0);
    fh.WriteLine(d1 + ',' + d2);
    fh.Close();
}


function showSelectedFeatureDiv(thisObj, features) {//feature, selectedID) {
    
    
  var index = thisObj.attr('id');

	var selectedFeature = features[index];

	var selectedFeatureDiv = document.getElementById("selectedFeatureDiv");
	
        	
  checkboxIDs = [];	
	
    $(":checkbox:checked").each(function(index){
        checkboxIDs.push($(this).attr('id'));
    })
	console.log(checkboxIDs);
   
   // for (selectedID in checkboxIDs) {
     //    console.log(selectedID);

	var ul = $("#selectedFeatureList");
	ul.empty();
    for (var i = checkboxIDs.length - 1; i >= 0; i--) {
    	console.log(checkboxIDs[i]);
    	
    	var li = $(document.createElement('li'));
    	var listElementContent = "";

        $.each(features[checkboxIDs[i]], function(key, value){
			

        	//console.log(key, value);
        	if (key == "location") {

        		for (var j = 0; j < features[checkboxIDs[i]].location.length; j++ ) {
                listElementContent += "<br>" + features[checkboxIDs[i]].location[j].start   + ".." + features[checkboxIDs[i]].location[j].end ;
                }


        	}else if (key == "feature") {
        		listElementContent += "<br><b>" + key + "</b>"  + ": " + value ;

        	}else {
        		listElementContent += "<br>" + key + ": " + value ;
        	}

        	li.html(listElementContent);
        	li.appendTo(ul);

        });

    };
    


    if(checkboxIDs.indexOf(index) > -1){ //checked
        selectedFeatureDiv.style.display = "block";
        checkedNum ++;
    }
    else {//Unchecked
        checkedNum --;
        if (checkedNum == 0) {
            selectedFeatureDiv.style.display = "none";
            
        }
    }

	//}
}
