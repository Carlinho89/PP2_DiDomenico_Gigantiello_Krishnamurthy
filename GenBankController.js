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
            //console.log(JSON.stringify(parsedContent));

            document.getElementById('name').innerHTML = "Keywords :" + parsedContent.metadata.keywords;
            document.getElementById('features').innerHTML = "Features :" + JSON.stringify(parsedContent.features);
			//parsedContent.sequence
			//new seq2gff(parsedContent.sequence,document.getElementById('sequence'));
            //document.getElementById('sequence').innerHTML = "Sequence : <br>" + addSpansForFeatures(parsedContent.sequence,parsedContent.features);
            document.getElementById('sequence').innerHTML = "Sequence : <br>" + addSpans(parsedContent.sequence);
            displayFeatures(parsedContent.features);
            //displayFeatures(JSON.stringify(parsedContent.features));
        }
        reader.readAsText(f);
        

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

