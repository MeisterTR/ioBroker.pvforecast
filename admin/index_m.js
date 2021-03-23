// Shuttercontrol - Copyright (c) by simatec
// Please visit https://github.com/simatec/ioBroker.shuttercontrol for licence-agreement and further information

//Settings

// This will be called by the admin adapter when the settings page loads
function load(settings, onChange) {
    // select elements with id=key and class=value and insert value
    if (!settings) return;
    console.log('##on change');

    // select elements with id=key and class=value and insert value
    for (var key in settings) {
        if (!settings.hasOwnProperty(key)) continue;
        var $value = $('#' + key + '.value');
        if ($value.attr('type') === 'checkbox') {

            $value.prop('checked', settings[key]).on('change', function () {
                showHideSettings();
                onChange();
            });
        } else {
            $value.val(settings[key]).on('change', function () {
                console.log('on change');
                showHideSettings();
                onChange();
            }).on('keyup', function () {
                $(this).trigger('change');
            });
        }
    }

    //var events = [];
    events = settings.events || [];

    values2table('events', events, onChange, tableOnReady);

    showHideSettings();

    $('#responseOIDDialog').on('click', function () {
        var devices = table2values('events');
        var id = 0;
        for (var i = 0; i < devices.length; i++) {
            id = id + 1;
        }
        setTimeout(function () {
            // value
            $('#events .values-input[data-name="triggerState"][data-index="' + id + '"]').val('true').trigger('change');
            $('#events .values-input[data-name="typeUp"][data-index="' + id + '"]').val('sunrise').trigger('change');
            $('#events .values-input[data-name="typeUp"][data-index="' + id + '"]').select();
            $('#events .values-input[data-name="typeDown"][data-index="' + id + '"]').val('sunset').trigger('change');
            $('#events .values-input[data-name="typeDown"][data-index="' + id + '"]').select();
            $('#events .values-input[data-name="heightUp"][data-index="' + id + '"]').val('100').trigger('change');
            $('#events .values-input[data-name="heightDown"][data-index="' + id + '"]').val('0').trigger('change');
            $('#events .values-input[data-name="triggerDrive"][data-index="' + id + '"]').val('100').trigger('change');
            $('#events .values-input[data-name="triggerChange"][data-index="' + id + '"]').val('off').trigger('change');
            $('#events .values-input[data-name="elevation"][data-index="' + id + '"]').val('8').trigger('change');
            $('#events .values-input[data-name="enabled"][data-index="' + id + '"]').prop('checked', true);
            $('#events .values-input[data-name="type"][data-index="' + id + '"]').val('in- & outside temperature and direction').trigger('change');
            $('#events .values-input[data-name="type"][data-index="' + id + '"]').select();
            $('#events .values-input[data-name="heightDownSun"][data-index="' + id + '"]').val('30').trigger('change');
            $('#events .values-input[data-name="direction"][data-index="' + id + '"]').val('120').trigger('change');
            $('#events .values-input[data-name="directionRange"][data-index="' + id + '"]').val('50').trigger('change');
            $('#events .values-input[data-name="tempInside"][data-index="' + id + '"]').val('23').trigger('change');
            $('#events .values-input[data-name="tempOutside"][data-index="' + id + '"]').val('23').trigger('change');
            $('#events .values-input[data-name="valueLight"][data-index="' + id + '"]').val('15').trigger('change');
            $('#events .values-input[data-name="autoDrive"][data-index="' + id + '"]').val('off').trigger('change');
            $('#events .values-input[data-name="hysteresisOutside"][data-index="' + id + '"]').val('5').trigger('change');
            $('#events .values-input[data-name="hysteresisInside"][data-index="' + id + '"]').val('5').trigger('change');
            $('#events .values-input[data-name="hysteresisLight"][data-index="' + id + '"]').val('5').trigger('change');
            // bolean
            $('#events .values-input[data-name="LateDown"][data-index="' + id + '"]').val(true).trigger('change');
            $('#events .values-input[data-name="inSummerNotDown"][data-index="' + id + '"]').val(false).trigger('change');
            $('#events .values-input[data-name="KeepSunProtect"][data-index="' + id + '"]').val(true).trigger('change');
            $('#events .values-input[data-name="driveAfterClose"][data-index="' + id + '"]').val(true).trigger('change');
            $('#events .values-input[data-name="useXmasLevel"][data-index="' + id + '"]').val(true).trigger('change');
            $('#events .values-input[data-name="betweenPosition"][data-index="' + id + '"]').val(false).trigger('change');
            $('#events .values-input[data-name="XmasLevel"][data-index="' + id + '"]').val('0').trigger('change');
            $('#events .values-input[data-name="betweenPositionLevel"][data-index="' + id + '"]').val('50').trigger('change');
            $('#events .values-input[data-name="trigDelyUp"][data-index="' + id + '"]').val('0').trigger('change');
            $('#events .values-input[data-name="trigDelyDown"][data-index="' + id + '"]').val('0').trigger('change');
        }, 1000);

        initSelectId(function (sid) {
            sid.selectId('show', $('#events .values-input[data-name="name"][data-index="' + id + '"]').val(), function (newId) {
                if (newId) {
                    $('#events .values-input[data-name="name"][data-index="' + id + '"]').val(newId).trigger('change');
                    socket.emit('getObject', newId, function (err, obj) {
                        var name = getName(obj);
                        $('#events .values-input[data-name="shutterName"][data-index="' + id + '"]').val(name).trigger('change');
                    });
                }
            });
        });
    });

    $('#actualValueTempDialogPopUp').on('click', function () {
        initSelectId(function (sid) {
            sid.selectId('show', $('#actualValueTemp').val(), function (newId) {
                if (newId) {
                    $('#actualValueTemp').val(newId).trigger('change');
                }
            });
        });
    });

    $('#actualValueLightDialogPopUp').on('click', function () {
        initSelectId(function (sid) {
            sid.selectId('show', $('#actualValueLight').val(), function (newId) {
                if (newId) {
                    $('#actualValueLight').val(newId).trigger('change');
                }
            });
        });
    });

    $('#actualValueTempInsideDialogPopUp').on('click', function () {
        initSelectId(function (sid) {
            sid.selectId('show', $('#actualValueTempInside').val(), function (newId) {
                if (newId) {
                    $('#actualValueTempInside').val(newId).trigger('change');
                }
            });
        });
    });

    $('#triggerAutoSleepDialog').on('click', function () {
        initSelectId(function (sid) {
            sid.selectId('show', $('#triggerAutoSleep').val(), function (newId) {
                if (newId) {
                    $('#triggerAutoSleep').val(newId).trigger('change');
                }
            });
        });
    });

    $('#triggerAutoChildrenDialog').on('click', function () {
        initSelectId(function (sid) {
            sid.selectId('show', $('#triggerAutoChildren').val(), function (newId) {
                if (newId) {
                    $('#triggerAutoChildren').val(newId).trigger('change');
                }
            });
        });
    });

    $('#triggerAutoLivingDialog').on('click', function () {
        initSelectId(function (sid) {
            sid.selectId('show', $('#triggerAutoLiving').val(), function (newId) {
                if (newId) {
                    $('#triggerAutoLiving').val(newId).trigger('change');
                }
            });
        });
    });

    $('#triggerIDPopUp').on('click', function () {
        initSelectId(function (sid) {
            sid.selectId('show', $('#triggerID').val(), function (newId) {
                if (newId) {
                    $('#triggerID').val(newId).trigger('change');
                }
            });
        });
    });

    $('#HolidayDPPopUp').on('click', function () {
        initSelectId(function (sid) {
            sid.selectId('show', $('#HolidayDP').val(), function (newId) {
                if (newId) {
                    $('#HolidayDP').val(newId).trigger('change');
                }
            });
        });
    });

    onChange(false);
    // reinitialize all the Materialize labels on the page if you are dynamically adding inputs:

    $('.timepicker').timepicker({
        "twelveHour": false
    });

    if (M) M.updateTextFields();

    getAdapterInstances('feiertage', function (instances) {
        fillInstances('publicHolInstance', instances, settings['publicHolInstance']);
    });
    fillPosition();

    //++++++++++ TABS ++++++++++
    //Enhance Tabs with onShow-Function
    $('ul.tabs li a').on('click', function () { onTabShow($(this).attr('href')); });
    function onTabShow(tabId) {
        switch (tabId) {
            case "#tab-time":
                loadOptions();
                break;
            case "#tab-extra":
                loadOptions();
                break;
        }
    }
    //++++++++++ OPTIONS ++++++++++
    //Load Options
    function loadOptions() {
        $('.collapsible').collapsible();
    }
}

function fillPosition() {
    socket.emit('getObject', 'system.config', function (err, obj) {
        if ($('#longitude').val() === '') {
            $('#longitude').val(obj.common.longitude).trigger('change');
        }
        if ($('#latitude').val() === '') {
            $('#latitude').val(obj.common.latitude).trigger('change');
        }
    });
}

function fillInstances(id, arr, val) {
    var $sel = $('#' + id);
    $sel.html('<option value="">' + _('none') + '</option>');
    for (var i = 0; i < arr.length; i++) {
        var _id = arr[i]._id.replace('system.adapter.', '');
        $sel.append('<option value="' + _id + '"' + (_id === val ? ' selected' : '') + '>' + _id + '</option>');
    }
    $sel.select();
}

function tableOnReady() {
    $('#events .table-values-div .table-values .values-buttons[data-command="edit2"]').on('click', function () {
        let id = $(this).data('index');
        initSelectId(function (sid) {
            sid.selectId('show', $('#events .values-input[data-name="name"][data-index="' + id + '"]').val(), function (newId) {
                if (newId) {
                    $('#events .values-input[data-name="name"][data-index="' + id + '"]').val(newId).trigger('change');
                    socket.emit('getObject', newId, function (err, obj) {
                        var name = getName(obj);
                        $('#events .values-input[data-name="shutterName"][data-index="' + id + '"]').val(name).trigger('change');
                    });
                }
            });
        });
    });

    $('#events .table-values-div .table-values .values-buttons[data-command="edit"]').on('click', function () {
        let id = $(this).data('index');
        // value
        $('#dialogDeviceEditShutter').html($('#events .values-input[data-name="shutterName"][data-index="' + id + '"]').val());
        $('#heightUpShutter').val($('#events .values-input[data-name="heightUp"][data-index="' + id + '"]').val());
        $('#heightDownShutter').val($('#events .values-input[data-name="heightDown"][data-index="' + id + '"]').val());
        $('#triggerDriveShutter').val($('#events .values-input[data-name="triggerDrive"][data-index="' + id + '"]').val());
        $('#elevationShutter').val(parseFloat($('#events .values-input[data-name="elevation"][data-index="' + id + '"]').val()));
        $('#triggerChangeShutter').val($('#events .values-input[data-name="triggerChange"][data-index="' + id + '"]').val());
        $('#triggerChangeShutter').select();
        $('#triggerStateShutter').val($('#events .values-input[data-name="triggerState"][data-index="' + id + '"]').val());
        $('#triggerStateShutter').select();
        $('#typeDown').val($('#events .values-input[data-name="typeDown"][data-index="' + id + '"]').val());
        $('#typeDown').select();
        $('#typeUp').val($('#events .values-input[data-name="typeUp"][data-index="' + id + '"]').val());
        $('#typeUp').select();
        $('#type').val($('#events .values-input[data-name="type"][data-index="' + id + '"]').val());
        $('#type').select();
        $('#triggerID').val($('#events .values-input[data-name="triggerID"][data-index="' + id + '"]').val());
        $('#tempInside').val($('#events .values-input[data-name="tempInside"][data-index="' + id + '"]').val());
        $('#heightDownSun').val($('#events .values-input[data-name="heightDownSun"][data-index="' + id + '"]').val());
        $('#direction').val($('#events .values-input[data-name="direction"][data-index="' + id + '"]').val());
        $('#directionRange').val($('#events .values-input[data-name="directionRange"][data-index="' + id + '"]').val());
        $('#actualValueTempInside').val($('#events .values-input[data-name="tempSensor"][data-index="' + id + '"]').val());
        $('#actualValueTemp').val($('#events .values-input[data-name="outsideTempSensor"][data-index="' + id + '"]').val());
        $('#setpointValue').val($('#events .values-input[data-name="tempOutside"][data-index="' + id + '"]').val());
        $('#actualValueLight').val($('#events .values-input[data-name="lightSensor"][data-index="' + id + '"]').val());
        $('#setpointValueLight').val($('#events .values-input[data-name="valueLight"][data-index="' + id + '"]').val());
        $('#autoDriveShutter').val($('#events .values-input[data-name="autoDrive"][data-index="' + id + '"]').val());
        $('#autoDriveShutter').select();
        $('#hysteresisOutside').val($('#events .values-input[data-name="hysteresisOutside"][data-index="' + id + '"]').val());
        $('#hysteresisInside').val($('#events .values-input[data-name="hysteresisInside"][data-index="' + id + '"]').val());
        $('#hysteresisLight').val($('#events .values-input[data-name="hysteresisLight"][data-index="' + id + '"]').val());
        $('#XmasLevel').val($('#events .values-input[data-name="XmasLevel"][data-index="' + id + '"]').val());
        $('#betweenPositionLevel').val($('#events .values-input[data-name="betweenPositionLevel"][data-index="' + id + '"]').val());
        $('#trigDelyUp').val($('#events .values-input[data-name="trigDelyUp"][data-index="' + id + '"]').val());
        $('#trigDelyDown').val($('#events .values-input[data-name="trigDelyDown"][data-index="' + id + '"]').val());
        // bolean
        var varLateDown = $('#events .values-input[data-name="LateDown"][data-index="' + id + '"]').prop('checked');
        var varinSummerNotDown = $('#events .values-input[data-name="inSummerNotDown"][data-index="' + id + '"]').prop('checked');
        var varKeepSunProtect = $('#events .values-input[data-name="KeepSunProtect"][data-index="' + id + '"]').prop('checked');
        var vardriveAfterClose = $('#events .values-input[data-name="driveAfterClose"][data-index="' + id + '"]').prop('checked');
        var varuseXmasLevel = $('#events .values-input[data-name="useXmasLevel"][data-index="' + id + '"]').prop('checked');
        var varbetweenPosition = $('#events .values-input[data-name="betweenPosition"][data-index="' + id + '"]').prop('checked');

        if (varuseXmasLevel == true) {
            $('.col-XmasLevel').show();
        } else {
            $('.col-XmasLevel').hide();
        }
        if (varbetweenPosition == true) {
            $('.col-betweenPosition').show();
        } else {
            $('.col-betweenPosition').hide();
        }
        // bolean
        $('#LateDown').prop('checked', varLateDown);
        $('#inSummerNotDown').prop('checked', varinSummerNotDown);
        $('#KeepSunProtect').prop('checked', varKeepSunProtect);
        $('#driveAfterClose').prop('checked', vardriveAfterClose);
        $('#useXmasLevel').prop('checked', varuseXmasLevel);
        $('#betweenPosition').prop('checked', varbetweenPosition);

        setTimeout(function () {
            initDialogShutter(function (sid) {
                // val
                var newHeightUp = $('#heightUpShutter').val();
                var newHeightDown = $('#heightDownShutter').val();
                var newTriggerDrive = $('#triggerDriveShutter').val();
                var newElevation = $('#elevationShutter').val();
                var newTriggerState = $('#triggerStateShutter').val();
                var newTriggerChange = $('#triggerChangeShutter').val();
                var newTemInside = $('#tempInside').val();
                var newHeightDownSun = $('#heightDownSun').val();
                var newDirection = $('#direction').val();
                var newDirectionRange = $('#directionRange').val();
                var newTempSensor = $('#actualValueTempInside').val();
                var newOutsideTempSensor = $('#actualValueTemp').val();
                var newTempOutside = $('#setpointValue').val();
                var newLightSensor = $('#actualValueLight').val();
                var newValueLight = $('#setpointValueLight').val();
                var newTriggerID = $('#triggerID').val();
                var newTypeDown = $('#typeDown').val();
                var newTypeUp = $('#typeUp').val();
                var newType = $('#type').val();
                var hysteresisOutside = $('#hysteresisOutside').val();
                var hysteresisInside = $('#hysteresisInside').val();
                var hysteresisLight = $('#hysteresisLight').val();
                var autoDrive = $('#autoDriveShutter').val();
                var xmaslevel = $('#XmasLevel').val();
                var betweenPositionLevel = $('#betweenPositionLevel').val();
                var trigDelyUp = $('#trigDelyUp').val();
                var trigDelyDown = $('#trigDelyDown').val();
                // bolean
                var newLateDown = $('#LateDown').prop('checked');
                var newinSummerNotDown = $('#inSummerNotDown').prop('checked');
                var newKeepSunProtect = $('#KeepSunProtect').prop('checked');
                var newdriveAfterClose = $('#driveAfterClose').prop('checked');
                var newuseXmasLevel = $('#useXmasLevel').prop('checked');
                var newbetweenPosition = $('#betweenPosition').prop('checked');

                // value
                $('#events .values-input[data-name="tempInside"][data-index="' + id + '"]').val(newTemInside).trigger('change');
                $('#events .values-input[data-name="heightDownSun"][data-index="' + id + '"]').val(newHeightDownSun).trigger('change');
                $('#events .values-input[data-name="direction"][data-index="' + id + '"]').val(newDirection).trigger('change');
                $('#events .values-input[data-name="directionRange"][data-index="' + id + '"]').val(newDirectionRange).trigger('change');
                $('#events .values-input[data-name="tempSensor"][data-index="' + id + '"]').val(newTempSensor).trigger('change');
                $('#events .values-input[data-name="outsideTempSensor"][data-index="' + id + '"]').val(newOutsideTempSensor).trigger('change');
                $('#events .values-input[data-name="tempOutside"][data-index="' + id + '"]').val(newTempOutside).trigger('change');
                $('#events .values-input[data-name="lightSensor"][data-index="' + id + '"]').val(newLightSensor).trigger('change');
                $('#events .values-input[data-name="valueLight"][data-index="' + id + '"]').val(newValueLight).trigger('change');
                $('#events .values-input[data-name="triggerID"][data-index="' + id + '"]').val(newTriggerID).trigger('change');
                $('#events .values-input[data-name="heightUp"][data-index="' + id + '"]').val(newHeightUp).trigger('change');
                $('#events .values-input[data-name="heightDown"][data-index="' + id + '"]').val(newHeightDown).trigger('change');
                $('#events .values-input[data-name="triggerDrive"][data-index="' + id + '"]').val(newTriggerDrive).trigger('change');
                $('#events .values-input[data-name="elevation"][data-index="' + id + '"]').val(newElevation).trigger('change');
                $('#events .values-input[data-name="triggerState"][data-index="' + id + '"]').val(newTriggerState).trigger('change');
                $('#events .values-input[data-name="triggerChange"][data-index="' + id + '"]').val(newTriggerChange).trigger('change');
                $('#events .values-input[data-name="typeDown"][data-index="' + id + '"]').val(newTypeDown).trigger('change');
                $('#events .values-input[data-name="typeUp"][data-index="' + id + '"]').val(newTypeUp).trigger('change');
                $('#events .values-input[data-name="type"][data-index="' + id + '"]').val(newType).trigger('change');
                $('#events .values-input[data-name="autoDrive"][data-index="' + id + '"]').val(autoDrive).trigger('change');
                $('#events .values-input[data-name="hysteresisOutside"][data-index="' + id + '"]').val(hysteresisOutside).trigger('change');
                $('#events .values-input[data-name="hysteresisInside"][data-index="' + id + '"]').val(hysteresisInside).trigger('change');
                $('#events .values-input[data-name="hysteresisLight"][data-index="' + id + '"]').val(hysteresisLight).trigger('change');
                $('#events .values-input[data-name="XmasLevel"][data-index="' + id + '"]').val(xmaslevel).trigger('change');
                $('#events .values-input[data-name="betweenPositionLevel"][data-index="' + id + '"]').val(betweenPositionLevel).trigger('change');
                $('#events .values-input[data-name="trigDelyUp"][data-index="' + id + '"]').val(trigDelyUp).trigger('change');
                $('#events .values-input[data-name="trigDelyDown"][data-index="' + id + '"]').val(trigDelyDown).trigger('change');
                // bolean
                $('#events .values-input[data-name="LateDown"][data-index="' + id + '"]').prop('checked', newLateDown).trigger('change');
                $('#events .values-input[data-name="inSummerNotDown"][data-index="' + id + '"]').prop('checked', newinSummerNotDown).trigger('change');
                $('#events .values-input[data-name="KeepSunProtect"][data-index="' + id + '"]').prop('checked', newKeepSunProtect).trigger('change');
                $('#events .values-input[data-name="driveAfterClose"][data-index="' + id + '"]').prop('checked', newdriveAfterClose).trigger('change');
                $('#events .values-input[data-name="useXmasLevel"][data-index="' + id + '"]').prop('checked', newuseXmasLevel).trigger('change');
                $('#events .values-input[data-name="betweenPosition"][data-index="' + id + '"]').prop('checked', newbetweenPosition).trigger('change');
            });
        }, 20)
    });
}

// This will be called by the admin adapter when the user presses the save button
function save(callback) {
    // select elements with class=value and build settings object
    var obj = {};
    $('.value').each(function () {
        var $this = $(this);
        if ($this.attr('type') === 'checkbox') {
            obj[$this.attr('id')] = $this.prop('checked');
        } else {
            obj[$this.attr('id')] = $this.val();
        }
    });

    // Get edited table
    obj.events = table2values('events');


    callback(obj);
}

function showHideSettings() {

    if ($('#publicHolidays').prop('checked')) {
        $('.publicHol').show();
    } else {
        $('.publicHol').hide();
    }

    console.log('livingAutomatic' + $('#livingAutomatic')[0].value);

    if ($('#livingAutomatic')[0].value == "livingTime") {
        $('.col-W_shutterUpLivingMin').hide();
        $('.col-WE_shutterUpLivingMin').hide();
    } else {
        $('.col-W_shutterUpLivingMin').show();
        $('.col-WE_shutterUpLivingMin').show();
    }

    if ($('#sleepAutomatic')[0].value == "sleepTime") {
        $('.col-W_shutterUpSleepMin').hide();
        $('.col-WE_shutterUpSleepMin').hide();
    } else {
        $('.col-W_shutterUpSleepMin').show();
        $('.col-WE_shutterUpSleepMin').show();
    }

    if ($('#useXmasLevel').prop('checked')) {
        $('.col-XmasLevel').show();
    } else {
        $('.col-XmasLevel').hide();
    }

    if ($('#LateAllDown').prop('checked')) {
        $('.LateAllDownTime').show();
    } else {
        $('.LateAllDownTime').hide();
    }

    if ($('#betweenPosition').prop('checked')) {
        $('.col-betweenPosition').show();
    } else {
        $('.col-betweenPosition').hide();
    }
}

var selectId;
function initSelectId(callback) {
    if (selectId) {
        return callback(selectId);
    }
    socket.emit('getObjects', function (err, objs) {
        selectId = $('#dialog-select-member').selectId('init', {
            noMultiselect: true,
            objects: objs,
            imgPath: '../../lib/css/fancytree/',
            filter: { type: 'state' },
            name: 'scenes-select-state',
            texts: {
                select: _('Select'),
                cancel: _('Cancel'),
                all: _('All'),
                id: _('ID'),
                name: _('Name'),
                role: _('Role'),
                room: _('Room'),
                value: _('Value'),
                selectid: _('Select ID'),
                from: _('From'),
                lc: _('Last changed'),
                ts: _('Time stamp'),
                wait: _('Processing...'),
                ack: _('Acknowledged'),
                selectAll: _('Select all'),
                unselectAll: _('Deselect all'),
                invertSelection: _('Invert selection')
            },
            columns: ['image', 'name', 'role', 'room']
        });
        callback(selectId);
    });
}

function getName(obj) {
    if (obj && obj.common && obj.common.name) {
        var name = obj.common.name;
        if (typeof name === 'object') {
            name = name[systemLang] || name.en;
        }
        return name;
    } else if (obj && obj.name) {
        var name = obj.name;
        if (typeof name === 'object') {
            name = name[systemLang] || name.en;
        }
        return name;
    } else {
        var parts = obj.id.split('.');
        var last = parts.pop();
        return last[0].toUpperCase() + last.substring(1).toLowerCase();
    }
}

function initDialogShutter(callback) {
    var $editDialog = $('#dialog-shutter-edit');
    if (!$editDialog.data('inited')) {
        $editDialog.data('inited', true);
        $editDialog.modal({
            dismissible: false
        });

        $editDialog.find('.btn-set').on('click', function () {
            var $editDialog = $('#dialog-shutter-edit');
            var callback = $editDialog.data('callback');
            if (typeof callback === 'function') callback();
            $editDialog.data('callback', null);
        });
    }
    $editDialog.data('callback', callback);
    $editDialog.modal('open');
}