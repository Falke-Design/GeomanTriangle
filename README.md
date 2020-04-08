# Leaflet GeomanTriangle: Adds a triangle draw button
This is a [Leaflet Geoman](https://github.com/geoman-io/leaflet-geoman) Subplugin 

Demo: [GeomanTriangle](https://falke-design.github.io/GeomanTriangle/)

### Installation
Download [geomanTriangle.js](https://raw.githubusercontent.com/Falke-Design/GeomanTriangle/master/dist/geomanTriangle.js) and include them in your project.

`<script src="./dist/geomanTriangle.js"></script>`

or use the script over cdn:

`<script src="https://cdn.jsdelivr.net/gh/Falke-Design/GeomanTriangle/dist/geomanTriangle.js"></script>`

### Init GeomanTriangle
Create the L.GeomanTriangle button after Leaflet Geoman

`triangle = new L.GeomanTriangle(map)`

### Enable draw

`map.pm.enableDraw("Triangle")`


##### setText
`triangle.setText(text)`
```
text: {tooltips: {firstVertex: 'Click to place center', finish: 'Click to finish'} cancel: 'Cancel'}
```


