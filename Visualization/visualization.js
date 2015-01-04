function createChecklist(jsonFeatureList) {
    
}


var colors =  d3.scale.category20b(); 
var sequenceLength;
RandomColor = function() {   
	var rand = Math.floor(Math.random()*20);	
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

function reset() {	
	for(i=1;i<=sequenceLength;i++) {  document.getElementById(i).style.background = "white"; }
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
		document.getElementById(j).style.background = color;
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
sequenceLength = sequence.length;
return rslt;
}
