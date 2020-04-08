/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Draw.Triangle.js":
/*!******************************!*\
  !*** ./src/Draw.Triangle.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("L.PM.Draw.Triangle = L.PM.Draw.Line.extend({\n    initialize(map,options) {\n        L.Util.setOptions(this, options);\n        this._map = map;\n        this._shape = 'Triangle';\n        this.toolbarButtonName = 'drawTriangle';\n    },\n    enable(options) {\n        L.Util.setOptions(this, options);\n\n        // fallback option for finishOnDoubleClick\n        // TODO: remove in a later release\n        if (this.options.finishOnDoubleClick && !this.options.finishOn) {\n            this.options.finishOn = 'dblclick';\n        }\n\n        // enable draw mode\n        this._enabled = true;\n\n        // create a new layergroup\n        this._layerGroup = new L.LayerGroup();\n        this._layerGroup._pmTempLayer = true;\n        this._layerGroup.addTo(this._map);\n\n        // this is the polyLine that'll make up the polygon\n        this._layer = L.polyline([], this.options.templineStyle);\n        this._layer._pmTempLayer = true;\n        this._layerGroup.addLayer(this._layer);\n\n        // this is the hintline from the mouse cursor to the last marker\n        this._hintline = L.polyline([], this.options.hintlineStyle);\n        this._hintline._pmTempLayer = true;\n        this._layerGroup.addLayer(this._hintline);\n        // this is the hinttrianlge\n        this._hintline_triangle = L.polyline([], this.options.hintlineStyle);\n        this._hintline_triangle._pmTempLayer = true;\n        this._layerGroup.addLayer(this._hintline_triangle);\n\n        // this is the hintmarker on the mouse cursor\n        this._hintMarker = L.marker(this._map.getCenter(), {\n            icon: L.divIcon({ className: 'marker-icon cursor-marker' }),\n        });\n        this._hintMarker._pmTempLayer = true;\n        this._layerGroup.addLayer(this._hintMarker);\n\n        // show the hintmarker if the option is set\n        if (this.options.cursorMarker) {\n            L.DomUtil.addClass(this._hintMarker._icon, 'visible');\n        }\n\n\n        // add tooltip to hintmarker\n        if (this.options.tooltips) {\n            this._hintMarker\n                .bindTooltip(this.options.text.tooltips.firstVertex, {\n                    permanent: true,\n                    offset: L.point(0, 10),\n                    direction: 'bottom',\n\n                    opacity: 0.8,\n                })\n                .openTooltip();\n        }\n\n        // change map cursor\n        this._map._container.style.cursor = 'crosshair';\n\n        // create a polygon-point on click\n        this._map.on('click', this._createVertex, this);\n\n        // finish on layer event\n        // #http://leafletjs.com/reference-1.2.0.html#interactive-layer-click\n        if (this.options.finishOn) {\n            this._map.on(this.options.finishOn, this._finishShape, this);\n        }\n\n        // prevent zoom on double click if finishOn is === dblclick\n        if (this.options.finishOn === 'dblclick') {\n            this.tempMapDoubleClickZoomState = this._map.doubleClickZoom._enabled;\n\n            if (this.tempMapDoubleClickZoomState) {\n                this._map.doubleClickZoom.disable();\n            }\n        }\n\n        // sync hint marker with mouse cursor\n        this._map.on('mousemove', this._syncHintMarker, this);\n\n        // sync the hintline with hint marker\n        this._hintMarker.on('move', this._syncHintLine, this);\n\n        // fire drawstart event\n        this._map.fire('pm:drawstart', {\n            shape: this._shape,\n            workingLayer: this._layer,\n        });\n\n        // toggle the draw button of the Toolbar in case drawing mode got enabled without the button\n        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);\n\n        // an array used in the snapping mixin.\n        // TODO: think about moving this somewhere else?\n        this._otherSnapLayers = [];\n\n    },\n    disable() {\n        // disable draw mode\n\n        // cancel, if drawing mode isn't even enabled\n        if (!this._enabled) {\n            return;\n        }\n\n        this._enabled = false;\n\n        // reset cursor\n        this._map._container.style.cursor = '';\n\n        // unbind listeners\n        this._map.off('click', this._createVertex, this);\n        this._map.off('mousemove', this._syncHintMarker, this);\n        if (this.options.finishOn) {\n            this._map.off(this.options.finishOn, this._finishShape, this);\n        }\n        this._hintMarker.off('move', this._syncHintTriangle, this);\n\n        if (this.tempMapDoubleClickZoomState) {\n            this._map.doubleClickZoom.enable();\n        }\n\n        // remove layer\n        this._map.removeLayer(this._layerGroup);\n\n        // fire drawend event\n        this._map.fire('pm:drawend', { shape: this._shape });\n\n        // toggle the draw button of the Toolbar in case drawing mode got disabled without the button\n        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false);\n\n        // cleanup snapping\n        if (this.options.snappable) {\n            this._cleanupSnapping();\n        }\n    },\n    _createVertex(e) {\n        var latlng_mouse = e.latlng;\n        const polyPoints = this._layer.getLatLngs();\n\n\n        // assign the coordinate of the click to the hintMarker, that's necessary for\n        // mobile where the marker can't follow a cursor\n        if (!this._hintMarker._snapped) {\n            // move the cursor marker\n            this._hintMarker.setLatLng(e.latlng);\n        }else{\n            latlng_mouse = this._hintMarker.getLatLng();\n        }\n\n        // is this the first point?\n        const _first = this._layer.getLatLngs().length === 0;\n        if(_first) {\n            this._middlePoint = latlng_mouse;\n            this._hintMarker.on('move', this._syncHintTriangle, this);\n        }else{\n            e.latlng = latlng_mouse;\n            this._finishShape(e);\n            return;\n        }\n\n        // get coordinate for new vertex by hintMarker (cursor marker)\n        const latlng = this._hintMarker.getLatLng();\n\n        // is this the first point?\n        const first = this._layer.getLatLngs().length === 0;\n\n        this._layer.addLatLng(latlng);\n        const newMarker = this._createMarker(latlng, first);\n\n        this._hintline.setLatLngs([latlng, latlng]);\n\n        this._layer.fire('pm:vertexadded', {\n            shape: this._shape,\n            workingLayer: this._layer,\n            marker: newMarker,\n            latlng,\n        });\n    },\n    _syncHintTriangle(e) {\n        var p_mouse = this._map.latLngToContainerPoint(this._hintMarker.getLatLng());\n        var p_middle = this._map.latLngToContainerPoint(this._middlePoint);\n        var x = p_mouse.x - p_middle.x;\n        var y = p_mouse.y - p_middle.y;\n        var dis = Math.sqrt( x*x + y*y );\n        var l = ((dis * 1.5)/Math.sqrt(3))*2;\n\n        var _angle = ((Math.atan2(y, x) * 180 / Math.PI) * (-1) - 90)* (-1);\n        var bearing = _angle > 180 ? _angle - 360 : _angle;\n\n        var b_r = bearing + (-150);\n        var angle_r = b_r > 180 ? b_r - 360 : b_r;\n        var b_l = bearing + 150;\n        var angle_l = b_l < -180 ? b_l + 360 : b_l;\n\n        var des_l2 = this._findDestinationPoint(p_mouse,l,angle_l);\n        var des_r2 = this._findDestinationPoint(p_mouse,l,angle_r);\n\n        this._lpt2 = this._map.containerPointToLatLng(des_l2);\n        this._rpt2 = this._map.containerPointToLatLng(des_r2);\n\n        this._hintline_triangle.setLatLngs([\n            e.latlng,\n            this._lpt2,\n            this._rpt2,\n            e.latlng\n        ]);\n    },\n    _findDestinationPoint(point, distance, angle) {\n        var result = {};\n\n        angle = angle < 0 ? angle + 360 : angle;\n\n        angle = angle - 90;\n\n        result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + point.x);\n        result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + point.y);\n\n        return result;\n    },\n\n    _finishShape(e) {\n        const toppoint = e.latlng;\n        const coords = [toppoint,\n            this._lpt2,\n            this._rpt2];\n\n        const group = this.options.group;\n        const options = this.options.pathOptions;\n\n        // create the leaflet shape and add it to the map\n        var triangleLayer;\n        if (this.options.group && this.options.group != null) {\n            triangleLayer = L.triangle(coords, options).addTo(this.options.group);\n            this.options.group = null;\n        } else {\n            triangleLayer = L.triangle(coords, options).addTo(this._map);\n        }\n\n        triangleLayer.setCenter(this._middlePoint);\n        triangleLayer.setTop(toppoint);\n        triangleLayer.pm._oldLayerDrag = triangleLayer.pm._onLayerDrag;\n        triangleLayer.pm._onLayerDrag = this._onLayerDrag;\n\n        // disable drawing\n        this.disable();\n\n        // fire the pm:create event and pass shape and layer\n        this._map.fire('pm:create', {\n            shape: this._shape,\n            layer: triangleLayer,\n        });\n\n        // clean up snapping states\n        this._cleanupSnapping();\n\n        // remove the first vertex from \"other snapping layers\"\n        this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1);\n        delete this._tempSnapLayerIndex;\n\n    },\n    _createMarker(latlng, first) {\n        // create the new marker\n        const marker = new L.Marker(latlng, {\n            draggable: false,\n            icon: L.divIcon({ className: 'marker-icon' }),\n        });\n\n        // mark this marker as temporary\n        marker._pmTempLayer = true;\n\n        // add it to the map\n        this._layerGroup.addLayer(marker);\n\n        // if the first marker gets clicked again, finish this shape\n        if (first) {\n            marker.on('click', this._finishShape, this);\n\n            // add the first vertex to \"other snapping layers\" so the polygon is easier to finish\n            this._tempSnapLayerIndex = this._otherSnapLayers.push(marker) - 1;\n\n            if (this.options.snappable) {\n                this._cleanupSnapping();\n            }\n        }\n\n        // handle tooltip text\n        if (first) {\n            this._hintMarker.setTooltipContent(\n                this.options.text.tooltips.finish\n            );\n        }\n\n        return marker;\n    },\n    _onLayerDrag(e){\n        // this._layer.pm._oldLayerDrag(e);\n\n        // latLng of mouse event\n        const { latlng } = e;\n\n        // delta coords (how far was dragged)\n        const deltaLatLng = {\n            lat: latlng.lat - this._tempDragCoord.lat,\n            lng: latlng.lng - this._tempDragCoord.lng,\n        };\n\n        // move the coordinates by the delta\n        const moveCoords = coords =>\n            // alter the coordinates\n            coords.map(currentLatLng => {\n                if (Array.isArray(currentLatLng)) {\n                    // do this recursively as coords might be nested\n                    return moveCoords(currentLatLng);\n                }\n\n                // move the coord and return it\n                return {\n                    lat: currentLatLng.lat + deltaLatLng.lat,\n                    lng: currentLatLng.lng + deltaLatLng.lng,\n                };\n            });\n\n        if (this._layer instanceof L.CircleMarker) {\n            // set new coordinates and redraw\n            this._layer.setLatLng(latlng);\n        } else {\n            // create the new coordinates array\n            const newCoords = moveCoords(this._layer.getLatLngs());\n\n            // set new coordinates and redraw\n            this._layer.setLatLngs(newCoords);\n\n            var centerlatlng = this._layer.getCenter();\n            this._layer.setCenter(L.latLng([centerlatlng.lat + deltaLatLng.lat, centerlatlng.lng + deltaLatLng.lng]));\n            var toplatlng = this._layer.getTop();\n            this._layer.setTop(L.latLng([toplatlng.lat + deltaLatLng.lat, toplatlng.lng + deltaLatLng.lng]));\n\n        }\n        // save current latlng for next delta calculation\n        this._tempDragCoord = latlng;\n\n        // fire pm:dragstart event\n        this._layer.fire('pm:drag', e);\n    },\n    setOptions: function(options){\n        L.Util.setOptions(this, options);\n    }\n\n});\n\nL.Triangle = L.Polygon.extend({\n    setCenter(latlng){\n        this.options.center = latlng;\n    },\n    getCenter(){\n        return this.options.center;\n    },\n    setTop(latlng){\n        this.options.top = latlng;\n    },\n    getTop(){\n        return this.options.top;\n    },\n});\n\nL.triangle = function (latlngs, options) {\n    return new L.Triangle(latlngs, options);\n};\n\n\n\n\n//# sourceURL=webpack:///./src/Draw.Triangle.js?");

/***/ }),

/***/ "./src/Edit.Triangle.js":
/*!******************************!*\
  !*** ./src/Edit.Triangle.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("L.PM.Edit.Triangle = L.PM.Edit.Line.extend({\n    enable(options) {\n        L.Util.setOptions(this, options);\n\n        this._map = this._layer._map;\n\n        if (!this.enabled()) {\n            // if it was already enabled, disable first\n            // we don't block enabling again because new options might be passed\n            this.disable();\n        }\n\n\n        // change state\n        this._enabled = true;\n\n        // // init markers\n        this._initMarkers();\n\n        // if polygon gets removed from map, disable edit mode\n        this._layer.on('remove', e => {\n            this.disable(e.target);\n        });\n    },\n    disable(layer = this._layer) {\n        // if it's not enabled, it doesn't need to be disabled\n        if (!this.enabled()) {\n            return false;\n        }\n\n        // prevent disabling if layer is being dragged\n        if (layer.pm._dragging) {\n            return false;\n        }\n        layer.pm._enabled = false;\n        layer.pm._helperLayers.clearLayers();\n\n        // clean up draggable\n        layer.off('mousedown');\n        layer.off('mouseup');\n\n\n        // remove draggable class\n        const el = layer._path ? layer._path : this._layer._renderer._container;\n        L.DomUtil.removeClass(el, 'leaflet-pm-draggable');\n\n        if (this._layerEdited) {\n            this._layer.fire('pm:update', {});\n        }\n        this._layerEdited = false;\n\n        return true;\n    },\n    _initMarkers() {\n        const map = this._map;\n\n        // cleanup old ones first\n        if (this._helperLayers) {\n            this._helperLayers.clearLayers();\n        }\n\n        // add markerGroup to map, markerGroup includes regular and middle markers\n        this._helperLayers = new L.LayerGroup();\n        this._helperLayers._pmTempLayer = true;\n        this._helperLayers.addTo(map);\n\n        // create marker for each coordinate\n        const center = this._layer.getCenter();\n        const outer = this._layer.getTop();\n        this._centerMarker = this._createCenterMarker(center);\n        this._outerMarker = this._createOuterMarker(outer);\n        this._markers = [this._centerMarker, this._outerMarker];\n        this._createHintLine(this._centerMarker, this._outerMarker);\n\n        if (this.options.snappable) {\n            this._initSnappableMarkers();\n        }\n    },\n    _createHintLine(markerA, markerB) {\n        const A = markerA.getLatLng();\n        const B = markerB.getLatLng();\n        this._hintline = L.polyline([A, B], {color: this._layer.options.color});\n        this._hintline._pmTempLayer = true;\n        this._helperLayers.addLayer(this._hintline);\n    },\n    _createCenterMarker(latlng) {\n        const marker = this._createMarker(latlng);\n\n        L.DomUtil.addClass(marker._icon, 'leaflet-pm-draggable');\n        // TODO: switch back to move event once this leaflet issue is solved:\n        // https://github.com/Leaflet/Leaflet/issues/6492\n        this._tempDragCoord = this._layer.getCenter();\n        marker.on('drag', this._moveTriangle, this);\n\n        return marker;\n    },\n    _moveTriangle(e) {\n        this._onLayerDrag(e);\n        this._syncMarkers();\n\n        this._layer.fire('pm:centerplaced', {\n            layer: this._layer,\n            latlng: e.latlng,\n        });\n    },\n    _createOuterMarker(latlng) {\n        const marker = this._createMarker(latlng);\n\n        marker.on('drag', this._resizeTriangle, this);\n\n        return marker;\n    },_createMarker(latlng) {\n        const marker = new L.Marker(latlng, {\n            draggable: true,\n            icon: L.divIcon({ className: 'marker-icon' }),\n        });\n\n        marker._origLatLng = latlng;\n        marker._pmTempLayer = true;\n\n        marker.on('dragstart', this._onMarkerDragStart, this);\n        marker.on('dragend', this._onMarkerDragEnd, this);\n\n        this._helperLayers.addLayer(marker);\n\n        return marker;\n    },\n    _resizeTriangle(e) {\n        this._syncOuterMarker(e);\n        this._syncHintLine();\n        this._syncHintTriangle();\n    },\n    _syncOuterMarker(e) {\n        // move the cursor marker\n        this._outerMarker.setLatLng(e.latlng);\n\n        // if snapping is enabled, do it\n        if (this.options.snappable) {\n            const fakeDragEvent = e;\n            fakeDragEvent.target = this._outerMarker;\n            this._handleSnapping(fakeDragEvent);\n        }\n    },\n    _syncMarkers() {\n        this._centerMarker.setLatLng(this._layer.getCenter());\n        this._outerMarker.setLatLng(this._layer.getTop());\n        this._syncHintLine();\n    },\n    _syncHintLine() {\n        const A = this._centerMarker.getLatLng();\n        const B = this._outerMarker.getLatLng();\n\n        // set coords for hintline from marker to last vertex of drawin polyline\n        this._hintline.setLatLngs([A, B]);\n    },\n    _syncHintTriangle() {\n        const top = this._outerMarker.getLatLng();\n        this._layer.setTop(top);\n\n        var p_mouse = this._map.latLngToContainerPoint(top);\n        var p_middle = this._map.latLngToContainerPoint(this._centerMarker.getLatLng());\n        var x = p_mouse.x - p_middle.x;\n        var y = p_mouse.y - p_middle.y;\n        var dis = Math.sqrt( x*x + y*y );\n        var l = ((dis * 1.5)/Math.sqrt(3))*2;\n\n        var _angle = ((Math.atan2(y, x) * 180 / Math.PI) * (-1) - 90)* (-1);\n        var bearing = _angle > 180 ? _angle - 360 : _angle;\n\n        var b_r = bearing + (-150);\n        var angle_r = b_r > 180 ? b_r - 360 : b_r;\n        var b_l = bearing + 150;\n        var angle_l = b_l < -180 ? b_l + 360 : b_l;\n\n        var des_l2 = this._findDestinationPoint(p_mouse,l,angle_l);\n        var des_r2 = this._findDestinationPoint(p_mouse,l,angle_r);\n\n        this._lpt2 = this._map.containerPointToLatLng(des_l2);\n        this._rpt2 = this._map.containerPointToLatLng(des_r2);\n\n\n        this._layer.setLatLngs([\n            top,\n            this._lpt2,\n            this._rpt2,\n        ]);\n    },\n    _findDestinationPoint(point, distance, angle) {\n        var result = {};\n\n        angle = angle < 0 ? angle + 360 : angle;\n\n        angle = angle - 90;\n\n        result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + point.x);\n        result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + point.y);\n\n        return result;\n    },\n\n});\n\n\n//# sourceURL=webpack:///./src/Edit.Triangle.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Draw_Triangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Draw.Triangle */ \"./src/Draw.Triangle.js\");\n/* harmony import */ var _Draw_Triangle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Draw_Triangle__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Edit_Triangle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.Triangle */ \"./src/Edit.Triangle.js\");\n/* harmony import */ var _Edit_Triangle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Edit_Triangle__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nL.GeomanTriangle =  L.Class.extend({\n    options: {\n        position: 'topleft',\n        text: {\n            tooltips: {\n                firstVertex: \"Click to place center\",\n                finish: \"Click to finish\",\n            },\n            cancel:\"Cancel\"\n        }\n    },\n    cssadded: false,\n    initialize(map, options) {\n        this.map = map;\n        L.setOptions(this, options);\n\n        this.map.pm.Draw.shapes.push('Triangle');\n        this.map.pm.Draw.Triangle = new L.PM.Draw.Triangle(this.map,this.options);\n        this._addCss();\n        this._createControl();\n\n        function initTriangle() {\n            if (!this.options.pmIgnore) {\n                this.pm = new L.PM.Edit.Triangle(this);\n            }\n        }\n        L.Triangle.addInitHook(initTriangle);\n\n    },\n    setText(text){\n        if(text.tooltips) {\n            if (text.tooltips.firstVertex) {\n                this.options.text.tooltips.firstVertex = text.tooltips.firstVertex;\n            }\n            if (text.tooltips.finish) {\n                this.options.text.tooltips.finish = text.tooltips.finish;\n            }\n        }\n        if(text.cancel){\n            this.options.text.cancel = text.cancel;\n        }\n    },\n    _createControl: function() {\n        this.map.options.position = this.map.pm.Toolbar.options.position;\n        this.map.pm.Toolbar.options['drawTriangle'] = true;\n        this.lockContainer = L.DomUtil.create(\n            'div',\n            'leaflet-pm-toolbar leaflet-pm-options leaflet-bar leaflet-control'\n        );\n\n        const lockButton = {\n            className: 'control-icon leaflet-pm-icon-triangle',\n            title: \"Triangle\",\n            onClick: () => {\n            },\n            afterClick: () => {\n                this.map.pm.Draw.Triangle.toggle();\n            },\n            tool: 'draw',\n            doToggle: true,\n            toggleStatus: false,\n            disableOtherButtons: true,\n            position: this.options.position,\n            actions: [],\n        };\n        this.toolbarBtn = new L.Control.PMButton(lockButton);\n        this.map.pm.Toolbar._addButton('drawTriangle', this.toolbarBtn);\n\n        var buttons =  this.map.pm.Toolbar.buttons;\n        var newbtnorder = {};\n        var btnNameToReplace = \"drawTriangle\";\n        var insertAfterDrawDone = false;\n        for(var btn in buttons){\n            if(!insertAfterDrawDone && !btn.startsWith(\"draw\")) {\n                newbtnorder[btnNameToReplace] = buttons[btnNameToReplace];\n            }else if(btn == btnNameToReplace){\n                continue;\n            }\n            newbtnorder[btn] = buttons[btn];\n        }\n        this.map.pm.Toolbar.buttons = newbtnorder;\n\n        this.map.pm.Toolbar._showHideButtons = this._extend(this.map.pm.Toolbar._showHideButtons,this._createActionBtn(this),this.map.pm.Toolbar);\n        this.map.pm.Toolbar._showHideButtons();\n\n\n    },\n    _createActionBtn: function(that){\n        return function() {\n            const actions = [\n                {\n                    name: 'cancel',\n                    text: that.options.text.cancel,\n                    onClick() {\n                        that.map.pm.Draw.Triangle.disable();\n                    },\n                },\n            ];\n\n\n            var actionContainer = that.toolbarBtn.buttonsDomNode.children[1];\n            actionContainer.innerHTML = \"\";\n            actions.forEach(action => {\n                var name = action.name;\n                const actionNode = L.DomUtil.create(\n                    'a',\n                    `leaflet-pm-action action-${name}`,\n                    actionContainer\n                );\n\n                if (action.text) {\n                    actionNode.innerHTML = action.text;\n                } else {\n                    actionNode.innerHTML = \"Text not translated!\";\n                }\n\n\n                L.DomEvent.addListener(actionNode, 'click', action.onClick, that);\n                L.DomEvent.disableClickPropagation(actionNode);\n            });\n        }\n    },\n    _extend: function(fn,code,that){\n        return function(){\n            fn.apply(that,arguments);\n            code.apply(that,arguments);\n        }\n    },\n    _addCss: function () {\n        if(this.cssadded){\n            return;\n        }\n        this.cssadded = true;\n\n        var triangleimg = \"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0icG9seWdvbi1hIiBkPSJNMjEuMTUsMTQuNjg0NmEzLjQ4MzUsMy40ODM1LDAsMCwwLTEuNzExMy0uMTQ0NEwxNS4wODM2LDcuNjdjLjA0MjItLjA3NzguMDc2Mi0uMTYuMTEyNS0uMjQxNS4wMTM4LS4wMzEuMDMtLjA2LjA0MjctLjA5MTdhMy40NzI5LDMuNDcyOSwwLDAsMCwuMTc3Mi0uNTcwOWMuMDA5NS0uMDQyOS4wMTY4LS4wODYuMDI0Ny0uMTI5NGEzLjUsMy41LDAsMSwwLTYuODcyNywwYy4wMDc5LjA0MzQuMDE1Mi4wODY1LjAyNDcuMTI5NGEzLjQ3MjksMy40NzI5LDAsMCwwLC4xNzcyLjU3MDljLjAxMjkuMDMxMy4wMjg4LjA2LjA0MjYuMDkxNC4wMzYzLjA4MTMuMDcuMTYzOS4xMTI1LjI0MThsLTQuMzYzNiw2Ljg2QTMuNTAxLDMuNTAxLDAsMSwwLDcuMTQsMTkuNTA1Mmg5LjcxNTlBMy40OTksMy40OTksMCwxLDAsMjEuMTUsMTQuNjg0NlpNNC40Nzc4LDE5LjQwMjdhMS41LDEuNSwwLDEsMSwuOTMtMS45MDY2QTEuNSwxLjUsMCwwLDEsNC40Nzc4LDE5LjQwMjdaTTEyLjAwNDQsNC41MDUyYTEuNSwxLjUsMCwxLDEtMS41LDEuNUExLjUsMS41LDAsMCwxLDEyLjAwNDQsNC41MDUyWk0xMC4zMzkzLDkuMDg0NWMuMDc3OC4wNDIyLjE2MDUuMDc2My4yNDE4LjExMjYuMDMwOS4wMTM3LjA2LjAzLjA5MTMuMDQyNWEzLjQ2NjMsMy40NjYzLDAsMCwwLC41NzA5LjE3NzJjLjA0MjkuMDA5NS4wODYuMDE2OC4xMy4wMjQ3YTMuMTYyNiwzLjE2MjYsMCwwLDAsMS4yNjMxLDBjLjA0MzUtLjAwOC4wODY3LS4wMTUyLjEzLS4wMjQ3YTMuNDY1MiwzLjQ2NTIsMCwwLDAsLjU3MDgtLjE3NzJjLjAzMTMtLjAxMjkuMDYtLjAyODguMDkxMy0uMDQyNS4wODEzLS4wMzYzLjE2NC0uMDcuMjQxOS0uMTEyNmwzLjk3MTYsNi4zMzI1YTMuMzk5LDMuMzk5LDAsMCwwLTEuMTA2MywyLjI1NjNINy40NjU0YTMuMzk0MSwzLjM5NDEsMCwwLDAtMS4xMDY1LTIuMjY1OFptMTEuMDksOS4zOTc3YTEuNSwxLjUsMCwxLDEtLjkzLTEuOTA2NkExLjUsMS41LDAsMCwxLDIxLjQyODgsMTguNDgyMloiLz4KICAgIDwvZGVmcz4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPG1hc2sgaWQ9InBvbHlnb24tYiIgZmlsbD0iI2ZmZiI+CiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI3BvbHlnb24tYSIvPgogICAgICAgIDwvbWFzaz4KICAgICAgICA8dXNlIGZpbGw9IiM1QjVCNUIiIGZpbGwtcnVsZT0ibm9uemVybyIgeGxpbms6aHJlZj0iI3BvbHlnb24tYSIvPgogICAgICAgIDxnIGZpbGw9IiM1QjVCNUIiIG1hc2s9InVybCgjcG9seWdvbi1iKSI+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+\";\n        var styles = \".leaflet-pm-toolbar .leaflet-pm-icon-triangle {background-image: url('\"+triangleimg+\"');}\";\n\n        var styleSheet = document.createElement(\"style\");\n        styleSheet.type = \"text/css\";\n        styleSheet.innerText = styles;\n        document.head.appendChild(styleSheet);\n    }\n\n\n\n\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });