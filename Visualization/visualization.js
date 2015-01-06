function createChecklist(jsonFeatureList) {
    
}
var checkboxIDs = [];


colors =  d3.scale.category20b(); 
RandomColor = function() {   

	var rand = Math.floor(Math.random()*20);
	console.log(rand);
	var color = colors(rand);	
    return color;
}
function seq2gff(seq,el){
	
	this.seq = seq.toUpperCase();
	this.last = null; //save the last operation
	this.outline = function(){ this.el.innerHTML = this.html();}; //pretty-print
	this.clear = function(){ this.el.innerHTML = this.gff();}; //clear pretty-print
	this.gff = function(){ //sequence in gff format
          this.last = 'gff';
             return this.seq.split(/(.{10})/gm).
					filter(Boolean).
					map( function(e,i,a){ var pos=(i*10)+1; 
						return (!(i%6)?'\n'+'    '.slice(0,4-(''+pos).length)+(pos)+' '+e:e)}).join(' ')
			}
	this.html = function(){ //seq as html markup
      this.last = 'html';
			return  this.seq.split(/(.{10})/gm).
					filter(Boolean).
					map( function(e,i,a){ var pos=(i*10)+1; return (!(i%6)?'\n'+'    '.slice(0,4-(''+pos).length)+(pos)+' '+e:e).
					replace(/(.{1})/g,'<b class="\$1">\$1</b>')}).join(' ')
			}
	//init and 'attach' if an element is provided
	if("string" === typeof el){
    el = document.querySelector(el)
  }
  if(el instanceof HTMLElement){
     this.el = el
     this.el.addEventListener('mouseover', (function(self){return function(ev){ if(self.last !== 'html' ) {self.outline();}}})(this), true);
     //extending the native DOM Element's attributes - generally not recommended; serves a demonstrative cause of using Nodelists and forEach
     this.el.seqViewer = this;
     this.clear();
	}
}


function highlight() {
var checkboxes = $('input:checkbox:checked');
  for(i=0;i<checkboxes.length;i++) {
	var id = checkboxes[i].name + checkboxes[i].id;
	var start = parseInt(checkboxes[i].start);
	var end = parseInt(checkboxes[i].end);
	var color = RandomColor();
	for(i=start;i<=end;i++) {
		document.getElementById(i).style.background = color;
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
	rslt = rslt + "<span id='"+j+"'>"+sequence[i]+"</span>";
	if(i%10==0 && i!=0) { rslt = rslt + sep;}
	if(i%60==0 && i!=0) { rslt = rslt + linesep;} 
}
return rslt;
}

function addSpansForFeatures(sequence,features) {	
	for (var i = 0; i < features.length; i++){
		var location = features[i].location;		
		var start = features[i].location[0].start-1;
		var end = features[i].location[0].end-1;		
		var tmp = sequence.substring(start,end);
		console.log(start  + " " + end + " " + tmp);	
		tmp = "<span id='" + features[i].feature + "" + i + "'>" + tmp + "</span>";
		console.log(tmp);
		if(start==0 && end==sequence.length-1) { sequence = tmp; } else {
		sequence = sequence.substring(0,start) + tmp + sequence.substring(end,sequence.length-1); }
	}
	return sequence;
}
  
  
var checkedNum = 0;
var options = {
  valueNames: [ 'name', 'data' ]
};

var userList = new List('selectedFeatureDiv', options);


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
        		//document.getElementById("selectedFeatureDiv").innerHTML += "<br>" + key + " " + value ;

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



function exportSelectedFeatures() {
  console.log(parsedContent.features);
  var features = parsedContent.features;
   var textContent = "";
      for (var i = checkboxIDs.length - 1; i >= 0; i--) {
      console.log(checkboxIDs[i]);
      
     

        $.each(features[checkboxIDs[i]], function(key, value){
      

          //console.log(key, value);
          if (key == "location") {
            //document.getElementById("selectedFeatureDiv").innerHTML += "<br>" + key + " " + value ;

          }else if (key == "feature") {
            textContent += "\r\n" + key   + ": " + value ;

          }else {
            textContent += "\r\n" + key + ": " + value ;
          }

        });

    };

          textContent += "\r\n \r\n" + parsedContent.sequence;
  download('aaa.gb',textContent);

}

function linkDownload(a, filename, content) {
        contentType =  'data:application/octet-stream,';
        uriContent = contentType + encodeURIComponent(content);
        a.setAttribute('href', uriContent);
        a.setAttribute('download', filename);
      }
function download(filename, content) {
        var a = document.createElement('a');
        linkDownload(a, filename, content);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }