﻿let $goc = null;
let Vue_obj = null;
let Component_Jquery = new Object({
    Enable: true,
    js: document.createElement('script'),
    js_name: 'Component_Jquery_js',
    Set_SourceSetting: function () {
        Component_Jquery.js.setAttribute('type', 'text/javascript');
        Component_Jquery.js.setAttribute('src', 'https://h5665773.github.io/jquery-3.5.1-dist/jquery-3.5.1.min.js');
    }
});
let Component_Bootstrap = new Object({
    Enable: true,
    js: document.createElement('script'),
    js_name: 'Component_Bootstrap_js',
    css: document.createElement('link'),
    css_name:'Component_Bootstrap_css',
    Set_SourceSetting: function () {
        Component_Bootstrap.css.setAttribute('rel', 'stylesheet');
        Component_Bootstrap.css.setAttribute('href', 'https://h5665773.github.io/bootstrap-4.5.0-dist/css/bootstrap.min.css');
        Component_Bootstrap.js.setAttribute('type', 'text/javascript');
        Component_Bootstrap.js.setAttribute('src', 'https://h5665773.github.io/bootstrap-4.5.0-dist/js/bootstrap.bundle.min.js');
    }
});
let Component_Datepicker = new Object({
    Enable: true,
    js: document.createElement('script'),
    js_name: 'Component_Datepicker_js',
    css: document.createElement('link'),
    css_name: 'Component_Datepicker_css',
    lang: document.createElement('script'),
    lang_name:'Component_Datepicker_lang',
    Set_SourceSetting: function () {
        Component_Datepicker.css.setAttribute('rel', 'stylesheet');
        Component_Datepicker.css.setAttribute('href', 'https://h5665773.github.io/bootstrap-datepicker-1.9.0-dist/css/bootstrap-datepicker.min.css');
        Component_Datepicker.js.setAttribute('type', 'text/javascript');
        Component_Datepicker.js.setAttribute('src', 'https://h5665773.github.io/bootstrap-datepicker-1.9.0-dist/js/bootstrap-datepicker.min.js');
        Component_Datepicker.lang.setAttribute('type', 'text/javascript');
        Component_Datepicker.lang.setAttribute('src', 'https://h5665773.github.io/bootstrap-datepicker-1.9.0-dist/locales/bootstrap-datepicker.zh-TW.min.js');
    }
});
let Component_Bootstrapselect = new Object({
    Enable: true,
    js: document.createElement('script'),
    js_name: 'Component_Bootstrapselect_js',
    css: document.createElement('link'),
    css_name: 'Component_Bootstrapselect_css',
    lang: document.createElement('script'),
    lang_name: 'Component_Bootstrapselect_lang',
    Set_SourceSetting: function () {
        Component_Bootstrapselect.css.setAttribute('rel', 'stylesheet');
        Component_Bootstrapselect.css.setAttribute('href', 'https://h5665773.github.io/bootstrap-select-1.13.14-dist/css/bootstrap-select.min.css');
        Component_Bootstrapselect.js.setAttribute('type', 'text/javascript');
        Component_Bootstrapselect.js.setAttribute('src', 'https://h5665773.github.io/bootstrap-select-1.13.14-dist/js/bootstrap-select.min.js');
        Component_Bootstrapselect.lang.setAttribute('type', 'text/javascript');
        Component_Bootstrapselect.lang.setAttribute('src', 'https://h5665773.github.io/bootstrap-select-1.13.14-dist/js/i18n/defaults-zh_TW.min.js');
    }
});
let Component_Vue = new Object({
    Enable: true,
    js: document.createElement('script'),
    js_name: 'Component_Vue_js',
    Set_SourceSetting: function () {
        Component_Vue.js.setAttribute('type', 'text/javascript');
        Component_Vue.js.setAttribute('src', 'https://h5665773.github.io/Vue-2.6.11-dist/vue.min.js');
    }
});
let Component_External = new Object({
    Enable: true,
    js: document.createElement('script'),
    js_name: 'Component_External_js',
    js_path:'Your_External_js_Path',
    Set_SourceSetting: function () {
        Component_External.js.setAttribute('type', 'text/javascript');
        Component_External.js.setAttribute('src', `${Component_External.js_path}.js?Update=${Get_Today('yyyymmdd')}`);
    }
});
let Setting = new Object({
    Component_InstallationTarget_obj: document.getElementsByTagName('head')[0],
    Set_Component_SourceSetting: function () {
        Component_Jquery.Set_SourceSetting();
        Component_Bootstrap.Set_SourceSetting();
        Component_Datepicker.Set_SourceSetting();
        Component_Bootstrapselect.Set_SourceSetting();
        Component_Vue.Set_SourceSetting();
        Component_External.Set_SourceSetting();
    },
    Load_Component: function (Component_obj, Component_Enable, ComponentName_str) {
        return new Promise(function (resolve, reject) {
            if (Component_Enable) {
                Setting.Component_InstallationTarget_obj.appendChild(Component_obj);
            }
            else {
                resolve('continue');
            }

            Component_obj.onload = function () {
                console.log(`${ComponentName_str} Load Completed.`);
                resolve('success');
            };
        });
    },
    Set_Vue_obj: function () {
        document.getElementById('Vue').style.display = 'none';
        Vue_obj = new Vue({
            el: '#Vue',
            data: {
                ComList: {},
                CuList_Source: {},
                CuList: {},
                DaysByMonth: {},
                SentinelList: {},
                SentinelMember: {},
                MemberSchedule: {},
                MemberSecSchedule: {},
                SentineSeclList: {}
            },
            updated() {
                this.$nextTick(function () {
                    if (Setting.Selectpicker_obj != null) {
                        Setting.Selectpicker_obj.selectpicker('refresh');
                    }
                });
            },
            methods: {
                Cu_Filter: function (F_COM_ID_str) {
                    Vue_obj.CuList = Vue_obj.CuList_Source.filter(data => { return data.F_COM_ID.match(F_COM_ID_str); });
                },
                QuerySchedule: function (F_CU_ID_str, F_YM_str) {
                    Clear_Message();
                    if (!InputCheck()) {
                        return;
                    }
                    Set_LastDayOfMonth(F_YM_str);
                    Get_SentinelSchedule(F_CU_ID_str, F_YM_str, Vue_obj.DaysByMonth.length);
                },
                QuerySecSchedule: function (F_EMP_ID_str, F_YM_str) {
                    Get_SentinelSecSchedule(F_EMP_ID_str, F_YM_str, Vue_obj.DaysByMonth.length);
                }
            }
        });
        document.getElementById('Vue').style.display = '';
    },
    Ajax_url: 'Your_Ajax_url',
    InputCheck_class: '.Your_InputCheck_class',
    MessageSetPoint_obj: null,
    Selectpicker_obj: null,
    Datepicker_obj: null
});

////Before 'Load_Components()' to do.
////All components 'Enable' attributes default is 'true',if don't need just 'false' it.

////ex:
//Component_Jquery.Enable = true;
//Component_Bootstrap.Enable = true;
//Component_Datepicker.Enable = true;
//Component_Bootstrapselect.Enable = true;
//Component_Vue.Enable = true;
//Component_Vue.Component_External = true;
//Set_External_js_path('scriptself/PA1601');
//Load_Components();

////After 'Load_Components()' to do.

//Set_Ajax_url('XMLFORM/AjaxOrder.aspx');
//Set_InputCheck_class('.inputdata-1');
//Set_MessageSetPoint_obj($j('#AlertScript'));
//Set_Selectpicker_obj($j('.selectpicker'));
//Set_Datepicker_obj($j('.datepicker_yyyy-MM'));

function Set_InputCheck_class(Class_str) {
    Setting.InputCheck_class = Class_str;
}

function Set_Ajax_url(Url_str) {
    Setting.Ajax_url = Url_str;
}

function Set_Selectpicker_obj(Target_obj) {
    Setting.Selectpicker_obj = Target_obj;
}

function Set_Datepicker_obj(Target_obj) {
    Setting.Datepicker_obj = Target_obj;
}

function Set_MessageSetPoint_obj(Target_obj) {
    Setting.MessageSetPoint_obj = Target_obj;
}

function Set_External_js_path(Path_str) {
    Component_External.js_path = Path_str;
}

function Load_Components() {
    Setting.Set_Component_SourceSetting();
    Setting.Load_Component(Component_Jquery.js, Component_Jquery.Enable, Component_Jquery.js_name)
        .then(function (msg) {
            if (msg == 'success') {
                $goc = jQuery.noConflict(true);
            }
            return Setting.Load_Component(Component_Bootstrap.css, Component_Bootstrap.Enable, Component_Bootstrap.css_name);
        }).then(function (msg) {
            return Setting.Load_Component(Component_Bootstrap.js, Component_Bootstrap.Enable,Component_Bootstrap.js_name);
        }).then(function (msg) {
            return Setting.Load_Component(Component_Datepicker.css, Component_Datepicker.Enable,Component_Datepicker.css_name);
        }).then(function (msg) {                             
            return Setting.Load_Component(Component_Datepicker.js, Component_Datepicker.Enable, Component_Datepicker.js_name);
        }).then(function (msg) {                             
            return Setting.Load_Component(Component_Datepicker.lang, Component_Datepicker.Enable, Component_Datepicker.lang_name);
        }).then(function (msg) {
            return Setting.Load_Component(Component_Bootstrapselect.css, Component_Bootstrapselect.Enable, Component_Bootstrapselect.css_name);
        }).then(function (msg) {
            return Setting.Load_Component(Component_Bootstrapselect.js, Component_Bootstrapselect.Enable, Component_Bootstrapselect.js_name);
        }).then(function (msg) {
            return Setting.Load_Component(Component_Bootstrapselect.lang, Component_Bootstrapselect.Enable, Component_Bootstrapselect.lang_name);
        }).then(function (msg) {
            return Setting.Load_Component(Component_Vue.js, Component_Vue.Enable, Component_Vue.js_name);
        }).then(function (msg) {
            if (msg == 'success') {
                Setting.Set_Vue_obj();
            }
            return Setting.Load_Component(Component_External.js, Component_External.Enable, Component_External.js_name);
        });
}

function Alert_Message(Type_str, Massage_str) {
    //Type = primary / secondary / success / danger / warning / info / light / dark

    let AlertMessage_obj =
        `<div class='alert alert-${Type_str}' role='alert'>` +
        `${Massage_str}` +
        `<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>` +
        `</div>`;

    if (Setting.MessageSetPoint_obj != undefined) {
        Setting.MessageSetPoint_obj.html(AlertMessage_obj);
    }
    else {
        alert(Massage_str);
    }
}

function Clear_Message() {
    Setting.MessageSetPoint_obj.html('');
}

function PadLeft(Target_str, Padding_str, TotalWidth_int) {
    if (Target_str.length < TotalWidth_int) {
        Target_str = Padding_str + Target_str;
    }

    return Target_str;
}

function Get_Today(Type_str) {
    //Tpye = yyyymmdd
    let Date_obj = new Date();
    let Today_str = '';

    if (Type_str == 'yyyymmdd') {
        Today_str = Date_obj.getFullYear().toString() + PadLeft((Date_obj.getMonth() + 1).toString(), '0', 2) + PadLeft(Date_obj.getDate().toString(), '0', 2);
    }

    return Today_str;
}

function Set_Datepicker(Type_str) {
    //Type = yyyy-mm
    if (Setting.Datepicker_obj != null) {
        if (Type_str == 'yyyy-mm') {
            Setting.Datepicker_obj.datepicker({
                format: Type_str,
                startView: 1,
                minViewMode: 1,
                clearBtn: true,
                language: "zh-TW",
                orientation: "bottom left",
                autoclose: true,
                todayHighlight: true
            });
        }
    }
}

function Set_ComData() {
    $goc.ajax({
        type: 'POST',
        url: Setting.Ajax_url,
        data: {
            Order: 'Get_ComData'
        },
        success: function (data) {
            let JsonData = JSON.parse(data);
            Vue_obj.ComList = JsonData;
        }
    });
}

function Set_CuData(F_COM_ID_str) {
    $goc.ajax({
        type: 'POST',
        url: Setting.Ajax_url,
        data: {
            Order: 'Get_CuData',
            F_COM_ID: F_COM_ID_str
        },
        success: function (data) {
            let JsonData = JSON.parse(data);
            Vue_obj.CuList_Source = JsonData;
            Vue_obj.CuList = Vue_obj.CuList_Source;
        }
    });
}

function InputCheck() {
    let InputData_objs = $goc(`select${Setting.InputCheck_class},input${Setting.InputCheck_class}[type!="search"]`);

    if (InputData_objs.length > 0) {
        for (let i = 0; i < InputData_objs.length; i++) {
            let InputData_str = InputData_objs[i].value;
            if (InputData_str == '') {
                Alert_Message('warning', '請輸入查詢條件！');
                return false;
            }
        }
    }
    return true;
}

function Set_LastDayOfMonth(Date_yyyymm_str) {
    let LastDayOfMonth_date = new Date(Date_yyyymm_str);
    let LastDayOfMonth_int = 0;
    let DayList = ['日', '一', '二', '三', '四', '五', '六'];
    let DaysByMonth_str = "[";

    LastDayOfMonth_date.setMonth(LastDayOfMonth_date.getMonth() + 1);
    LastDayOfMonth_date.setDate(1);
    LastDayOfMonth_date.setDate(LastDayOfMonth_date.getDate() - 1);
    LastDayOfMonth_int = parseInt(LastDayOfMonth_date.getDate());
    LastDayOfMonth_date.setDate(1);

    for (let i = 0; i < LastDayOfMonth_int; i++) {
        let Day = DayList[LastDayOfMonth_date.getDay()];
        let idx = (i + 1);
        if (idx.toString().length == 1) {
            idx = '0' + idx;
        }

        DaysByMonth_str += `{"DayNo":"${idx}","Day":"${Day}"}`;

        if (i != LastDayOfMonth_int - 1) {
            DaysByMonth_str += ",";
        }

        LastDayOfMonth_date.setDate(LastDayOfMonth_date.getDate() + 1);
    }
    DaysByMonth_str += "]"

    Vue_obj.DaysByMonth = JSON.parse(DaysByMonth_str);
}

function Get_SentinelSchedule(F_CU_ID_str, F_YM_str, LastDayofMonth_str) {
    $goc.ajax({
        type: 'POST',
        url: Setting.Ajax_url,
        data: {
            Order: 'Get_SentinelSchedule',
            F_CU_ID: F_CU_ID_str,
            F_YM: F_YM_str,
            LastDayofMonth: LastDayofMonth_str
        },
        success: function (data) {
            let JsonData = JSON.parse(data);

            Vue_obj.SentinelList = JsonData.SentinelList;
            Vue_obj.SentinelMember = JsonData.SentinelMember;
            Vue_obj.MemberSchedule = JsonData.MemberSchedule;
        }
    });
}

function Get_SentinelSecSchedule(F_EMP_ID_str, F_YM_str, LastDayofMonth_str) {
    $goc.ajax({
        type: 'POST',
        url: Setting.Ajax_url,
        data: {
            Order: 'Get_SentinelSecSchedule',
            F_EMP_ID: F_EMP_ID_str,
            F_YM: F_YM_str,
            LastDayofMonth: LastDayofMonth_str
        },
        success: function (data) {
            let JsonData = JSON.parse(data);

            Vue_obj.MemberSecSchedule = JsonData.MemberSecSchedule;
            Vue_obj.SentineSeclList = JsonData.SentineSeclList;
        }
    });
}