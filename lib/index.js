var parseGBF = require("biojs-io-genbank");

var jsonFile;
var parsedContent;

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

//Import extraction.js
extract = require("./extraction");
var exportSelectedFeatures = extract.exportSelectedFeatures;

//Wrapper function
function startExport() {
    exportSelectedFeatures(parsedContent);
}


$ = jQuery = require("jquery");
var bootstrap = require("bootstrap");


module.exports = function(opts) {

var el = opts.el;
var createHTML = opts.createHTML || false;

//Create buttons and divs
if(createHTML) {
var id = "#" + opts.el.id
$(id).append('<div class="row"><div class="col-md-1"><img width="196px" height="128px" class="vcenter" src="css/tum.jpg"/></div><div class="col-md-7 col-md-offset-2"><div class="row"><div class="col-md-12"><h1 class="text-center" > TUM : Technical University of Munich </h1><h2 class="text-center" > Chair Of Bio-Informatics </h2><h3 class="text-center" > Protein Prediction 2 by Prof. Burkhard Rost (winter semester 14-15) </h3></div></div><div class="row"><div class="text-center" class="col-md-12"></div></div></div><div class="col-md-1"><img class="vcenter" width="150px" height="150px" src="css/rost.png"/></div></div><br><div class="row"></div><div class="row"><div class="col-md-12 text-center" ><h4>Project Name: Parsing and Visualization of Genbank Files</h4></div></div><div class="row"><div class="col-md-6"><h4><span class="label label-default">Developed By:</span></h4><blockquote>  <br>Sai kiran Krishna murthy<br>Enrico Gigantiello <br>Carlo Di Domenico</blockquote> </div><div class="col-md-6"><h4><span class="label label-default"> Mentored By:</span></h4><blockquote> <br>Dr. Khalil El Mazouari </blockquote></div></div><div class="row"><div class="col-md-8"><div class="row"><div class="col-md-2"></div><div class="col-md-8"></div><div class="col-md-2"></div></div></div><div class="col-md-3 col-md-offset-1"></div></div><div class="row"><div class="col-md-11 col-md-offset-1"><a href="../sequence.gb">Click here to download a sample sequence</a> <br><label for="files" >Genbank File: </label><input type="file" id="files"  class="btn btn-default" name="Input GBK" /></div></div><div id="hide-everything"><br><br><div class="row"><div class="col-md-10 col-md-offset-2"><div class="accordion" id="accordion2"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">Click here to hide/show the metadata</a></div><div id="collapseOne" class="accordion-body collapse in"><div class="accordion-inner"><table id="form" class="table"></table></div></div></div></div></div></div><div class="row"><div class="col-md-3 col-md-offset-1"><div class="panel panel-default" id="features-panel"><div class="panel-heading"><h3 class="panel-title">Features:</h3></div><div class="panel-body"><div id="featureList"></div><div id="buttonsDiv" style="display:none;"><input class="btn btn-default" id="btn-vis" type="button" value="Visualize"/><input class="btn btn-default" id="btn-exp" type="button" value="Export"/></div></div></div></div><div class="col-md-7 col-md-offset-1"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Selected Features:</h3></div><div class="panel-body"><div id ="selectedFeatureDiv" class="scroll-div featureDiv" style = "display:none;" > <ul id = "selectedFeatureList"> </ul></div>    </div></div></div></div><div class="row"><div class="col-md-9 "><div class="col-md-12"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Sequence:</h3></div><div class="panel-body"><div id="sequence"></div></div></div></div></div><div class="col-md-3"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Legend:</h3></div><div class="panel-body"><ul id="legend"></ul></div></div></div></div></div>');
}


document.getElementById("btn-vis").addEventListener("click", highlight);
document.getElementById("btn-exp").addEventListener("click", startExport);
document.getElementById("files").addEventListener("change", parse);
$(".features-panel").hide();
document.getElementById("hide-everything").style.display = "none"; 

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
        if(parsedContent===null)
            return; 
        document.getElementById("hide-everything").style.display = "block"; 
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

