System.register(["lodash", "jquery", "jquery.flot", "./lib/flot/jquery.flot.gauge", "jquery.flot.time", "jquery.flot.crosshair", "./css/panel_singlestatmath.css!", "./lib/mathjs/math", "app/core/utils/kbn", "app/core/config", "app/core/time_series2", "app/plugins/sdk"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var lodash_1, jquery_1, math_1, kbn_1, config_1, time_series2_1, sdk_1, SingleStatMathCtrl;
    var __moduleName = context_1 && context_1.id;
    function getColorForValue(thresholds, value) {
        var color = '';
        if (value === null) {
            return color;
        }
        for (var i = thresholds.length - 1; i >= 0; i--) {
            var aThreshold = thresholds[i];
            color = aThreshold.color;
            if (value >= aThreshold.value) {
                return aThreshold.color;
            }
        }
        return color;
    }
    exports_1("getColorForValue", getColorForValue);
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            },
            function (_5) {
            },
            function (math_1_1) {
                math_1 = math_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (time_series2_1_1) {
                time_series2_1 = time_series2_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }
        ],
        execute: function () {
            SingleStatMathCtrl = (function (_super) {
                __extends(SingleStatMathCtrl, _super);
                function SingleStatMathCtrl($scope, $injector, $location, linkSrv) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.$location = $location;
                    _this.linkSrv = linkSrv;
                    _this.dataType = 'timeseries';
                    _this.valueNameOptions = [
                        { value: 'min', text: 'Min' },
                        { value: 'max', text: 'Max' },
                        { value: 'avg', text: 'Average' },
                        { value: 'current', text: 'Current' },
                        { value: 'total', text: 'Total' },
                        { value: 'name', text: 'Name' },
                        { value: 'first', text: 'First' },
                        { value: 'delta', text: 'Delta' },
                        { value: 'diff', text: 'Difference' },
                        { value: 'range', text: 'Range' },
                        { value: 'last_time', text: 'Time of last point' },
                    ];
                    _this.panelDefaults = {
                        links: [],
                        datasource: null,
                        maxDataPoints: 100,
                        interval: null,
                        targets: [{}],
                        cacheTimeout: null,
                        defaultColor: 'rgb(117, 117, 117)',
                        thresholds: '',
                        format: 'none',
                        tooltip: {
                            show: true
                        },
                        sortOrder: 'asc',
                        prefix: '',
                        postfix: '',
                        nullText: null,
                        valueMaps: [{ value: 'null', op: '=', text: 'No data' }],
                        mappingTypes: [{ name: 'value to text', value: 1 }, { name: 'range to text', value: 2 }],
                        rangeMaps: [{ from: 'null', to: 'null', text: 'N/A' }],
                        mappingType: 1,
                        nullPointMode: 'connected',
                        valueName: 'avg',
                        prefixFontSize: '50%',
                        valueFontSize: '80%',
                        postfixFontSize: '50%',
                        math: '',
                        colorBackground: false,
                        circleBackground: false,
                        valueMappingColorBackground: '#767171',
                        colorValue: false,
                        sparkline: {
                            show: false,
                            full: false,
                            lineColor: 'rgb(31, 120, 193)',
                            fillColor: 'rgba(31, 118, 189, 0.18)',
                        },
                        gauge: {
                            show: false,
                            minValue: 0,
                            maxValue: 100,
                            thresholdMarkers: true,
                            thresholdLabels: false,
                        },
                        sortOrderOptions: [
                            { value: 'asc', text: 'Ascending' },
                            { value: 'desc', text: 'Descending' },
                        ],
                        tableColumn: '',
                    };
                    lodash_1.default.defaults(_this.panel, _this.panelDefaults);
                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    _this.events.on('data-error', _this.onDataError.bind(_this));
                    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.onSparklineColorChange = _this.onSparklineColorChange.bind(_this);
                    _this.onSparklineFillChange = _this.onSparklineFillChange.bind(_this);
                    var t = _this.panel.thresholds;
                    if (typeof t === 'string' || t instanceof String) {
                        _this.oldThreshesChange(t);
                    }
                    return _this;
                }
                SingleStatMathCtrl.prototype.onInitEditMode = function () {
                    this.fontSizes = ['20%', '30%', '50%', '70%', '80%', '100%', '110%', '120%', '150%', '170%', '200%'];
                    this.addEditorTab('Options', 'public/plugins/blackmirror1-singlestat-math-panel/editor.html', 2);
                    this.addEditorTab('Value Mappings', 'public/plugins/blackmirror1-singlestat-math-panel/mappings.html', 3);
                    this.unitFormats = kbn_1.default.getUnitFormats();
                };
                SingleStatMathCtrl.prototype.oldThreshesChange = function (threshes) {
                    var array = null;
                    try {
                        array = JSON.parse("[" + threshes + "]");
                    }
                    catch (err) {
                        console.log("JSON parse failed" + err.message);
                    }
                    if (array === null) {
                        array = threshes.split(",");
                    }
                    this.thresholds = [];
                    for (var i = 0; i < array.length; i++) {
                        var useColor = this.panel.defaultColor;
                        if (typeof this.panel.colors !== "undefined") {
                            if (i < this.panel.colors.length) {
                                useColor = this.panel.colors[i];
                            }
                        }
                        this.thresholds.push({
                            color: useColor,
                            value: Number(array[i]),
                        });
                    }
                    this.panel["thresholds"] = this.thresholds;
                };
                SingleStatMathCtrl.prototype.sortMyThreshes = function (control) {
                    if (this.panel.sortOrder === 'asc') {
                        control.panel.thresholds = lodash_1.default.orderBy(control.panel.thresholds, ["value"], ["asc"]);
                    }
                    else if (this.panel.sortOrder === 'desc') {
                        control.panel.thresholds = lodash_1.default.orderBy(control.panel.thresholds, ["value"], ["desc"]);
                    }
                    this.$scope.ctrl.refresh();
                };
                SingleStatMathCtrl.prototype.setUnitFormat = function (subItem) {
                    this.panel.format = subItem.value;
                    this.refresh();
                };
                SingleStatMathCtrl.prototype.onDataError = function (err) {
                    this.onDataReceived([]);
                };
                SingleStatMathCtrl.prototype.onEditorRemoveThreshold = function (index) {
                    this.panel.thresholds.splice(index, 1);
                    this.render();
                };
                SingleStatMathCtrl.prototype.onEditorAddThreshold = function () {
                    this.panel.thresholds.push({ color: this.panel.defaultColor });
                    this.render();
                };
                SingleStatMathCtrl.prototype.onDataReceived = function (dataList) {
                    var data = {};
                    if (dataList.length > 0 && dataList[0].type === 'table') {
                        this.dataType = 'table';
                        var tableData = dataList.map(this.tableHandler.bind(this));
                        this.setTableValues(tableData, data);
                    }
                    else {
                        this.dataType = 'timeseries';
                        this.series = dataList.map(this.seriesHandler.bind(this));
                        this.setValues(data);
                    }
                    this.data = data;
                    this.render();
                };
                SingleStatMathCtrl.prototype.seriesHandler = function (seriesData) {
                    var series = new time_series2_1.default({
                        datapoints: seriesData.datapoints || [],
                        alias: seriesData.target,
                    });
                    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
                    return series;
                };
                SingleStatMathCtrl.prototype.tableHandler = function (tableData) {
                    var datapoints = [];
                    var columnNames = {};
                    tableData.columns.forEach(function (column, columnIndex) {
                        columnNames[columnIndex] = column.text;
                    });
                    this.tableColumnOptions = columnNames;
                    if (!lodash_1.default.find(tableData.columns, ['text', this.panel.tableColumn])) {
                        this.setTableColumnToSensibleDefault(tableData);
                    }
                    tableData.rows.forEach(function (row) {
                        var datapoint = {};
                        row.forEach(function (value, columnIndex) {
                            var key = columnNames[columnIndex];
                            datapoint[key] = value;
                        });
                        datapoints.push(datapoint);
                    });
                    return datapoints;
                };
                SingleStatMathCtrl.prototype.setTableColumnToSensibleDefault = function (tableData) {
                    if (tableData.columns.length === 1) {
                        this.panel.tableColumn = tableData.columns[0].text;
                    }
                    else {
                        this.panel.tableColumn = lodash_1.default.find(tableData.columns, function (col) {
                            return col.type !== 'time';
                        }).text;
                    }
                };
                SingleStatMathCtrl.prototype.setTableValues = function (tableData, data) {
                    if (!tableData || tableData.length === 0) {
                        return;
                    }
                    if (tableData[0].length === 0 || tableData[0][0][this.panel.tableColumn] === undefined) {
                        return;
                    }
                    var datapoint = tableData[0][0];
                    data.value = datapoint[this.panel.tableColumn];
                    if (lodash_1.default.isString(data.value)) {
                        data.valueFormatted = lodash_1.default.escape(data.value);
                        data.value = 0;
                        data.valueRounded = 0;
                    }
                    else {
                        var decimalInfo = this.getDecimalsForValue(data.value);
                        var formatFunc = kbn_1.default.valueFormats[this.panel.format];
                        data.valueFormatted = formatFunc(datapoint[this.panel.tableColumn], decimalInfo.decimals, decimalInfo.scaledDecimals);
                        data.valueRounded = kbn_1.default.roundValue(data.value, this.panel.decimals || 0);
                    }
                    this.setValueMapping(data);
                };
                SingleStatMathCtrl.prototype.canChangeFontSize = function () {
                    return this.panel.gauge.show;
                };
                SingleStatMathCtrl.prototype.onSparklineColorChange = function (newColor) {
                    this.panel.sparkline.lineColor = newColor;
                    this.render();
                };
                SingleStatMathCtrl.prototype.onSparklineFillChange = function (newColor) {
                    this.panel.sparkline.fillColor = newColor;
                    this.render();
                };
                SingleStatMathCtrl.prototype.getDecimalsForValue = function (value) {
                    if (lodash_1.default.isNumber(this.panel.decimals)) {
                        return { decimals: this.panel.decimals, scaledDecimals: null };
                    }
                    var delta = value / 2;
                    var dec = -Math.floor(Math.log(delta) / Math.LN10);
                    var magn = Math.pow(10, -dec), norm = delta / magn, size;
                    if (norm < 1.5) {
                        size = 1;
                    }
                    else if (norm < 3) {
                        size = 2;
                        if (norm > 2.25) {
                            size = 2.5;
                            ++dec;
                        }
                    }
                    else if (norm < 7.5) {
                        size = 5;
                    }
                    else {
                        size = 10;
                    }
                    size *= magn;
                    if (Math.floor(value) === value) {
                        dec = 0;
                    }
                    var result = {};
                    result.decimals = Math.max(0, dec);
                    result.scaledDecimals = result.decimals - Math.floor(Math.log(size) / Math.LN10) + 2;
                    return result;
                };
                SingleStatMathCtrl.prototype.setValues = function (data) {
                    var _this = this;
                    data.flotpairs = [];
                    if (this.series.length > 1 || this.panel.math.length) {
                        var lastPoint_1 = [];
                        var lastValue_1 = [];
                        this.series.forEach(function (element, index) {
                            lastPoint_1[index] = lodash_1.default.last(element.datapoints);
                            lastValue_1[index] = lodash_1.default.isArray(lastPoint_1[index]) ? lastPoint_1[index][0] : null;
                        });
                        if (this.panel.valueName === 'name') {
                            data.value = 0;
                            data.valueRounded = 0;
                            data.valueFormatted = this.series[0].alias;
                        }
                        else if (lodash_1.default.isString(lastValue_1[0])) {
                            data.value = 0;
                            data.valueFormatted = lodash_1.default.escape(lastValue_1[0]);
                            data.valueRounded = 0;
                        }
                        else if (this.panel.valueName === 'last_time') {
                            var formatFunc = kbn_1.default.valueFormats[this.panel.format];
                            data.value = lastPoint_1[0][1];
                            data.valueRounded = data.value;
                            data.valueFormatted = formatFunc(data.value, 0, 0);
                        }
                        else {
                            if (this.panel.math.length) {
                                var mathFunction = this.panel.math;
                                this.series.forEach(function (element) {
                                    mathFunction = mathFunction.replace(new RegExp(element.alias, 'gi'), String(element.stats[_this.panel.valueName]));
                                });
                                try {
                                    mathFunction = mathFunction.replace(new RegExp('[A-za-z]+', 'gi'), String(0));
                                    data.value = math_1.default.eval(mathFunction);
                                    data.flotpairs = this.series[0].flotpairs;
                                }
                                catch (e) {
                                    data.value = 0;
                                    data.flotpairs = [0, 0];
                                }
                            }
                            else {
                                data.value = this.series[0].stats[this.panel.valueName];
                                data.flotpairs = this.series[0].flotpairs;
                            }
                            var decimalInfo = this.getDecimalsForValue(data.value);
                            var formatFunc = kbn_1.default.valueFormats[this.panel.format];
                            data.valueFormatted = formatFunc(data.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                            data.valueRounded = kbn_1.default.roundValue(data.value, decimalInfo.decimals);
                        }
                        if (this.series && this.series.length > 0) {
                            data.scopedVars = lodash_1.default.extend({}, this.panel.scopedVars);
                            data.scopedVars['__name'] = { value: this.series[0].label };
                        }
                    }
                    if (this.series && this.series.length > 0 && this.series.length < 2 && !this.panel.math.length) {
                        var lastPoint = lodash_1.default.last(this.series[0].datapoints);
                        var lastValue = lodash_1.default.isArray(lastPoint) ? lastPoint[0] : null;
                        if (this.panel.valueName === 'name') {
                            data.value = 0;
                            data.valueRounded = 0;
                            data.valueFormatted = this.series[0].alias;
                        }
                        else if (lodash_1.default.isString(lastValue)) {
                            data.value = 0;
                            data.valueFormatted = lodash_1.default.escape(lastValue);
                            data.valueRounded = 0;
                        }
                        else if (this.panel.valueName === 'last_time') {
                            var formatFunc = kbn_1.default.valueFormats[this.panel.format];
                            data.value = lastPoint[1];
                            data.valueRounded = data.value;
                            data.valueFormatted = formatFunc(data.value, 0, 0);
                        }
                        else {
                            data.value = this.series[0].stats[this.panel.valueName];
                            data.flotpairs = this.series[0].flotpairs;
                            var decimalInfo = this.getDecimalsForValue(data.value);
                            var formatFunc = kbn_1.default.valueFormats[this.panel.format];
                            data.valueFormatted = formatFunc(data.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                            data.valueRounded = kbn_1.default.roundValue(data.value, decimalInfo.decimals);
                        }
                        data.scopedVars = lodash_1.default.extend({}, this.panel.scopedVars);
                        data.scopedVars['__name'] = { value: this.series[0].label };
                    }
                    this.setValueMapping(data);
                };
                SingleStatMathCtrl.prototype.setValueMapping = function (data) {
                    if (this.panel.mappingType === 1) {
                        for (var i = 0; i < this.panel.valueMaps.length; i++) {
                            var map = this.panel.valueMaps[i];
                            if (map.value === 'null') {
                                if (data.value === null || data.value === void 0) {
                                    data.valueFormatted = map.text;
                                    return;
                                }
                                continue;
                            }
                            var value = parseFloat(map.value);
                            if (value === data.valueRounded) {
                                data.valueFormatted = map.text;
                                return;
                            }
                        }
                    }
                    else if (this.panel.mappingType === 2) {
                        for (var i = 0; i < this.panel.rangeMaps.length; i++) {
                            var map = this.panel.rangeMaps[i];
                            if (map.from === 'null' && map.to === 'null') {
                                if (data.value === null || data.value === void 0) {
                                    data.valueFormatted = map.text;
                                    return;
                                }
                                continue;
                            }
                            var from = parseFloat(map.from);
                            var to = parseFloat(map.to);
                            if (to >= data.valueRounded && from <= data.valueRounded) {
                                data.valueFormatted = map.text;
                                return;
                            }
                        }
                    }
                    if (data.value === null || data.value === void 0) {
                        data.valueFormatted = 'no value';
                    }
                };
                SingleStatMathCtrl.prototype.removeValueMap = function (map) {
                    var index = lodash_1.default.indexOf(this.panel.valueMaps, map);
                    this.panel.valueMaps.splice(index, 1);
                    this.render();
                };
                SingleStatMathCtrl.prototype.addValueMap = function () {
                    this.panel.valueMaps.push({ value: '', op: '=', text: '' });
                };
                SingleStatMathCtrl.prototype.removeRangeMap = function (rangeMap) {
                    var index = lodash_1.default.indexOf(this.panel.rangeMaps, rangeMap);
                    this.panel.rangeMaps.splice(index, 1);
                    this.render();
                };
                SingleStatMathCtrl.prototype.addRangeMap = function () {
                    this.panel.rangeMaps.push({ from: '', to: '', text: '' });
                };
                SingleStatMathCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    var $location = this.$location;
                    var linkSrv = this.linkSrv;
                    var $timeout = this.$timeout;
                    var panel = ctrl.panel;
                    var templateSrv = this.templateSrv;
                    var data, linkInfo;
                    elem = elem.find('.singlestatmath-panel');
                    function getPanelContainer() {
                        return elem.closest('.panel-container');
                    }
                    function applyColoringThresholds(value, valueString) {
                        if (!panel.colorValue) {
                            return valueString;
                        }
                        var color = getColorForValue(panel.thresholds, data.value);
                        if (data.value == null) {
                            color = panel.valueMappingColorBackground;
                        }
                        if (color) {
                            return '<span style="color:' + color + '">' + valueString + '</span>';
                        }
                        return valueString;
                    }
                    function getSpan(className, fontSize, value) {
                        value = templateSrv.replace(value, data.scopedVars);
                        return '<span class="' + className + '" style="font-size:' + fontSize + '">' + value + '</span>';
                    }
                    function getBigValueHtml() {
                        var body = '<div class="singlestatmath-panel-value-container">';
                        if (panel.prefix) {
                            var prefix = applyColoringThresholds(data.value, panel.prefix);
                            body += getSpan('singlestatmath-panel-prefix', panel.prefixFontSize, prefix);
                        }
                        var value = applyColoringThresholds(data.value, data.valueFormatted);
                        body += getSpan('singlestatmath-panel-value', panel.valueFontSize, value);
                        if (panel.postfix) {
                            var postfix = applyColoringThresholds(data.value, panel.postfix);
                            body += getSpan('singlestatmath-panel-postfix', panel.postfixFontSize, postfix);
                        }
                        body += '</div>';
                        return body;
                    }
                    function getValueText() {
                        var result = panel.prefix ? templateSrv.replace(panel.prefix, data.scopedVars) : '';
                        result += data.valueFormatted;
                        result += panel.postfix ? templateSrv.replace(panel.postfix, data.scopedVars) : '';
                        return result;
                    }
                    function addGauge() {
                        var width = elem.width();
                        var height = elem.height();
                        var dimension = Math.min(width, height * 1.3);
                        ctrl.invalidGaugeRange = false;
                        if (panel.gauge.minValue > panel.gauge.maxValue) {
                            ctrl.invalidGaugeRange = true;
                            return;
                        }
                        var plotCanvas = jquery_1.default('<div></div>');
                        var plotCss = {
                            top: '10px',
                            margin: 'auto',
                            position: 'relative',
                            height: height * 0.9 + 'px',
                            width: dimension + 'px',
                        };
                        plotCanvas.css(plotCss);
                        var thresholds = [];
                        for (var i = 0; i < panel.thresholds.length; i++) {
                            thresholds.push({
                                value: panel.thresholds[i].value,
                                color: panel.thresholds[i].color,
                            });
                        }
                        thresholds.push({
                            value: panel.gauge.maxValue,
                            color: panel.thresholds[panel.thresholds.length - 1],
                        });
                        var bgColor = config_1.default.bootData.user.lightTheme ? 'rgb(230,230,230)' : 'rgb(38,38,38)';
                        var fontScale = parseInt(panel.valueFontSize) / 100;
                        var fontSize = Math.min(dimension / 5, 100) * fontScale;
                        var gaugeWidthReduceRatio = panel.gauge.thresholdLabels ? 1.5 : 1;
                        var gaugeWidth = Math.min(dimension / 6, 60) / gaugeWidthReduceRatio;
                        var thresholdMarkersWidth = gaugeWidth / 5;
                        var thresholdLabelFontSize = fontSize / 2.5;
                        var options = {
                            series: {
                                gauges: {
                                    gauge: {
                                        min: panel.gauge.minValue,
                                        max: panel.gauge.maxValue,
                                        background: { color: bgColor },
                                        border: { color: null },
                                        shadow: { show: false },
                                        width: gaugeWidth,
                                    },
                                    frame: { show: false },
                                    label: { show: false },
                                    layout: { margin: 0, thresholdWidth: 0 },
                                    cell: { border: { width: 0 } },
                                    threshold: {
                                        values: thresholds,
                                        label: {
                                            show: panel.gauge.thresholdLabels,
                                            margin: thresholdMarkersWidth + 1,
                                            font: { size: thresholdLabelFontSize },
                                        },
                                        show: panel.gauge.thresholdMarkers,
                                        width: thresholdMarkersWidth,
                                    },
                                    value: {
                                        color: panel.colorValue ? getColorForValue(panel.thresholds, data.valueRounded) : null,
                                        formatter: function () {
                                            return getValueText();
                                        },
                                        font: {
                                            size: fontSize,
                                            family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                        },
                                    },
                                    show: true,
                                },
                            },
                        };
                        elem.append(plotCanvas);
                        var plotSeries = {
                            data: [[0, data.valueRounded]],
                        };
                        jquery_1.default.plot(plotCanvas, [plotSeries], options);
                    }
                    function addSparkline() {
                        var width = elem.width() + 20;
                        if (width < 30) {
                            setTimeout(addSparkline, 30);
                            return;
                        }
                        var height = ctrl.height;
                        var plotCanvas = jquery_1.default('<div></div>');
                        var plotCss = {};
                        plotCss.position = 'absolute';
                        if (panel.sparkline.full) {
                            plotCss.bottom = '5px';
                            plotCss.left = '-5px';
                            plotCss.width = width - 10 + 'px';
                            var dynamicHeightMargin = height <= 100 ? 5 : Math.round(height / 100) * 15 + 5;
                            plotCss.height = height - dynamicHeightMargin + 'px';
                        }
                        else {
                            plotCss.bottom = '0px';
                            plotCss.left = '-5px';
                            plotCss.width = width - 10 + 'px';
                            plotCss.height = Math.floor(height * 0.25) + 'px';
                        }
                        plotCanvas.css(plotCss);
                        var options = {
                            legend: { show: false },
                            series: {
                                lines: {
                                    show: true,
                                    fill: 1,
                                    lineWidth: 1,
                                    fillColor: panel.sparkline.fillColor,
                                },
                            },
                            yaxes: { show: false },
                            xaxis: {
                                show: false,
                                mode: 'time',
                                min: ctrl.range.from.valueOf(),
                                max: ctrl.range.to.valueOf(),
                            },
                            grid: { hoverable: false, show: false },
                        };
                        elem.append(plotCanvas);
                        var plotSeries = {
                            data: data.flotpairs,
                            color: panel.sparkline.lineColor,
                        };
                        jquery_1.default.plot(plotCanvas, [plotSeries], options);
                    }
                    function render() {
                        if (!ctrl.data) {
                            return;
                        }
                        data = ctrl.data;
                        var body = panel.gauge.show ? '' : getBigValueHtml();
                        var color = '';
                        if (panel.colorBackground) {
                            if (data.value == null) {
                                color = panel.valueMappingColorBackground;
                            }
                            else {
                                color = getColorForValue(panel.thresholds, data.value);
                            }
                            if (color) {
                                getPanelContainer().css('background-color', color);
                                if (scope.fullscreen) {
                                    elem.css('background-color', color);
                                }
                                else {
                                    elem.css('background-color', '');
                                }
                            }
                        }
                        else {
                            getPanelContainer().css('background-color', '');
                            elem.css('background-color', '');
                            panel.circleBackground = false;
                        }
                        if (panel.circleBackground) {
                            jquery_1.default(getPanelContainer()).addClass('circle');
                            getPanelContainer().css('background-color', '');
                            elem.css({
                                'border-radius': 50 + '%',
                                'background-color': color
                            });
                        }
                        else {
                            jquery_1.default(getPanelContainer().removeClass('circle'));
                            elem.css({ 'border-radius': '0' });
                        }
                        elem.html(body);
                        if (panel.sparkline.show) {
                            addSparkline();
                        }
                        if (panel.gauge.show) {
                            addGauge();
                        }
                        elem.toggleClass('pointer', panel.links.length > 0);
                        if (panel.links.length > 0) {
                            linkInfo = linkSrv.getPanelLinkAnchorInfo(panel.links[0], data.scopedVars);
                        }
                        else {
                            linkInfo = null;
                        }
                    }
                    function hookupDrilldownLinkTooltip() {
                        if (ctrl.panel.description) {
                            var drilldownTooltip = jquery_1.default('<div id="tooltip" class="" style="background:white;margin:auto;color:black;width:200px;box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);"><h6 style="color:black;">'
                                + ctrl.panel.title + '</h6>' + ctrl.panel.description + '</div>"');
                        }
                        else {
                            var drilldownTooltip = jquery_1.default('<div id="tooltip" class="" style="background:white;margin:auto;color:black;width:200px;box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);"><h6 style="color:black;">'
                                + ctrl.panel.title + '</h6>No Description</div>"');
                        }
                        elem.mouseleave(function () {
                            $timeout(function () {
                                drilldownTooltip.detach();
                            });
                        });
                        elem.click(function (evt) {
                            if (!linkInfo) {
                                return;
                            }
                            if (jquery_1.default(evt).parents('.panel-header').length > 0) {
                                return;
                            }
                            if (linkInfo.target === '_blank') {
                                window.open(linkInfo.href, '_blank');
                                return;
                            }
                            if (linkInfo.href.indexOf('http') === 0) {
                                window.location.href = linkInfo.href;
                            }
                            else {
                                $timeout(function () {
                                    $location.url(linkInfo.href);
                                });
                            }
                            drilldownTooltip.detach();
                        });
                        elem.mousemove(function (e) {
                            if (!ctrl.panel.tooltip.show) {
                                return;
                            }
                            drilldownTooltip.place_tt(e.pageX, e.pageY - 50);
                        });
                    }
                    hookupDrilldownLinkTooltip();
                    this.events.on('render', function () {
                        render();
                        ctrl.renderingCompleted();
                    });
                };
                SingleStatMathCtrl.templateUrl = 'public/plugins/blackmirror1-singlestat-math-panel/module.html';
                return SingleStatMathCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("SingleStatMathCtrl", SingleStatMathCtrl);
            exports_1("PanelCtrl", SingleStatMathCtrl);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlc3RhdC1tYXRoX2N0cmwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc2luZ2xlc3RhdC1tYXRoX2N0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUErekJBLDBCQUEwQixVQUFVLEVBQUUsS0FBSztRQUN6QyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQyxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDdkIsSUFBSSxLQUFLLElBQUksVUFBVSxDQUFDLEtBQUssRUFBRTtnQkFDN0IsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDO2FBQ3pCO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQTN6QmdDLHNDQUFnQjtnQkFnRi9DLDRCQUFZLE1BQU0sRUFBRSxTQUFTLEVBQVUsU0FBUyxFQUFVLE9BQU87b0JBQWpFLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQWdCekI7b0JBakJzQyxlQUFTLEdBQVQsU0FBUyxDQUFBO29CQUFVLGFBQU8sR0FBUCxPQUFPLENBQUE7b0JBN0VqRSxjQUFRLEdBQUcsWUFBWSxDQUFDO29CQVF4QixzQkFBZ0IsR0FBVTt3QkFDeEIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7d0JBQzdCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFO3dC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b2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCAnanF1ZXJ5LmZsb3QnO1xuaW1wb3J0ICcuL2xpYi9mbG90L2pxdWVyeS5mbG90LmdhdWdlJztcbmltcG9ydCAnanF1ZXJ5LmZsb3QudGltZSc7XG5pbXBvcnQgJ2pxdWVyeS5mbG90LmNyb3NzaGFpcic7XG5pbXBvcnQgJy4vY3NzL3BhbmVsX3NpbmdsZXN0YXRtYXRoLmNzcyEnO1xuaW1wb3J0IG1hdGggZnJvbSAnLi9saWIvbWF0aGpzL21hdGgnXG5cbmltcG9ydCBrYm4gZnJvbSAnYXBwL2NvcmUvdXRpbHMva2JuJztcbmltcG9ydCBjb25maWcgZnJvbSAnYXBwL2NvcmUvY29uZmlnJztcbmltcG9ydCBUaW1lU2VyaWVzIGZyb20gJ2FwcC9jb3JlL3RpbWVfc2VyaWVzMic7XG5pbXBvcnQgeyBNZXRyaWNzUGFuZWxDdHJsLCBQYW5lbEN0cmwgfSBmcm9tICdhcHAvcGx1Z2lucy9zZGsnO1xuLy9pbXBvcnQgeyBzdHJpY3QgfSBmcm9tICdhc3NlcnQnO1xuXG5jbGFzcyBTaW5nbGVTdGF0TWF0aEN0cmwgZXh0ZW5kcyBNZXRyaWNzUGFuZWxDdHJsIHtcbiAgc3RhdGljIHRlbXBsYXRlVXJsID0gJ3B1YmxpYy9wbHVnaW5zL2JsYWNrbWlycm9yMS1zaW5nbGVzdGF0LW1hdGgtcGFuZWwvbW9kdWxlLmh0bWwnO1xuXG4gIGRhdGFUeXBlID0gJ3RpbWVzZXJpZXMnO1xuICBzZXJpZXM6IGFueVtdO1xuICBkYXRhOiBhbnk7XG4gIGZvbnRTaXplczogYW55W107XG4gIHVuaXRGb3JtYXRzOiBhbnlbXTtcbiAgaW52YWxpZEdhdWdlUmFuZ2U6IGJvb2xlYW47XG4gIHBhbmVsOiBhbnk7XG4gIGV2ZW50czogYW55O1xuICB2YWx1ZU5hbWVPcHRpb25zOiBhbnlbXSA9IFtcbiAgICB7IHZhbHVlOiAnbWluJywgdGV4dDogJ01pbicgfSxcbiAgICB7IHZhbHVlOiAnbWF4JywgdGV4dDogJ01heCcgfSxcbiAgICB7IHZhbHVlOiAnYXZnJywgdGV4dDogJ0F2ZXJhZ2UnIH0sXG4gICAgeyB2YWx1ZTogJ2N1cnJlbnQnLCB0ZXh0OiAnQ3VycmVudCcgfSxcbiAgICB7IHZhbHVlOiAndG90YWwnLCB0ZXh0OiAnVG90YWwnIH0sXG4gICAgeyB2YWx1ZTogJ25hbWUnLCB0ZXh0OiAnTmFtZScgfSxcbiAgICB7IHZhbHVlOiAnZmlyc3QnLCB0ZXh0OiAnRmlyc3QnIH0sXG4gICAgeyB2YWx1ZTogJ2RlbHRhJywgdGV4dDogJ0RlbHRhJyB9LFxuICAgIHsgdmFsdWU6ICdkaWZmJywgdGV4dDogJ0RpZmZlcmVuY2UnIH0sXG4gICAgeyB2YWx1ZTogJ3JhbmdlJywgdGV4dDogJ1JhbmdlJyB9LFxuICAgIHsgdmFsdWU6ICdsYXN0X3RpbWUnLCB0ZXh0OiAnVGltZSBvZiBsYXN0IHBvaW50JyB9LFxuICBdO1xuICB0YWJsZUNvbHVtbk9wdGlvbnM6IGFueTtcbiAgdGhyZXNob2xkczogYW55W107XG5cbiAgLy8gU2V0IGFuZCBwb3B1bGF0ZSBkZWZhdWx0c1xuICBwYW5lbERlZmF1bHRzID0ge1xuICAgIGxpbmtzOiBbXSxcbiAgICBkYXRhc291cmNlOiBudWxsLFxuICAgIG1heERhdGFQb2ludHM6IDEwMCxcbiAgICBpbnRlcnZhbDogbnVsbCxcbiAgICB0YXJnZXRzOiBbe31dLFxuICAgIGNhY2hlVGltZW91dDogbnVsbCxcbiAgICBkZWZhdWx0Q29sb3I6ICdyZ2IoMTE3LCAxMTcsIDExNyknLFxuICAgIHRocmVzaG9sZHM6ICcnLFxuICAgIGZvcm1hdDogJ25vbmUnLFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIHNob3c6IHRydWVcbiAgICB9LFxuICAgIHNvcnRPcmRlcjogJ2FzYycsXG4gICAgcHJlZml4OiAnJyxcbiAgICBwb3N0Zml4OiAnJyxcbiAgICBudWxsVGV4dDogbnVsbCxcbiAgICB2YWx1ZU1hcHM6IFt7IHZhbHVlOiAnbnVsbCcsIG9wOiAnPScsIHRleHQ6ICdObyBkYXRhJyB9XSxcbiAgICBtYXBwaW5nVHlwZXM6IFt7IG5hbWU6ICd2YWx1ZSB0byB0ZXh0JywgdmFsdWU6IDEgfSwgeyBuYW1lOiAncmFuZ2UgdG8gdGV4dCcsIHZhbHVlOiAyIH1dLFxuICAgIHJhbmdlTWFwczogW3sgZnJvbTogJ251bGwnLCB0bzogJ251bGwnLCB0ZXh0OiAnTi9BJyB9XSxcbiAgICBtYXBwaW5nVHlwZTogMSxcbiAgICBudWxsUG9pbnRNb2RlOiAnY29ubmVjdGVkJyxcbiAgICB2YWx1ZU5hbWU6ICdhdmcnLFxuICAgIHByZWZpeEZvbnRTaXplOiAnNTAlJyxcbiAgICB2YWx1ZUZvbnRTaXplOiAnODAlJyxcbiAgICBwb3N0Zml4Rm9udFNpemU6ICc1MCUnLFxuICAgIG1hdGg6ICcnLFxuICAgIGNvbG9yQmFja2dyb3VuZDogZmFsc2UsXG4gICAgY2lyY2xlQmFja2dyb3VuZDogZmFsc2UsXG4gICAgdmFsdWVNYXBwaW5nQ29sb3JCYWNrZ3JvdW5kOiAnIzc2NzE3MScsXG4gICAgY29sb3JWYWx1ZTogZmFsc2UsXG4gICAgc3BhcmtsaW5lOiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIGZ1bGw6IGZhbHNlLFxuICAgICAgbGluZUNvbG9yOiAncmdiKDMxLCAxMjAsIDE5MyknLFxuICAgICAgZmlsbENvbG9yOiAncmdiYSgzMSwgMTE4LCAxODksIDAuMTgpJyxcbiAgICB9LFxuICAgIGdhdWdlOiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIG1pblZhbHVlOiAwLFxuICAgICAgbWF4VmFsdWU6IDEwMCxcbiAgICAgIHRocmVzaG9sZE1hcmtlcnM6IHRydWUsXG4gICAgICB0aHJlc2hvbGRMYWJlbHM6IGZhbHNlLFxuICAgIH0sXG4gICAgc29ydE9yZGVyT3B0aW9uczogW1xuICAgICAgeyB2YWx1ZTogJ2FzYycsIHRleHQ6ICdBc2NlbmRpbmcnfSxcbiAgICAgIHsgdmFsdWU6ICdkZXNjJywgdGV4dDogJ0Rlc2NlbmRpbmcnfSxcbiAgICBdLFxuICAgIHRhYmxlQ29sdW1uOiAnJyxcbiAgfTtcblxuICAvKiogQG5nSW5qZWN0ICovXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yLCBwcml2YXRlICRsb2NhdGlvbiwgcHJpdmF0ZSBsaW5rU3J2KSB7XG4gICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xuICAgIF8uZGVmYXVsdHModGhpcy5wYW5lbCwgdGhpcy5wYW5lbERlZmF1bHRzKTtcblxuICAgIHRoaXMuZXZlbnRzLm9uKCdkYXRhLXJlY2VpdmVkJywgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmV2ZW50cy5vbignZGF0YS1lcnJvcicsIHRoaXMub25EYXRhRXJyb3IuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudHMub24oJ2RhdGEtc25hcHNob3QtbG9hZCcsIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudHMub24oJ2luaXQtZWRpdC1tb2RlJywgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMub25TcGFya2xpbmVDb2xvckNoYW5nZSA9IHRoaXMub25TcGFya2xpbmVDb2xvckNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25TcGFya2xpbmVGaWxsQ2hhbmdlID0gdGhpcy5vblNwYXJrbGluZUZpbGxDaGFuZ2UuYmluZCh0aGlzKTtcblxuICAgIC8vR3JhYiBwcmV2aW91cyB2ZXJzaW9uIHRocmVzaG9sZHMgYW5kIHN0b3JlIGludG8gbmV3IGZvcm1hdFxuICAgIHZhciB0ID0gdGhpcy5wYW5lbC50aHJlc2hvbGRzO1xuICAgIGlmICh0eXBlb2YgdCA9PT0gJ3N0cmluZycgfHwgdCBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgdGhpcy5vbGRUaHJlc2hlc0NoYW5nZSh0KTtcbiAgICB9XG4gIH1cblxuICBvbkluaXRFZGl0TW9kZSgpIHtcbiAgICB0aGlzLmZvbnRTaXplcyA9IFsnMjAlJywgJzMwJScsICc1MCUnLCAnNzAlJywgJzgwJScsICcxMDAlJywgJzExMCUnLCAnMTIwJScsICcxNTAlJywgJzE3MCUnLCAnMjAwJSddO1xuICAgIHRoaXMuYWRkRWRpdG9yVGFiKCdPcHRpb25zJywgJ3B1YmxpYy9wbHVnaW5zL2JsYWNrbWlycm9yMS1zaW5nbGVzdGF0LW1hdGgtcGFuZWwvZWRpdG9yLmh0bWwnLCAyKTtcbiAgICB0aGlzLmFkZEVkaXRvclRhYignVmFsdWUgTWFwcGluZ3MnLCAncHVibGljL3BsdWdpbnMvYmxhY2ttaXJyb3IxLXNpbmdsZXN0YXQtbWF0aC1wYW5lbC9tYXBwaW5ncy5odG1sJywgMyk7XG4gICAgdGhpcy51bml0Rm9ybWF0cyA9IGtibi5nZXRVbml0Rm9ybWF0cygpO1xuICB9XG5cbiAgb2xkVGhyZXNoZXNDaGFuZ2UodGhyZXNoZXMpIHtcbiAgICB2YXIgYXJyYXkgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICBhcnJheSA9IEpTT04ucGFyc2UoXCJbXCIgKyB0aHJlc2hlcyArIFwiXVwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiSlNPTiBwYXJzZSBmYWlsZWRcIiArIGVyci5tZXNzYWdlKTtcbiAgICB9XG4gICAgaWYgKGFycmF5ID09PSBudWxsKSB7XG4gICAgICAvLyB1c2Ugc3BsaXQgbWV0aG9kIGluc3RlYWRcbiAgICAgIGFycmF5ID0gdGhyZXNoZXMuc3BsaXQoXCIsXCIpO1xuICAgIH1cbiAgICB0aGlzLnRocmVzaG9sZHMgPSBbXTsgLy9pbnN0YW50aWF0ZSBhIG5ldyBkZWZpbmVkIGRpY3Rpb25hcnlcblxuICAgIC8vcHVzaCBvbGQgaXRlbXMgaW50byBuZXcgZGljdGlvbmFyeVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB1c2VDb2xvciA9IHRoaXMucGFuZWwuZGVmYXVsdENvbG9yO1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhbmVsLmNvbG9ycyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAoaSA8IHRoaXMucGFuZWwuY29sb3JzLmxlbmd0aCkge1xuICAgICAgICAgIHVzZUNvbG9yID0gdGhpcy5wYW5lbC5jb2xvcnNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMudGhyZXNob2xkcy5wdXNoKHtcbiAgICAgICAgY29sb3I6IHVzZUNvbG9yLFxuICAgICAgICB2YWx1ZTogTnVtYmVyKGFycmF5W2ldKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vT3ZlcndyaXRlIEpTT05cbiAgICB0aGlzLnBhbmVsW1widGhyZXNob2xkc1wiXSA9IHRoaXMudGhyZXNob2xkcztcbiAgfVxuXG4gIHNvcnRNeVRocmVzaGVzKGNvbnRyb2wpIHtcbiAgICBpZih0aGlzLnBhbmVsLnNvcnRPcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgIGNvbnRyb2wucGFuZWwudGhyZXNob2xkcyA9IF8ub3JkZXJCeShjb250cm9sLnBhbmVsLnRocmVzaG9sZHMsIFtcInZhbHVlXCJdLCBbXCJhc2NcIl0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wYW5lbC5zb3J0T3JkZXIgPT09ICdkZXNjJykge1xuICAgICAgY29udHJvbC5wYW5lbC50aHJlc2hvbGRzID0gXy5vcmRlckJ5KGNvbnRyb2wucGFuZWwudGhyZXNob2xkcywgW1widmFsdWVcIl0sIFtcImRlc2NcIl0pO1xuICAgIH1cbiAgICB0aGlzLiRzY29wZS5jdHJsLnJlZnJlc2goKTtcbiAgfVxuXG4gIHNldFVuaXRGb3JtYXQoc3ViSXRlbSkge1xuICAgIHRoaXMucGFuZWwuZm9ybWF0ID0gc3ViSXRlbS52YWx1ZTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIG9uRGF0YUVycm9yKGVycikge1xuICAgIHRoaXMub25EYXRhUmVjZWl2ZWQoW10pO1xuICB9XG5cbiAgb25FZGl0b3JSZW1vdmVUaHJlc2hvbGQoaW5kZXgpIHtcbiAgICB0aGlzLnBhbmVsLnRocmVzaG9sZHMuc3BsaWNlKGluZGV4LCAxKVxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBvbkVkaXRvckFkZFRocmVzaG9sZCgpIHtcbiAgICB0aGlzLnBhbmVsLnRocmVzaG9sZHMucHVzaCh7Y29sb3I6IHRoaXMucGFuZWwuZGVmYXVsdENvbG9yfSlcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgb25EYXRhUmVjZWl2ZWQoZGF0YUxpc3QpIHtcbiAgICBjb25zdCBkYXRhOiBhbnkgPSB7fTtcbiAgICBpZiAoZGF0YUxpc3QubGVuZ3RoID4gMCAmJiBkYXRhTGlzdFswXS50eXBlID09PSAndGFibGUnKSB7XG4gICAgICB0aGlzLmRhdGFUeXBlID0gJ3RhYmxlJztcbiAgICAgIGNvbnN0IHRhYmxlRGF0YSA9IGRhdGFMaXN0Lm1hcCh0aGlzLnRhYmxlSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuc2V0VGFibGVWYWx1ZXModGFibGVEYXRhLCBkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhVHlwZSA9ICd0aW1lc2VyaWVzJztcbiAgICAgIHRoaXMuc2VyaWVzID0gZGF0YUxpc3QubWFwKHRoaXMuc2VyaWVzSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuc2V0VmFsdWVzKGRhdGEpO1xuICAgIH1cbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBzZXJpZXNIYW5kbGVyKHNlcmllc0RhdGEpIHtcbiAgICB2YXIgc2VyaWVzID0gbmV3IFRpbWVTZXJpZXMoe1xuICAgICAgZGF0YXBvaW50czogc2VyaWVzRGF0YS5kYXRhcG9pbnRzIHx8IFtdLFxuICAgICAgYWxpYXM6IHNlcmllc0RhdGEudGFyZ2V0LFxuICAgIH0pO1xuXG4gICAgc2VyaWVzLmZsb3RwYWlycyA9IHNlcmllcy5nZXRGbG90UGFpcnModGhpcy5wYW5lbC5udWxsUG9pbnRNb2RlKTtcbiAgICByZXR1cm4gc2VyaWVzO1xuICB9XG5cbiAgdGFibGVIYW5kbGVyKHRhYmxlRGF0YSkge1xuICAgIGNvbnN0IGRhdGFwb2ludHMgPSBbXTtcbiAgICBjb25zdCBjb2x1bW5OYW1lcyA9IHt9O1xuXG4gICAgdGFibGVEYXRhLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBjb2x1bW5JbmRleCkgPT4ge1xuICAgICAgY29sdW1uTmFtZXNbY29sdW1uSW5kZXhdID0gY29sdW1uLnRleHQ7XG4gICAgfSk7XG5cbiAgICB0aGlzLnRhYmxlQ29sdW1uT3B0aW9ucyA9IGNvbHVtbk5hbWVzO1xuICAgIGlmICghXy5maW5kKHRhYmxlRGF0YS5jb2x1bW5zLCBbJ3RleHQnLCB0aGlzLnBhbmVsLnRhYmxlQ29sdW1uXSkpIHtcbiAgICAgIHRoaXMuc2V0VGFibGVDb2x1bW5Ub1NlbnNpYmxlRGVmYXVsdCh0YWJsZURhdGEpO1xuICAgIH1cblxuICAgIHRhYmxlRGF0YS5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgIGNvbnN0IGRhdGFwb2ludCA9IHt9O1xuXG4gICAgICByb3cuZm9yRWFjaCgodmFsdWUsIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGNvbHVtbk5hbWVzW2NvbHVtbkluZGV4XTtcbiAgICAgICAgZGF0YXBvaW50W2tleV0gPSB2YWx1ZTtcbiAgICAgIH0pO1xuXG4gICAgICBkYXRhcG9pbnRzLnB1c2goZGF0YXBvaW50KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkYXRhcG9pbnRzO1xuICB9XG5cbiAgc2V0VGFibGVDb2x1bW5Ub1NlbnNpYmxlRGVmYXVsdCh0YWJsZURhdGEpIHtcbiAgICBpZiAodGFibGVEYXRhLmNvbHVtbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLnBhbmVsLnRhYmxlQ29sdW1uID0gdGFibGVEYXRhLmNvbHVtbnNbMF0udGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYW5lbC50YWJsZUNvbHVtbiA9IF8uZmluZCh0YWJsZURhdGEuY29sdW1ucywgY29sID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbC50eXBlICE9PSAndGltZSc7XG4gICAgICB9KS50ZXh0O1xuICAgIH1cbiAgfVxuXG4gIHNldFRhYmxlVmFsdWVzKHRhYmxlRGF0YSwgZGF0YSkge1xuICAgIGlmICghdGFibGVEYXRhIHx8IHRhYmxlRGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGFibGVEYXRhWzBdLmxlbmd0aCA9PT0gMCB8fCB0YWJsZURhdGFbMF1bMF1bdGhpcy5wYW5lbC50YWJsZUNvbHVtbl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGFwb2ludCA9IHRhYmxlRGF0YVswXVswXTtcbiAgICBkYXRhLnZhbHVlID0gZGF0YXBvaW50W3RoaXMucGFuZWwudGFibGVDb2x1bW5dO1xuXG4gICAgaWYgKF8uaXNTdHJpbmcoZGF0YS52YWx1ZSkpIHtcbiAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSBfLmVzY2FwZShkYXRhLnZhbHVlKTtcbiAgICAgIGRhdGEudmFsdWUgPSAwO1xuICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkZWNpbWFsSW5mbyA9IHRoaXMuZ2V0RGVjaW1hbHNGb3JWYWx1ZShkYXRhLnZhbHVlKTtcbiAgICAgIGNvbnN0IGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW3RoaXMucGFuZWwuZm9ybWF0XTtcbiAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSBmb3JtYXRGdW5jKFxuICAgICAgICBkYXRhcG9pbnRbdGhpcy5wYW5lbC50YWJsZUNvbHVtbl0sXG4gICAgICAgIGRlY2ltYWxJbmZvLmRlY2ltYWxzLFxuICAgICAgICBkZWNpbWFsSW5mby5zY2FsZWREZWNpbWFsc1xuICAgICAgKTtcbiAgICAgIGRhdGEudmFsdWVSb3VuZGVkID0ga2JuLnJvdW5kVmFsdWUoZGF0YS52YWx1ZSwgdGhpcy5wYW5lbC5kZWNpbWFscyB8fCAwKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFZhbHVlTWFwcGluZyhkYXRhKTtcbiAgfVxuXG4gIGNhbkNoYW5nZUZvbnRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLnBhbmVsLmdhdWdlLnNob3c7XG4gIH1cblxuICBvblNwYXJrbGluZUNvbG9yQ2hhbmdlKG5ld0NvbG9yKSB7XG4gICAgdGhpcy5wYW5lbC5zcGFya2xpbmUubGluZUNvbG9yID0gbmV3Q29sb3I7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIG9uU3BhcmtsaW5lRmlsbENoYW5nZShuZXdDb2xvcikge1xuICAgIHRoaXMucGFuZWwuc3BhcmtsaW5lLmZpbGxDb2xvciA9IG5ld0NvbG9yO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBnZXREZWNpbWFsc0ZvclZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKF8uaXNOdW1iZXIodGhpcy5wYW5lbC5kZWNpbWFscykpIHtcbiAgICAgIHJldHVybiB7IGRlY2ltYWxzOiB0aGlzLnBhbmVsLmRlY2ltYWxzLCBzY2FsZWREZWNpbWFsczogbnVsbCB9O1xuICAgIH1cblxuICAgIHZhciBkZWx0YSA9IHZhbHVlIC8gMjtcbiAgICB2YXIgZGVjID0gLU1hdGguZmxvb3IoTWF0aC5sb2coZGVsdGEpIC8gTWF0aC5MTjEwKTtcblxuICAgIHZhciBtYWduID0gTWF0aC5wb3coMTAsIC1kZWMpLFxuICAgICAgbm9ybSA9IGRlbHRhIC8gbWFnbiwgLy8gbm9ybSBpcyBiZXR3ZWVuIDEuMCBhbmQgMTAuMFxuICAgICAgc2l6ZTtcblxuICAgIGlmIChub3JtIDwgMS41KSB7XG4gICAgICBzaXplID0gMTtcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCAzKSB7XG4gICAgICBzaXplID0gMjtcbiAgICAgIC8vIHNwZWNpYWwgY2FzZSBmb3IgMi41LCByZXF1aXJlcyBhbiBleHRyYSBkZWNpbWFsXG4gICAgICBpZiAobm9ybSA+IDIuMjUpIHtcbiAgICAgICAgc2l6ZSA9IDIuNTtcbiAgICAgICAgKytkZWM7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub3JtIDwgNy41KSB7XG4gICAgICBzaXplID0gNTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2l6ZSA9IDEwO1xuICAgIH1cblxuICAgIHNpemUgKj0gbWFnbjtcblxuICAgIC8vIHJlZHVjZSBzdGFydGluZyBkZWNpbWFscyBpZiBub3QgbmVlZGVkXG4gICAgaWYgKE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSkge1xuICAgICAgZGVjID0gMDtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0OiBhbnkgPSB7fTtcbiAgICByZXN1bHQuZGVjaW1hbHMgPSBNYXRoLm1heCgwLCBkZWMpO1xuICAgIHJlc3VsdC5zY2FsZWREZWNpbWFscyA9IHJlc3VsdC5kZWNpbWFscyAtIE1hdGguZmxvb3IoTWF0aC5sb2coc2l6ZSkgLyBNYXRoLkxOMTApICsgMjtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzZXRWYWx1ZXMoZGF0YSkge1xuICAgIGRhdGEuZmxvdHBhaXJzID0gW107XG5cbiAgICBpZiAodGhpcy5zZXJpZXMubGVuZ3RoID4gMSB8fCB0aGlzLnBhbmVsLm1hdGgubGVuZ3RoKSB7XG4gICAgICBsZXQgbGFzdFBvaW50ID0gW107XG4gICAgICBsZXQgbGFzdFZhbHVlID0gW107XG4gICAgICB0aGlzLnNlcmllcy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICBsYXN0UG9pbnRbaW5kZXhdID0gXy5sYXN0KGVsZW1lbnQuZGF0YXBvaW50cyk7XG4gICAgICAgIGxhc3RWYWx1ZVtpbmRleF0gPSBfLmlzQXJyYXkobGFzdFBvaW50W2luZGV4XSkgPyBsYXN0UG9pbnRbaW5kZXhdWzBdIDogbnVsbDtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5wYW5lbC52YWx1ZU5hbWUgPT09ICduYW1lJykge1xuICAgICAgICBkYXRhLnZhbHVlID0gMDtcbiAgICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSAwO1xuICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gdGhpcy5zZXJpZXNbMF0uYWxpYXM7XG5cbiAgICAgIH0gZWxzZSBpZiAoXy5pc1N0cmluZyhsYXN0VmFsdWVbMF0pKSB7XG4gICAgICAgIGRhdGEudmFsdWUgPSAwO1xuICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gXy5lc2NhcGUobGFzdFZhbHVlWzBdKTtcbiAgICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSAwO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnBhbmVsLnZhbHVlTmFtZSA9PT0gJ2xhc3RfdGltZScpIHtcbiAgICAgICAgbGV0IGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW3RoaXMucGFuZWwuZm9ybWF0XTtcbiAgICAgICAgZGF0YS52YWx1ZSA9IGxhc3RQb2ludFswXVsxXTtcbiAgICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSBkYXRhLnZhbHVlO1xuICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gZm9ybWF0RnVuYyhkYXRhLnZhbHVlLCAwLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnBhbmVsLm1hdGgubGVuZ3RoKXtcbiAgICAgICAgICB2YXIgbWF0aEZ1bmN0aW9uID0gdGhpcy5wYW5lbC5tYXRoO1xuICAgICAgICAgIHRoaXMuc2VyaWVzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBtYXRoRnVuY3Rpb24gPSBtYXRoRnVuY3Rpb24ucmVwbGFjZShuZXcgUmVnRXhwKGVsZW1lbnQuYWxpYXMsICdnaScpLCBTdHJpbmcoZWxlbWVudC5zdGF0c1t0aGlzLnBhbmVsLnZhbHVlTmFtZV0pKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbWF0aEZ1bmN0aW9uID0gbWF0aEZ1bmN0aW9uLnJlcGxhY2UobmV3IFJlZ0V4cCgnW0EtemEtel0rJywgJ2dpJyksIFN0cmluZygwKSk7XG4gICAgICAgICAgICBkYXRhLnZhbHVlID0gbWF0aC5ldmFsKG1hdGhGdW5jdGlvbik7XG4gICAgICAgICAgICBkYXRhLmZsb3RwYWlycyA9IHRoaXMuc2VyaWVzWzBdLmZsb3RwYWlycztcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvL0Vycm9yIGV2YWx1YXRpbmcgZnVuY3Rpb24uIERlZmF1bHRpbmcgdG8gemVyby5cbiAgICAgICAgICAgIGRhdGEudmFsdWUgPSAwO1xuICAgICAgICAgICAgZGF0YS5mbG90cGFpcnMgPSBbMCwwXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICBkYXRhLnZhbHVlID0gdGhpcy5zZXJpZXNbMF0uc3RhdHNbdGhpcy5wYW5lbC52YWx1ZU5hbWVdO1xuICAgICAgICAgIGRhdGEuZmxvdHBhaXJzID0gdGhpcy5zZXJpZXNbMF0uZmxvdHBhaXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRlY2ltYWxJbmZvID0gdGhpcy5nZXREZWNpbWFsc0ZvclZhbHVlKGRhdGEudmFsdWUpO1xuICAgICAgICBsZXQgZm9ybWF0RnVuYyA9IGtibi52YWx1ZUZvcm1hdHNbdGhpcy5wYW5lbC5mb3JtYXRdO1xuICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gZm9ybWF0RnVuYyhkYXRhLnZhbHVlLCBkZWNpbWFsSW5mby5kZWNpbWFscywgZGVjaW1hbEluZm8uc2NhbGVkRGVjaW1hbHMpO1xuICAgICAgICBkYXRhLnZhbHVlUm91bmRlZCA9IGtibi5yb3VuZFZhbHVlKGRhdGEudmFsdWUsIGRlY2ltYWxJbmZvLmRlY2ltYWxzKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkICRfX25hbWUgdmFyaWFibGUgZm9yIHVzaW5nIGluIHByZWZpeCBvciBwb3N0Zml4XG4gICAgICBpZih0aGlzLnNlcmllcyAmJiB0aGlzLnNlcmllcy5sZW5ndGggPiAwKXtcbiAgICAgICAgZGF0YS5zY29wZWRWYXJzID0gXy5leHRlbmQoe30sIHRoaXMucGFuZWwuc2NvcGVkVmFycyk7XG4gICAgICAgIGRhdGEuc2NvcGVkVmFyc1snX19uYW1lJ10gPSB7IHZhbHVlOiB0aGlzLnNlcmllc1swXS5sYWJlbCB9O1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VyaWVzICYmIHRoaXMuc2VyaWVzLmxlbmd0aCA+IDAgJiYgdGhpcy5zZXJpZXMubGVuZ3RoIDwgMiAmJiAhdGhpcy5wYW5lbC5tYXRoLmxlbmd0aCkge1xuICAgICAgbGV0IGxhc3RQb2ludCA9IF8ubGFzdCh0aGlzLnNlcmllc1swXS5kYXRhcG9pbnRzKTtcbiAgICAgIGxldCBsYXN0VmFsdWUgPSBfLmlzQXJyYXkobGFzdFBvaW50KSA/IGxhc3RQb2ludFswXSA6IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLnBhbmVsLnZhbHVlTmFtZSA9PT0gJ25hbWUnKSB7XG4gICAgICAgIGRhdGEudmFsdWUgPSAwO1xuICAgICAgICBkYXRhLnZhbHVlUm91bmRlZCA9IDA7XG4gICAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSB0aGlzLnNlcmllc1swXS5hbGlhcztcbiAgICAgIH0gZWxzZSBpZiAoXy5pc1N0cmluZyhsYXN0VmFsdWUpKSB7XG4gICAgICAgIGRhdGEudmFsdWUgPSAwO1xuICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gXy5lc2NhcGUobGFzdFZhbHVlKTtcbiAgICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSAwO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnBhbmVsLnZhbHVlTmFtZSA9PT0gJ2xhc3RfdGltZScpIHtcbiAgICAgICAgbGV0IGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW3RoaXMucGFuZWwuZm9ybWF0XTtcbiAgICAgICAgZGF0YS52YWx1ZSA9IGxhc3RQb2ludFsxXTtcbiAgICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSBkYXRhLnZhbHVlO1xuICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gZm9ybWF0RnVuYyhkYXRhLnZhbHVlLCAwLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEudmFsdWUgPSB0aGlzLnNlcmllc1swXS5zdGF0c1t0aGlzLnBhbmVsLnZhbHVlTmFtZV07XG4gICAgICAgIGRhdGEuZmxvdHBhaXJzID0gdGhpcy5zZXJpZXNbMF0uZmxvdHBhaXJzO1xuXG4gICAgICAgIGxldCBkZWNpbWFsSW5mbyA9IHRoaXMuZ2V0RGVjaW1hbHNGb3JWYWx1ZShkYXRhLnZhbHVlKTtcbiAgICAgICAgbGV0IGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW3RoaXMucGFuZWwuZm9ybWF0XTtcbiAgICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IGZvcm1hdEZ1bmMoZGF0YS52YWx1ZSwgZGVjaW1hbEluZm8uZGVjaW1hbHMsIGRlY2ltYWxJbmZvLnNjYWxlZERlY2ltYWxzKTtcbiAgICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSBrYm4ucm91bmRWYWx1ZShkYXRhLnZhbHVlLCBkZWNpbWFsSW5mby5kZWNpbWFscyk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCAkX19uYW1lIHZhcmlhYmxlIGZvciB1c2luZyBpbiBwcmVmaXggb3IgcG9zdGZpeFxuICAgICAgZGF0YS5zY29wZWRWYXJzID0gXy5leHRlbmQoe30sIHRoaXMucGFuZWwuc2NvcGVkVmFycyk7XG4gICAgICBkYXRhLnNjb3BlZFZhcnNbJ19fbmFtZSddID0geyB2YWx1ZTogdGhpcy5zZXJpZXNbMF0ubGFiZWwgfTtcbiAgICB9XG4gICAgdGhpcy5zZXRWYWx1ZU1hcHBpbmcoZGF0YSk7XG4gIH1cblxuICBzZXRWYWx1ZU1hcHBpbmcoZGF0YSkge1xuICAgIC8vIGNoZWNrIHZhbHVlIHRvIHRleHQgbWFwcGluZ3MgaWYgaXRzIGVuYWJsZWRcbiAgICBpZiAodGhpcy5wYW5lbC5tYXBwaW5nVHlwZSA9PT0gMSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhbmVsLnZhbHVlTWFwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbWFwID0gdGhpcy5wYW5lbC52YWx1ZU1hcHNbaV07XG4gICAgICAgIC8vIHNwZWNpYWwgbnVsbCBjYXNlXG4gICAgICAgIGlmIChtYXAudmFsdWUgPT09ICdudWxsJykge1xuICAgICAgICAgIGlmIChkYXRhLnZhbHVlID09PSBudWxsIHx8IGRhdGEudmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IG1hcC50ZXh0O1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbHVlL251bWJlciB0byB0ZXh0IG1hcHBpbmdcbiAgICAgICAgdmFyIHZhbHVlID0gcGFyc2VGbG9hdChtYXAudmFsdWUpO1xuICAgICAgICBpZiAodmFsdWUgPT09IGRhdGEudmFsdWVSb3VuZGVkKSB7XG4gICAgICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IG1hcC50ZXh0O1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5wYW5lbC5tYXBwaW5nVHlwZSA9PT0gMikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhbmVsLnJhbmdlTWFwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbWFwID0gdGhpcy5wYW5lbC5yYW5nZU1hcHNbaV07XG4gICAgICAgIC8vIHNwZWNpYWwgbnVsbCBjYXNlXG4gICAgICAgIGlmIChtYXAuZnJvbSA9PT0gJ251bGwnICYmIG1hcC50byA9PT0gJ251bGwnKSB7XG4gICAgICAgICAgaWYgKGRhdGEudmFsdWUgPT09IG51bGwgfHwgZGF0YS52YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gbWFwLnRleHQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsdWUvbnVtYmVyIHRvIHJhbmdlIG1hcHBpbmdcbiAgICAgICAgdmFyIGZyb20gPSBwYXJzZUZsb2F0KG1hcC5mcm9tKTtcbiAgICAgICAgdmFyIHRvID0gcGFyc2VGbG9hdChtYXAudG8pO1xuICAgICAgICBpZiAodG8gPj0gZGF0YS52YWx1ZVJvdW5kZWQgJiYgZnJvbSA8PSBkYXRhLnZhbHVlUm91bmRlZCkge1xuICAgICAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSBtYXAudGV4dDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGF0YS52YWx1ZSA9PT0gbnVsbCB8fCBkYXRhLnZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSAnbm8gdmFsdWUnO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVZhbHVlTWFwKG1hcCkge1xuICAgIHZhciBpbmRleCA9IF8uaW5kZXhPZih0aGlzLnBhbmVsLnZhbHVlTWFwcywgbWFwKTtcbiAgICB0aGlzLnBhbmVsLnZhbHVlTWFwcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBhZGRWYWx1ZU1hcCgpIHtcbiAgICB0aGlzLnBhbmVsLnZhbHVlTWFwcy5wdXNoKHsgdmFsdWU6ICcnLCBvcDogJz0nLCB0ZXh0OiAnJyB9KTtcbiAgfVxuXG4gIHJlbW92ZVJhbmdlTWFwKHJhbmdlTWFwKSB7XG4gICAgdmFyIGluZGV4ID0gXy5pbmRleE9mKHRoaXMucGFuZWwucmFuZ2VNYXBzLCByYW5nZU1hcCk7XG4gICAgdGhpcy5wYW5lbC5yYW5nZU1hcHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYWRkUmFuZ2VNYXAoKSB7XG4gICAgdGhpcy5wYW5lbC5yYW5nZU1hcHMucHVzaCh7IGZyb206ICcnLCB0bzogJycsIHRleHQ6ICcnIH0pO1xuICB9XG5cbiAgbGluayhzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcbiAgICB2YXIgJGxvY2F0aW9uID0gdGhpcy4kbG9jYXRpb247XG4gICAgdmFyIGxpbmtTcnYgPSB0aGlzLmxpbmtTcnY7XG4gICAgdmFyICR0aW1lb3V0ID0gdGhpcy4kdGltZW91dDtcbiAgICB2YXIgcGFuZWwgPSBjdHJsLnBhbmVsO1xuICAgIHZhciB0ZW1wbGF0ZVNydiA9IHRoaXMudGVtcGxhdGVTcnY7XG4gICAgdmFyIGRhdGEsIGxpbmtJbmZvO1xuICAgIGVsZW0gPSBlbGVtLmZpbmQoJy5zaW5nbGVzdGF0bWF0aC1wYW5lbCcpO1xuXG4gICAgZnVuY3Rpb24gZ2V0UGFuZWxDb250YWluZXIoKSB7XG4gICAgICByZXR1cm4gZWxlbS5jbG9zZXN0KCcucGFuZWwtY29udGFpbmVyJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwbHlDb2xvcmluZ1RocmVzaG9sZHModmFsdWUsIHZhbHVlU3RyaW5nKSB7XG4gICAgICBpZiAoIXBhbmVsLmNvbG9yVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlU3RyaW5nO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29sb3IgPSBnZXRDb2xvckZvclZhbHVlKHBhbmVsLnRocmVzaG9sZHMsIGRhdGEudmFsdWUpO1xuXG4gICAgICBpZiAoZGF0YS52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIGNvbG9yID0gcGFuZWwudmFsdWVNYXBwaW5nQ29sb3JCYWNrZ3JvdW5kO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgcmV0dXJuICc8c3BhbiBzdHlsZT1cImNvbG9yOicgKyBjb2xvciArICdcIj4nICsgdmFsdWVTdHJpbmcgKyAnPC9zcGFuPic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZVN0cmluZztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTcGFuKGNsYXNzTmFtZSwgZm9udFNpemUsIHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHRlbXBsYXRlU3J2LnJlcGxhY2UodmFsdWUsIGRhdGEuc2NvcGVkVmFycyk7XG4gICAgICByZXR1cm4gJzxzcGFuIGNsYXNzPVwiJyArIGNsYXNzTmFtZSArICdcIiBzdHlsZT1cImZvbnQtc2l6ZTonICsgZm9udFNpemUgKyAnXCI+JyArIHZhbHVlICsgJzwvc3Bhbj4nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJpZ1ZhbHVlSHRtbCgpIHtcbiAgICAgIHZhciBib2R5ID0gJzxkaXYgY2xhc3M9XCJzaW5nbGVzdGF0bWF0aC1wYW5lbC12YWx1ZS1jb250YWluZXJcIj4nO1xuXG4gICAgICBpZiAocGFuZWwucHJlZml4KSB7XG4gICAgICAgIHZhciBwcmVmaXggPSBhcHBseUNvbG9yaW5nVGhyZXNob2xkcyhkYXRhLnZhbHVlLCBwYW5lbC5wcmVmaXgpO1xuICAgICAgICBib2R5ICs9IGdldFNwYW4oJ3NpbmdsZXN0YXRtYXRoLXBhbmVsLXByZWZpeCcsIHBhbmVsLnByZWZpeEZvbnRTaXplLCBwcmVmaXgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWUgPSBhcHBseUNvbG9yaW5nVGhyZXNob2xkcyhkYXRhLnZhbHVlLCBkYXRhLnZhbHVlRm9ybWF0dGVkKTtcbiAgICAgIGJvZHkgKz0gZ2V0U3Bhbignc2luZ2xlc3RhdG1hdGgtcGFuZWwtdmFsdWUnLCBwYW5lbC52YWx1ZUZvbnRTaXplLCB2YWx1ZSk7XG5cbiAgICAgIGlmIChwYW5lbC5wb3N0Zml4KSB7XG4gICAgICAgIHZhciBwb3N0Zml4ID0gYXBwbHlDb2xvcmluZ1RocmVzaG9sZHMoZGF0YS52YWx1ZSwgcGFuZWwucG9zdGZpeCk7XG4gICAgICAgIGJvZHkgKz0gZ2V0U3Bhbignc2luZ2xlc3RhdG1hdGgtcGFuZWwtcG9zdGZpeCcsIHBhbmVsLnBvc3RmaXhGb250U2l6ZSwgcG9zdGZpeCk7XG4gICAgICB9XG5cbiAgICAgIGJvZHkgKz0gJzwvZGl2Pic7XG5cbiAgICAgIHJldHVybiBib2R5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFZhbHVlVGV4dCgpIHtcbiAgICAgIHZhciByZXN1bHQgPSBwYW5lbC5wcmVmaXggPyB0ZW1wbGF0ZVNydi5yZXBsYWNlKHBhbmVsLnByZWZpeCwgZGF0YS5zY29wZWRWYXJzKSA6ICcnO1xuICAgICAgcmVzdWx0ICs9IGRhdGEudmFsdWVGb3JtYXR0ZWQ7XG4gICAgICByZXN1bHQgKz0gcGFuZWwucG9zdGZpeCA/IHRlbXBsYXRlU3J2LnJlcGxhY2UocGFuZWwucG9zdGZpeCwgZGF0YS5zY29wZWRWYXJzKSA6ICcnO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZEdhdWdlKCkge1xuICAgICAgdmFyIHdpZHRoID0gZWxlbS53aWR0aCgpO1xuICAgICAgdmFyIGhlaWdodCA9IGVsZW0uaGVpZ2h0KCk7XG4gICAgICAvLyBBbGxvdyB0byB1c2UgYSBiaXQgbW9yZSBzcGFjZSBmb3Igd2lkZSBnYXVnZXNcbiAgICAgIHZhciBkaW1lbnNpb24gPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0ICogMS4zKTtcblxuICAgICAgY3RybC5pbnZhbGlkR2F1Z2VSYW5nZSA9IGZhbHNlO1xuICAgICAgaWYgKHBhbmVsLmdhdWdlLm1pblZhbHVlID4gcGFuZWwuZ2F1Z2UubWF4VmFsdWUpIHtcbiAgICAgICAgY3RybC5pbnZhbGlkR2F1Z2VSYW5nZSA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHBsb3RDYW52YXMgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgdmFyIHBsb3RDc3MgPSB7XG4gICAgICAgIHRvcDogJzEwcHgnLFxuICAgICAgICBtYXJnaW46ICdhdXRvJyxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIGhlaWdodDogaGVpZ2h0ICogMC45ICsgJ3B4JyxcbiAgICAgICAgd2lkdGg6IGRpbWVuc2lvbiArICdweCcsXG4gICAgICB9O1xuXG4gICAgICBwbG90Q2FudmFzLmNzcyhwbG90Q3NzKTtcblxuICAgICAgdmFyIHRocmVzaG9sZHMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFuZWwudGhyZXNob2xkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aHJlc2hvbGRzLnB1c2goe1xuICAgICAgICAgIHZhbHVlOiBwYW5lbC50aHJlc2hvbGRzW2ldLnZhbHVlLFxuICAgICAgICAgIGNvbG9yOiBwYW5lbC50aHJlc2hvbGRzW2ldLmNvbG9yLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRocmVzaG9sZHMucHVzaCh7XG4gICAgICAgIHZhbHVlOiBwYW5lbC5nYXVnZS5tYXhWYWx1ZSxcbiAgICAgICAgY29sb3I6IHBhbmVsLnRocmVzaG9sZHNbcGFuZWwudGhyZXNob2xkcy5sZW5ndGggLSAxXSxcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgYmdDb2xvciA9IGNvbmZpZy5ib290RGF0YS51c2VyLmxpZ2h0VGhlbWUgPyAncmdiKDIzMCwyMzAsMjMwKScgOiAncmdiKDM4LDM4LDM4KSc7XG5cbiAgICAgIHZhciBmb250U2NhbGUgPSBwYXJzZUludChwYW5lbC52YWx1ZUZvbnRTaXplKSAvIDEwMDtcbiAgICAgIHZhciBmb250U2l6ZSA9IE1hdGgubWluKGRpbWVuc2lvbiAvIDUsIDEwMCkgKiBmb250U2NhbGU7XG4gICAgICAvLyBSZWR1Y2UgZ2F1Z2Ugd2lkdGggaWYgdGhyZXNob2xkIGxhYmVscyBlbmFibGVkXG4gICAgICB2YXIgZ2F1Z2VXaWR0aFJlZHVjZVJhdGlvID0gcGFuZWwuZ2F1Z2UudGhyZXNob2xkTGFiZWxzID8gMS41IDogMTtcbiAgICAgIHZhciBnYXVnZVdpZHRoID0gTWF0aC5taW4oZGltZW5zaW9uIC8gNiwgNjApIC8gZ2F1Z2VXaWR0aFJlZHVjZVJhdGlvO1xuICAgICAgdmFyIHRocmVzaG9sZE1hcmtlcnNXaWR0aCA9IGdhdWdlV2lkdGggLyA1O1xuICAgICAgdmFyIHRocmVzaG9sZExhYmVsRm9udFNpemUgPSBmb250U2l6ZSAvIDIuNTtcblxuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIHNlcmllczoge1xuICAgICAgICAgIGdhdWdlczoge1xuICAgICAgICAgICAgZ2F1Z2U6IHtcbiAgICAgICAgICAgICAgbWluOiBwYW5lbC5nYXVnZS5taW5WYWx1ZSxcbiAgICAgICAgICAgICAgbWF4OiBwYW5lbC5nYXVnZS5tYXhWYWx1ZSxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogeyBjb2xvcjogYmdDb2xvciB9LFxuICAgICAgICAgICAgICBib3JkZXI6IHsgY29sb3I6IG51bGwgfSxcbiAgICAgICAgICAgICAgc2hhZG93OiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICAgIHdpZHRoOiBnYXVnZVdpZHRoLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyYW1lOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICBsYWJlbDogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICAgICAgbGF5b3V0OiB7IG1hcmdpbjogMCwgdGhyZXNob2xkV2lkdGg6IDAgfSxcbiAgICAgICAgICAgIGNlbGw6IHsgYm9yZGVyOiB7IHdpZHRoOiAwIH0gfSxcbiAgICAgICAgICAgIHRocmVzaG9sZDoge1xuICAgICAgICAgICAgICB2YWx1ZXM6IHRocmVzaG9sZHMsXG4gICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogcGFuZWwuZ2F1Z2UudGhyZXNob2xkTGFiZWxzLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogdGhyZXNob2xkTWFya2Vyc1dpZHRoICsgMSxcbiAgICAgICAgICAgICAgICBmb250OiB7IHNpemU6IHRocmVzaG9sZExhYmVsRm9udFNpemUgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2hvdzogcGFuZWwuZ2F1Z2UudGhyZXNob2xkTWFya2VycyxcbiAgICAgICAgICAgICAgd2lkdGg6IHRocmVzaG9sZE1hcmtlcnNXaWR0aCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICBjb2xvcjogcGFuZWwuY29sb3JWYWx1ZSA/IGdldENvbG9yRm9yVmFsdWUocGFuZWwudGhyZXNob2xkcywgZGF0YS52YWx1ZVJvdW5kZWQpIDogbnVsbCxcbiAgICAgICAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0VmFsdWVUZXh0KCk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGZvbnQ6IHtcbiAgICAgICAgICAgICAgICBzaXplOiBmb250U2l6ZSxcbiAgICAgICAgICAgICAgICBmYW1pbHk6ICdcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGVsZW0uYXBwZW5kKHBsb3RDYW52YXMpO1xuXG4gICAgICB2YXIgcGxvdFNlcmllcyA9IHtcbiAgICAgICAgZGF0YTogW1swLCBkYXRhLnZhbHVlUm91bmRlZF1dLFxuICAgICAgfTtcblxuICAgICAgJC5wbG90KHBsb3RDYW52YXMsIFtwbG90U2VyaWVzXSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkU3BhcmtsaW5lKCkge1xuICAgICAgdmFyIHdpZHRoID0gZWxlbS53aWR0aCgpICsgMjA7XG4gICAgICBpZiAod2lkdGggPCAzMCkge1xuICAgICAgICAvLyBlbGVtZW50IGhhcyBub3QgZ290dGVuIGl0J3Mgd2lkdGggeWV0XG4gICAgICAgIC8vIGRlbGF5IHNwYXJrbGluZSByZW5kZXJcbiAgICAgICAgc2V0VGltZW91dChhZGRTcGFya2xpbmUsIDMwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgaGVpZ2h0ID0gY3RybC5oZWlnaHQ7XG4gICAgICB2YXIgcGxvdENhbnZhcyA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICB2YXIgcGxvdENzczogYW55ID0ge307XG4gICAgICBwbG90Q3NzLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuICAgICAgaWYgKHBhbmVsLnNwYXJrbGluZS5mdWxsKSB7XG4gICAgICAgIHBsb3RDc3MuYm90dG9tID0gJzVweCc7XG4gICAgICAgIHBsb3RDc3MubGVmdCA9ICctNXB4JztcbiAgICAgICAgcGxvdENzcy53aWR0aCA9IHdpZHRoIC0gMTAgKyAncHgnO1xuICAgICAgICB2YXIgZHluYW1pY0hlaWdodE1hcmdpbiA9IGhlaWdodCA8PSAxMDAgPyA1IDogTWF0aC5yb3VuZChoZWlnaHQgLyAxMDApICogMTUgKyA1O1xuICAgICAgICBwbG90Q3NzLmhlaWdodCA9IGhlaWdodCAtIGR5bmFtaWNIZWlnaHRNYXJnaW4gKyAncHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGxvdENzcy5ib3R0b20gPSAnMHB4JztcbiAgICAgICAgcGxvdENzcy5sZWZ0ID0gJy01cHgnO1xuICAgICAgICBwbG90Q3NzLndpZHRoID0gd2lkdGggLSAxMCArICdweCc7XG4gICAgICAgIHBsb3RDc3MuaGVpZ2h0ID0gTWF0aC5mbG9vcihoZWlnaHQgKiAwLjI1KSArICdweCc7XG4gICAgICB9XG5cbiAgICAgIHBsb3RDYW52YXMuY3NzKHBsb3RDc3MpO1xuXG4gICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgbGVnZW5kOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgIHNlcmllczoge1xuICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgZmlsbDogMSxcbiAgICAgICAgICAgIGxpbmVXaWR0aDogMSxcbiAgICAgICAgICAgIGZpbGxDb2xvcjogcGFuZWwuc3BhcmtsaW5lLmZpbGxDb2xvcixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB5YXhlczogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICB4YXhpczoge1xuICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgIG1vZGU6ICd0aW1lJyxcbiAgICAgICAgICBtaW46IGN0cmwucmFuZ2UuZnJvbS52YWx1ZU9mKCksXG4gICAgICAgICAgbWF4OiBjdHJsLnJhbmdlLnRvLnZhbHVlT2YoKSxcbiAgICAgICAgfSxcbiAgICAgICAgZ3JpZDogeyBob3ZlcmFibGU6IGZhbHNlLCBzaG93OiBmYWxzZSB9LFxuICAgICAgfTtcblxuICAgICAgZWxlbS5hcHBlbmQocGxvdENhbnZhcyk7XG5cbiAgICAgIHZhciBwbG90U2VyaWVzID0ge1xuICAgICAgICBkYXRhOiBkYXRhLmZsb3RwYWlycyxcbiAgICAgICAgY29sb3I6IHBhbmVsLnNwYXJrbGluZS5saW5lQ29sb3IsXG4gICAgICB9O1xuXG4gICAgICAkLnBsb3QocGxvdENhbnZhcywgW3Bsb3RTZXJpZXNdLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICBpZiAoIWN0cmwuZGF0YSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkYXRhID0gY3RybC5kYXRhO1xuICAgICAgdmFyIGJvZHkgPSBwYW5lbC5nYXVnZS5zaG93ID8gJycgOiBnZXRCaWdWYWx1ZUh0bWwoKTtcbiAgICAgIHZhciBjb2xvciA9ICcnO1xuICAgICAgaWYgKHBhbmVsLmNvbG9yQmFja2dyb3VuZCkge1xuICAgICAgICBpZiAoZGF0YS52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgY29sb3IgPSBwYW5lbC52YWx1ZU1hcHBpbmdDb2xvckJhY2tncm91bmQ7IC8vbnVsbCBvciBncmV5IHZhbHVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29sb3IgPSBnZXRDb2xvckZvclZhbHVlKHBhbmVsLnRocmVzaG9sZHMsIGRhdGEudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgIGdldFBhbmVsQ29udGFpbmVyKCkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICAgIGlmIChzY29wZS5mdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBlbGVtLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnZXRQYW5lbENvbnRhaW5lcigpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcnKTtcbiAgICAgICAgZWxlbS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnJyk7XG4gICAgICAgIHBhbmVsLmNpcmNsZUJhY2tncm91bmQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gQ29udmVydCB0byBDaXJjbGVcbiAgICAgIGlmIChwYW5lbC5jaXJjbGVCYWNrZ3JvdW5kKSB7XG4gICAgICAgICQoZ2V0UGFuZWxDb250YWluZXIoKSkuYWRkQ2xhc3MoJ2NpcmNsZScpO1xuICAgICAgICBnZXRQYW5lbENvbnRhaW5lcigpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcnKTtcbiAgICAgICAgZWxlbS5jc3Moe1xuICAgICAgICAgICdib3JkZXItcmFkaXVzJzogNTAgKyAnJScsXG4gICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBjb2xvclxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoZ2V0UGFuZWxDb250YWluZXIoKS5yZW1vdmVDbGFzcygnY2lyY2xlJykpO1xuICAgICAgICBlbGVtLmNzcyh7ICdib3JkZXItcmFkaXVzJzogJzAnIH0pO1xuICAgICAgfVxuXG4gICAgICBlbGVtLmh0bWwoYm9keSk7XG5cbiAgICAgIGlmIChwYW5lbC5zcGFya2xpbmUuc2hvdykge1xuICAgICAgICBhZGRTcGFya2xpbmUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhbmVsLmdhdWdlLnNob3cpIHtcbiAgICAgICAgYWRkR2F1Z2UoKTtcbiAgICAgIH1cblxuICAgICAgZWxlbS50b2dnbGVDbGFzcygncG9pbnRlcicsIHBhbmVsLmxpbmtzLmxlbmd0aCA+IDApO1xuXG4gICAgICBpZiAocGFuZWwubGlua3MubGVuZ3RoID4gMCkge1xuICAgICAgICBsaW5rSW5mbyA9IGxpbmtTcnYuZ2V0UGFuZWxMaW5rQW5jaG9ySW5mbyhwYW5lbC5saW5rc1swXSwgZGF0YS5zY29wZWRWYXJzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpbmtJbmZvID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBob29rdXBEcmlsbGRvd25MaW5rVG9vbHRpcCgpIHtcbiAgICAgIC8vIGRyaWxsZG93biBsaW5rIHRvb2x0aXBcblxuICAgICAgaWYgKGN0cmwucGFuZWwuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdmFyIGRyaWxsZG93blRvb2x0aXAgPSAkKCc8ZGl2IGlkPVwidG9vbHRpcFwiIGNsYXNzPVwiXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOndoaXRlO21hcmdpbjphdXRvO2NvbG9yOmJsYWNrO3dpZHRoOjIwMHB4O2JveC1zaGFkb3c6IDAgM3B4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XCI+PGg2IHN0eWxlPVwiY29sb3I6YmxhY2s7XCI+JyBcbiAgICAgICsgY3RybC5wYW5lbC50aXRsZSArICc8L2g2PicgKyBjdHJsLnBhbmVsLmRlc2NyaXB0aW9uICsgJzwvZGl2PlwiJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZHJpbGxkb3duVG9vbHRpcCA9ICQoJzxkaXYgaWQ9XCJ0b29sdGlwXCIgY2xhc3M9XCJcIiBzdHlsZT1cImJhY2tncm91bmQ6d2hpdGU7bWFyZ2luOmF1dG87Y29sb3I6YmxhY2s7d2lkdGg6MjAwcHg7Ym94LXNoYWRvdzogMCAzcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcIj48aDYgc3R5bGU9XCJjb2xvcjpibGFjaztcIj4nIFxuICAgICAgKyBjdHJsLnBhbmVsLnRpdGxlICsgJzwvaDY+Tm8gRGVzY3JpcHRpb248L2Rpdj5cIicpO1xuICAgICAgfVxuXG4gICAgICBlbGVtLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGRyaWxsZG93blRvb2x0aXAuZGV0YWNoKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGVsZW0uY2xpY2soZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIGlmICghbGlua0luZm8pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWdub3JlIHRpdGxlIGNsaWNrcyBpbiB0aXRsZVxuICAgICAgICBpZiAoJChldnQpLnBhcmVudHMoJy5wYW5lbC1oZWFkZXInKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpbmtJbmZvLnRhcmdldCA9PT0gJ19ibGFuaycpIHtcbiAgICAgICAgICB3aW5kb3cub3BlbihsaW5rSW5mby5ocmVmLCAnX2JsYW5rJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpbmtJbmZvLmhyZWYuaW5kZXhPZignaHR0cCcpID09PSAwKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaW5rSW5mby5ocmVmO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGxvY2F0aW9uLnVybChsaW5rSW5mby5ocmVmKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyaWxsZG93blRvb2x0aXAuZGV0YWNoKCk7XG4gICAgICB9KTtcblxuICAgICAgZWxlbS5tb3VzZW1vdmUoZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoIWN0cmwucGFuZWwudG9vbHRpcC5zaG93KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9kcmlsbGRvd25Ub29sdGlwLnRleHQoZGF0YS52YWx1ZUZvcm1hdHRlZCk7XG4gICAgICAgIC8vZHJpbGxkb3duVG9vbHRpcC50ZXh0KCdjbGljayB0byBnbyB0bzogJyArIGxpbmtJbmZvLnRpdGxlKTtcbiAgICAgICAgLy9kcmlsbGRvd25Ub29sdGlwLnRleHQoY3RybC5wYW5lbC5kZXNjcmlwdGlvbik7XG4gICAgICAgIGRyaWxsZG93blRvb2x0aXAucGxhY2VfdHQoZS5wYWdlWCwgZS5wYWdlWSAtIDUwKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGhvb2t1cERyaWxsZG93bkxpbmtUb29sdGlwKCk7XG5cbiAgICB0aGlzLmV2ZW50cy5vbigncmVuZGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICByZW5kZXIoKTtcbiAgICAgIGN0cmwucmVuZGVyaW5nQ29tcGxldGVkKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q29sb3JGb3JWYWx1ZSh0aHJlc2hvbGRzLCB2YWx1ZSkge1xuICBsZXQgY29sb3IgPSAnJztcbiAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGNvbG9yO1xuICB9XG4gIGZvciAobGV0IGkgPSB0aHJlc2hvbGRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGV0IGFUaHJlc2hvbGQgPSB0aHJlc2hvbGRzW2ldO1xuICAgIGNvbG9yID0gYVRocmVzaG9sZC5jb2xvcjtcbiAgICAgIGlmICh2YWx1ZSA+PSBhVGhyZXNob2xkLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiBhVGhyZXNob2xkLmNvbG9yO1xuICAgICAgfVxuICB9XG4gIHJldHVybiBjb2xvcjtcbn1cblxuZXhwb3J0IHtTaW5nbGVTdGF0TWF0aEN0cmwsIFNpbmdsZVN0YXRNYXRoQ3RybCBhcyBQYW5lbEN0cmwsIGdldENvbG9yRm9yVmFsdWV9XG4vLyBleHBvcnQgeyBTaW5nbGVTdGF0Q3RybCwgU2luZ2xlU3RhdEN0cmwgYXMgUGFuZWxDdHJsLCBnZXRDb2xvckZvclZhbHVlIH07Il19