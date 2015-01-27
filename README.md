# biojs-vis-genbank

[![NPM version](http://img.shields.io/npm/v/biojs-vis-genbank.svg)](https://www.npmjs.org/package/biojs-vis-genbank) 

> 

## Getting Started
Install the module with: `npm install biojs-vis-genbank`

```javascript
var genbank = require('biojs-vis-genbank');
genbank.hello("biojs"); // "hello biojs"
```

## Documentation

About the project

The Genbank contains many annotated sequences and these can be visualized and also the features that occur in this sequence can be displayed,selected,exported. Although the Genbank is very popular in Academia, in industry people dont tend to publish annotated sequences but rather these are maintained in their own Databases, these are the proprietary sequences. In order for the bioinformaticians working on this to visualize this sequence, they are again dependent on propreitary software that are developed as Desktop applications but not Web applications, the major problem with this is that the lab technicians, lose a lot of time doing this not being able to visualize the sequence immediately.
The main task of our project is not only, provided a genbank file parse it and visualize it. But also build it in such a way that it can be easily included in other projects. Although these are the primary goals of our project, there are a few more functional requirements(which can be seen here) and also some features need to be built into the project ( explained here).

#### .randomColor():

returns an array of 20 random colors, which are used to highlight the features in the sequence.

#### .reset():

this method removes all the highlighting and formatted sequences, this is the first call made by the "highlight" function. This is also responsible for emptying the legend

#### .resetContainers()

clears all the data that is present in the containers, this is usually called before a new genbank file is loaded. Usually to make sure that there is no data carried from the previous sequence.


#### .highlight():

this method is used to highlight the features in the sequence, the way this function works is, 	
	1. it checks for all the checked checkboxes
	2. retrieves all the start and end points* of the features ( these are stored in the checkboxes as properties, which are intialized in the index.js ) 
	3. based on the locations retrieved the features are highlighted
	
* -- > this also works with an array of locations, which happens when a feature is divided across the sequence.

 #### .addSpans(sequence):
 
 parameter: 
 sequence: this is the sequence that is extracted out of the genbank file
 
the way the visualization component works, is by adding a span for each and every amino acid in the sequence, this span also contains an id, which is the location of the amino acid in the sequence. The idea behind this is, when ever we need to highlight a feature, we already have the "start and end" locations, so we can just loop through these numbers and update the color of these "id's"

#### .hello(name)

**Parameter**: `name`
**Type**: `String`
**Example**: `biojs`

The 'hello' method is responsible for showing a name.

How to use this method

```javascript
genbank.hello('biojs'); // "hello biojs"
```

## Contributing

All contributions are welcome.

## Support

If you have any problem or suggestion please open an issue [here](https://github.com/Carlinho89/biojs-vis-genbank/issues).

## License 
This software is licensed under the Apache 2 license, quoted below.

Copyright (c) 2015, Cuzzo89

Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
