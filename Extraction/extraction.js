

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
            for (var j = 0; j < features[checkboxIDs[i]].location.length; j++ ) {

              
              textContent += "\r\n" + features[checkboxIDs[i]].location[j].start   + ".." + features[checkboxIDs[i]].location[j].end ;
            }

            
          }else if (key == "feature") {
            textContent += key   + ": " + value ;

          }else {
            textContent += "\r\n" + key + ": " + value ;
          }

        });
        textContent += "\r\n//\r\n\r\n" 

    };

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = mm+'_'+dd+'_'+yyyy;
      
var geneName = parsedContent.metadata.keywords;
  download('exportedFeatures('+geneName+"_"+today+').txt',textContent);

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
