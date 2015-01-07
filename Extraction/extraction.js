

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
            textContent += key   + ": " + value ;

          }else {
            textContent += "\r\n" + key + ": " + value ;
          }

        });
        textContent += "\r\n//\r\n\r\n" 

    };

          
  download('aaa.txt',textContent);

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
