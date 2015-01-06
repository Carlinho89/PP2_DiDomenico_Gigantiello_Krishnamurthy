function createChecklist(jsonFeatureList) {
    
}


var colors =  d3.scale.category20b(); 
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
	var start = parseInt(checkboxes[i].start);	
	var end = parseInt(checkboxes[i].end);	
	var color = RandomColor();
	for(j=start;j<=end;j++) {
		document.getElementById("feature"+j).style.background = color;
	}
  }
}


function addSpans(sequence) {
var rslt  = "";
var sep  = "<div class='seperator'></div>";
var end = "</div>";
var linesep = "<div class='line-seperator'></div>";
for (var i = 0; i < sequence.length; i++){ 
var j = i+1;
	rslt = rslt + "<span id=feature"+j+">"+sequence[i]+"</span>";
	if(i%10==0 && i!=0) { rslt = rslt + sep;}
	if(i%60==0 && i!=0) { rslt = rslt + linesep;} 
}
sequenceLength = sequence.length;
return rslt;
}


var checkedNum = 0;

function showSelectedFeatureDiv(checkbox, features) {//feature, selectedID) {
    
    var checkboxIDs = [];
    var feature = features[checkbox.attr('id')].feature;
    
    console.log("feature: " + feature);
    
    $(":checkbox:checked").each(function(index){
        checkboxIDs.push($(this).attr('id'));
    })
    
    if(checkboxIDs.indexOf(checkbox.attr('id')) > -1){ //checked
        document.getElementById("selectedFeatureDiv").style.display = "block";
        checkedNum ++;
        
        add("button", document.getElementById("selectedFeatureDiv"));
    }
    else {//Unchecked
        checkedNum --;
        if (checkedNum == 0) {
            document.getElementById("selectedFeatureDiv").style.display = "none";
        }
    }
}

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