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
            
            parsedContent = parseGBF(e.target.result);  
            console.log(JSON.stringify(parsedContent));

			$.each(parsedContent.metadata, function(key, value){			
				if(typeof(value)=="object") {		
					if(value instanceof Array) {
						//createRowWithTable("form",key,JSON.stringify(value));
					} else {
						$.each(value, function(key1, value1){ 
							//createRowWithTable("form",key1,value1);
						});						
					}					
					
				} else { 
					createRow("form",key,value);
				}
				
			});
			
		
			
            //document.getElementById('features').innerHTML = "Features :" + JSON.stringify(parsedContent.features);
			//parsedContent.sequence
			//new seq2gff(parsedContent.sequence,document.getElementById('sequence'));
            //document.getElementById('sequence').innerHTML = "Sequence : <br>" + addSpansForFeatures(parsedContent.sequence,parsedContent.features);
            document.getElementById('sequence').innerHTML = "Sequence : <br>" + addSpans(parsedContent.sequence);
            displayFeatures(parsedContent.features);
            //displayFeatures(JSON.stringify(parsedContent.features));
        }
        reader.readAsText(f);      

}


function createRow(id,txt1,txt2) {

var table = document.getElementById(id);

// Create an empty <tr> element and add it to the 1st position of the table:
var row = table.insertRow(0);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);

cell1.className = "cap";

// Add some text to the new cells:
cell1.innerHTML = txt1;
cell2.innerHTML = txt2;
}

function createRowWithTable(id,txt1,txt2) {

var table = document.getElementById(id);

// Create an empty <tr> element and add it to the 1st position of the table:
var row = table.insertRow(0);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
var cellone = row.insertCell(0);


var table2 = document.createElement("table");

table2.class = "table";

var row2 = table2.insertRow(0);
var cell1 = row2.insertCell(0);
var cell2 = row2.insertCell(1);

// Add some text to the new cells:
cell1.innerHTML = txt1;
cell2.innerHTML = txt2;

cellone.innerHTML = table2;
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
		}  else {
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
        label.htmlFor = "feature " + i;
        var txt = features[i].feature// + " (" + JSON.stringify(features[i].location) + ")";
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

function isJson(str) {
    try {
        JSON.parse(str);
		return true;
    } catch (e) {
        return false;
    }
	return false;
    
}