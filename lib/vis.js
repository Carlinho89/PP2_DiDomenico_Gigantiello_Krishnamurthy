module.exports = {
    reset : reset,
    resetContainers : resetContainers,
    highlight : highlight,
    addSpans:addSpans,
    add:add,
    //writeToFile:writeToFile,
    //showSelectedFeatureDiv:showSelectedFeatureDiv,
    addToList:addToList

}

require("d3");

var checkboxIDs = [];
var colors =  d3.scale.category20(); 
var sequenceLength;
var RandomColor = function() {   
    var rand = Math.floor(Math.random()*20);	
    var color = colors(rand);	
    return color;
}

var $ = require("jquery");

// This function is used to reset the whole web page.
function reset() {	
    for(i=1;i<=sequenceLength;i++) {
        document.getElementById("feature"+i).style.background = "white";
    }	
    $("#legend").empty();   
}


// Empties all the containers to remove previous containers.
function resetContainers() {
    
    $("#featureList").empty();
    $("#form").empty();
    $("#selectedFeatureList").empty();
    
    $("#legend").empty();
    
}

// Highlight the features in a sequence
function highlight() {
    reset();
    var lb;
    var checkboxes = $('input:checkbox:checked');
    for(i=0;i<checkboxes.length;i++) {
        //var id = checkboxes[i].name + checkboxes[i].id;	
        if(checkboxes[i].hasMultiple) { 
            var location = checkboxes[i].location;
            for(j=0;j<location.length;j++) { 
                var start = parseInt(location[j].start);	
                var end = parseInt(location[j].end);	
                var color = RandomColor();
                lb="<span class='block-legend' style='background-color:"+color+"'></span>";		
                addToList("legend",lb+checkboxes[i].name + "("+start+".."+end+")");
                for(k=start;k<=end;k++) {
                    document.getElementById("feature"+k).style.background = color;
                }
            }
        } else {
            var start = parseInt(checkboxes[i].start);	
            var end = parseInt(checkboxes[i].end);	
            var color = RandomColor();
            lb="<span class='block-legend' style='background-color:"+color+"'></span>";
            addToList("legend",lb+checkboxes[i].name + "("+start+".."+end+")");
            for(j=start;j<=end;j++) {
                document.getElementById("feature"+j).style.background = color;
            }
        }
	
    }
}

// every amino acid is surrounded by a span, which makes the highlighting simpler
function addSpans(sequence) {
    var rslt  = "";
    var count_div ="<div class='row'><div class='col-md-1'>";
    var start_inn = "<div class='col-md-11'>";
    var start_row = "<div class='row'>";
    var start_div = "<div class='col-md-2'>";    
    var end = "</div>";    
    rslt = count_div + "1" +end+start_inn + start_row + start_div;
    for (var i = 0; i < sequence.length; i++){ 
        var j = i+1;        
        if(i%60==0 && i!=0) {
            rslt = rslt + end + end + end + end + count_div + j + end + start_inn + start_row + start_div;
        } else	if(i%10==0 && i!=0) {
            rslt = rslt + end + start_div ;
        }
        rslt = rslt + "<span id=feature"+j+">"+sequence[i]+"</span>";
	
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
/*
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
*/

function addToList(id,txt) {				
    var li = document.createElement("li");
    li.innerHTML = txt;
    //li.appendChild(document.createTextNode(txt));
    $(li).appendTo("#"+id);
}