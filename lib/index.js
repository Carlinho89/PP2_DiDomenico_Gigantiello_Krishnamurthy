var parseGBF = require("biojs-io-genbank");
var exportSelectedFeatures = require("./extraction").exportSelectedFeatures;

var vis = require("./vis");

//Import functions from vis.js
var reset = vis.reset;
var resetContainers = vis.resetContainers;
var highlight = vis.highlight;
var addSpans = vis.addSpans;
var add = vis.add
var writeToFile = vis.writeToFile;
var showSelectedFeatureDiv = vis.showSelectedFeatureDiv;
var addToList = vis.addToList;



$ = jQuery = require("jquery");
var bootstrap = require("bootstrap");

module.exports = function(opts) {

var el = opts.el;

document.getElementById("btn-vis").addEventListener("click", highlight);
document.getElementById("btn-exp").addEventListener("click", exportSelectedFeatures);
document.getElementById("files").addEventListener("change", parse);


var jsonFile;
var parsedContent;
function parse(evt) {
    handleFileSelect(evt);
}

function handleFileSelect(evt) {
    var files = evt.target.files,
    f = files[0],
    reader = new FileReader();
    parsedContent = reader.onload = function(e) {
	resetContainers();			
        parsedContent = parseGBF(e.target.result);  
        //console.log(JSON.stringify(parsedContent));
        createHeader('form',"MetaData");
        $.each(parsedContent.metadata, function(key, value){			
            if(typeof(value)=="object") {		
            } else { 
                createRow("form",key,value);
            }				
        });
        
        document.getElementById('sequence').innerHTML = addSpans(parsedContent.sequence);
        displayFeatures(parsedContent.features);
        if (!(parsedContent == null)) {
            document.getElementById('buttonsDiv').style.display = 'inline';
        }
    //displayFeatures(JSON.stringify(parsedContent.features));
    }
    reader.readAsText(f);      

}


function createHeader(id,title) {
    var table = document.getElementById(id);
    //var head =table.createTHead();
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);

    cell1.className = "col-md-12 text-center";
    cell1.colSpan = '2';
    cell1.innerHTML = "<h4>" + title +"</h4>";


}

function createRow(id,txt1,txt2) {

    var table = document.getElementById(id);
    var r = "#"+id+" tr";
    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow($(r).length);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.className = "cap col-md-3";
    cell2.className = "col-md-9 text-center";


    // Add some text to the new cells:
    cell1.innerHTML = "<strong>"+txt1+":</strong>";
    cell2.innerHTML = txt2;
}



function displayFeatures(features) {
    //console.log(features);
    var container = document.getElementById("featureList"); 
    
    for (var i = 0; i < features.length; i++){
        //console.log(features[i].feature);
    
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = features[i].feature;
        checkbox.value = features[i].feature;
        
        checkbox.id = i;
		
        checkbox.index= i;

        if(features[i].location.length>1) { 
            checkbox.hasMultiple = true;
            checkbox.location = features[i].location;
        } else {
            checkbox.hasMultiple = false;			
        }
        checkbox.start = features[i].location[0].start;
        checkbox.end = features[i].location[0].end;
        checkbox.feature = features[i];
        
        checkbox.onchange = function(){
            showSelectedFeatureDiv($(this), features);
        };
    
        var label = document.createElement('label')
        label.display = "inline-block";
        label.htmlFor = i;
        var txt = " " + features[i].feature// + " (" + JSON.stringify(features[i].location) + ")";
        ////////////
        for (var j = 0; j < features[i].location.length; j++ ) {
            txt += " [" + features[i].location[j].start   + ".." + features[i].location[j].end +"]" ;
        }
        ////////////
        label.appendChild(document.createTextNode(txt));

        container.appendChild(checkbox);
        container.appendChild(label);
        container.appendChild(document.createElement('br'));
     
    
    } 
}

}

