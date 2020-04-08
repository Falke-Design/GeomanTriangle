import "./Draw.Triangle";
import "./Edit.Triangle";

L.GeomanTriangle =  L.Class.extend({
    options: {
        position: 'topleft',
        text: {
            tooltips: {
                firstVertex: "Click to place center",
                finish: "Click to finish",
            },
            cancel:"Cancel"
        }
    },
    cssadded: false,
    initialize(map, options) {
        this.map = map;
        L.setOptions(this, options);

        this.map.pm.Draw.shapes.push('Triangle');
        this.map.pm.Draw.Triangle = new L.PM.Draw.Triangle(this.map,this.options);
        this._addCss();
        this._createControl();

        function initTriangle() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Triangle(this);
            }
        }
        L.Triangle.addInitHook(initTriangle);

    },
    setText(text){
        if(text.tooltips) {
            if (text.tooltips.firstVertex) {
                this.options.text.tooltips.firstVertex = text.tooltips.firstVertex;
            }
            if (text.tooltips.finish) {
                this.options.text.tooltips.finish = text.tooltips.finish;
            }
        }
        if(text.cancel){
            this.options.text.cancel = text.cancel;
        }
    },
    _createControl: function() {
        this.map.options.position = this.map.pm.Toolbar.options.position;
        this.map.pm.Toolbar.options['drawTriangle'] = true;
        this.lockContainer = L.DomUtil.create(
            'div',
            'leaflet-pm-toolbar leaflet-pm-options leaflet-bar leaflet-control'
        );

        const lockButton = {
            className: 'control-icon leaflet-pm-icon-triangle',
            title: "Triangle",
            onClick: () => {
            },
            afterClick: () => {
                this.map.pm.Draw.Triangle.toggle();
            },
            tool: 'draw',
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
            actions: [],
        };
        this.toolbarBtn = new L.Control.PMButton(lockButton);
        this.map.pm.Toolbar._addButton('drawTriangle', this.toolbarBtn);

        var buttons =  this.map.pm.Toolbar.buttons;
        var newbtnorder = {};
        var btnNameToReplace = "drawTriangle";
        var insertAfterDrawDone = false;
        for(var btn in buttons){
            if(!insertAfterDrawDone && !btn.startsWith("draw")) {
                newbtnorder[btnNameToReplace] = buttons[btnNameToReplace];
            }else if(btn == btnNameToReplace){
                continue;
            }
            newbtnorder[btn] = buttons[btn];
        }
        this.map.pm.Toolbar.buttons = newbtnorder;

        this.map.pm.Toolbar._showHideButtons = this._extend(this.map.pm.Toolbar._showHideButtons,this._createActionBtn(this),this.map.pm.Toolbar);
        this.map.pm.Toolbar._showHideButtons();


    },
    _createActionBtn: function(that){
        return function() {
            const actions = [
                {
                    name: 'cancel',
                    text: that.options.text.cancel,
                    onClick() {
                        that.map.pm.Draw.Triangle.disable();
                    },
                },
            ];


            var actionContainer = that.toolbarBtn.buttonsDomNode.children[1];
            actionContainer.innerHTML = "";
            actions.forEach(action => {
                var name = action.name;
                const actionNode = L.DomUtil.create(
                    'a',
                    `leaflet-pm-action action-${name}`,
                    actionContainer
                );

                if (action.text) {
                    actionNode.innerHTML = action.text;
                } else {
                    actionNode.innerHTML = "Text not translated!";
                }


                L.DomEvent.addListener(actionNode, 'click', action.onClick, that);
                L.DomEvent.disableClickPropagation(actionNode);
            });
        }
    },
    _extend: function(fn,code,that){
        return function(){
            fn.apply(that,arguments);
            code.apply(that,arguments);
        }
    },
    _addCss: function () {
        if(this.cssadded){
            return;
        }
        this.cssadded = true;

        var triangleimg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0icG9seWdvbi1hIiBkPSJNMjEuMTUsMTQuNjg0NmEzLjQ4MzUsMy40ODM1LDAsMCwwLTEuNzExMy0uMTQ0NEwxNS4wODM2LDcuNjdjLjA0MjItLjA3NzguMDc2Mi0uMTYuMTEyNS0uMjQxNS4wMTM4LS4wMzEuMDMtLjA2LjA0MjctLjA5MTdhMy40NzI5LDMuNDcyOSwwLDAsMCwuMTc3Mi0uNTcwOWMuMDA5NS0uMDQyOS4wMTY4LS4wODYuMDI0Ny0uMTI5NGEzLjUsMy41LDAsMSwwLTYuODcyNywwYy4wMDc5LjA0MzQuMDE1Mi4wODY1LjAyNDcuMTI5NGEzLjQ3MjksMy40NzI5LDAsMCwwLC4xNzcyLjU3MDljLjAxMjkuMDMxMy4wMjg4LjA2LjA0MjYuMDkxNC4wMzYzLjA4MTMuMDcuMTYzOS4xMTI1LjI0MThsLTQuMzYzNiw2Ljg2QTMuNTAxLDMuNTAxLDAsMSwwLDcuMTQsMTkuNTA1Mmg5LjcxNTlBMy40OTksMy40OTksMCwxLDAsMjEuMTUsMTQuNjg0NlpNNC40Nzc4LDE5LjQwMjdhMS41LDEuNSwwLDEsMSwuOTMtMS45MDY2QTEuNSwxLjUsMCwwLDEsNC40Nzc4LDE5LjQwMjdaTTEyLjAwNDQsNC41MDUyYTEuNSwxLjUsMCwxLDEtMS41LDEuNUExLjUsMS41LDAsMCwxLDEyLjAwNDQsNC41MDUyWk0xMC4zMzkzLDkuMDg0NWMuMDc3OC4wNDIyLjE2MDUuMDc2My4yNDE4LjExMjYuMDMwOS4wMTM3LjA2LjAzLjA5MTMuMDQyNWEzLjQ2NjMsMy40NjYzLDAsMCwwLC41NzA5LjE3NzJjLjA0MjkuMDA5NS4wODYuMDE2OC4xMy4wMjQ3YTMuMTYyNiwzLjE2MjYsMCwwLDAsMS4yNjMxLDBjLjA0MzUtLjAwOC4wODY3LS4wMTUyLjEzLS4wMjQ3YTMuNDY1MiwzLjQ2NTIsMCwwLDAsLjU3MDgtLjE3NzJjLjAzMTMtLjAxMjkuMDYtLjAyODguMDkxMy0uMDQyNS4wODEzLS4wMzYzLjE2NC0uMDcuMjQxOS0uMTEyNmwzLjk3MTYsNi4zMzI1YTMuMzk5LDMuMzk5LDAsMCwwLTEuMTA2MywyLjI1NjNINy40NjU0YTMuMzk0MSwzLjM5NDEsMCwwLDAtMS4xMDY1LTIuMjY1OFptMTEuMDksOS4zOTc3YTEuNSwxLjUsMCwxLDEtLjkzLTEuOTA2NkExLjUsMS41LDAsMCwxLDIxLjQyODgsMTguNDgyMloiLz4KICAgIDwvZGVmcz4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPG1hc2sgaWQ9InBvbHlnb24tYiIgZmlsbD0iI2ZmZiI+CiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI3BvbHlnb24tYSIvPgogICAgICAgIDwvbWFzaz4KICAgICAgICA8dXNlIGZpbGw9IiM1QjVCNUIiIGZpbGwtcnVsZT0ibm9uemVybyIgeGxpbms6aHJlZj0iI3BvbHlnb24tYSIvPgogICAgICAgIDxnIGZpbGw9IiM1QjVCNUIiIG1hc2s9InVybCgjcG9seWdvbi1iKSI+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";
        var styles = ".leaflet-pm-toolbar .leaflet-pm-icon-triangle {background-image: url('"+triangleimg+"');}";

        var styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }




});