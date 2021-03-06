$.fn.calendar = function(parameters) {
    var $allModules = $(this), moduleSelector = $allModules.selector || "", time = new Date().getTime(), performance = [], query = arguments[0], methodInvoked = typeof query == "string", queryArguments = [].slice.call(arguments, 1), requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        setTimeout(callback, 0);
    }, returnedValue;
    $allModules.each(function() {
        var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.calendar.settings, parameters) : $.extend({}, $.fn.calendar.settings), namespace = settings.namespace, eventNamespace = "." + namespace, moduleNamespace = "module-" + namespace, $window = $(window), $module = $(this), element = this, instance = $module.data(moduleNamespace), module;
        module = {
            initialize: function() {
                module.debug("Initializing", $module);
                module.render();
            },
            lookup: function(dictionary, key) {
                var collection = {
                    days: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
                    months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                    eom: [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]
                };
                return collection[dictionary][key] || false;
            },
            render: function() {
                var cssClasses = {
                    main: "ui seven column calendar grid middle aligned internally celled",
                    head: {
                        row: "one column row",
                        column: "sixteen wide grey column"
                    },
                    body: {
                        column: {
                            disabled: "disabled"
                        }
                    }
                }, firstDay = function() {
                    var d = new Date(settings.date.getFullYear(), settings.date.getMonth(), 1);
                    return d.getDay();
                }(), elements = {
                    head: {
                        row: $("<div />").addClass(cssClasses.head.row),
                        column: $("<div />").addClass(cssClasses.head.column).text(module.lookup("months", settings.date.getMonth()))
                    },
                    body: {
                        row: $("<div />").addClass("row"),
                        column: $("<label />").addClass("column")
                    }
                };
                elements.head.column.appendTo(elements.head.row);
                elements.head.row.appendTo($module);
                for (var i = 0; i < module.lookup("eom", settings.date.getMonth()); i++) {
                    var row = $("<div />").addClass("row");
                    if (i === 0 && firstDay > 0) {
                        for (var j = 0; j < firstDay; j++) {
                            $("<div />").addClass("disabled column").appendTo(elements.body.row);
                        }
                    }                    
                    var x = settings.date.getFullYear() + "-" + (settings.date.getMonth() + 1) + "-" + (i + 1);
                    $("<input />").attr({
                        type: "checkbox",
                        "checklist-model": "calendar",
                        "checklist-value": "'"+x+"'",
                        id: x,
                        "ng-click": "save()",                        
                    }).appendTo(elements.body.row);
                    elements.body.column.clone().text(i + 1).attr("for", x).appendTo(elements.body.row);
                    // if((i + firstDay + 1) % 7 === 0 && i > 0) { estaba asi pero da problemas en octubre-2015
                    if ((i + firstDay + 1) % 7 === 0) {
                        elements.body.row.appendTo($module);
                        elements.body.row = $("<div />").addClass("row");
                    }
                    if (i + 1 === module.lookup("eom", settings.date.getMonth())) {
                        var rest = (49 - (firstDay + i + 1)) % 7;
                        for (var j = 0; j < rest; j++) {
                            $("<div />").addClass("disabled column yyy ").appendTo(elements.body.row);
                        }
                        elements.body.row.appendTo($module);
                    }
                }
                $module.addClass(cssClasses["main"]);
            },
            debug: function() {
                if (settings.debug) {
                    if (settings.performance) {
                        module.performance.log(arguments);
                    } else {
                        module.debug = Function.prototype.bind.call(console.info, console, settings.name + ":");
                        module.debug.apply(console, arguments);
                    }
                }
            }
        };
        module.initialize();
    });
};

$.fn.calendar.settings = {
    name: "Calendar",
    namespace: "calendar",
    debug: false,
    verbose: false,
    date: new Date()
};