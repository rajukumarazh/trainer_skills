import { intersection } from "lodash";

export function ScormApi(window, storage, prefix, callback) {

    prefix = typeof prefix !== 'undefined' ? prefix : '';
    callback = typeof callback !== 'undefined' ? callback : console.log;

    window.API = {};
    //var simplifiedObject = window.API.toJSON();

    //console.log("simplifiedObject",simplifiedObject)


    window.scormStatus = {
        lesson_status: '',      
        student_id : 254,
        student_name : "Amit Mahto",
        score_raw: 0,
        success_status :'',
        score_max: 100,
        score_min: 10,
        session_time: 0,
        mastery_score:0,
        detailed_answers: {},
        lesson_location: '',
        intersection:''
    };


    window.API.LMSInitialize = function () {
        console.log('LMSInitialize');
    }
    window.API.LMSTerminate = function () {
        console.log('LMSTerminate');
    }

    window.API.LMSGetValue = function (varname) {
        varname = prefix + varname;
        var ret = storage.getItem(varname);
        if (ret == null && (varname.indexOf('_count', this.length - '_count'.length) !== -1)) {
            ret = 0;
            storage.setItem(varname, ret);
        }
        console.log('LMSGetValue', varname, '=', ret);
        return ret;
    }



    window.API.LMSSetValue = function (varname, varvalue) {
        console.log(varname, varvalue)
        varname = prefix + varname;

        var m = varname.match(/([0-9]+)\.cmi\.interactions\.([0-9]+)\.id/);
        if (m != null) {
            storage.setItem('{{scorm.id}}.cmi.interactions._count', parseInt(m[2]) + 1);
            storage.setItem('cmi.core.lesson_location');
        }

        m = varname.match(/([0-9]+)\.cmi\.interactions\.([0-9]+)\.result/);
        if (m != null) {
            var key = storage.getItem(prefix + 'cmi.interactions.' + parseInt(m[2]) + '.id');
            window.scormStatus.detailed_answers[key] = varvalue;
        }
       
        console.log("varname",varname)

        if (varname == prefix + 'cmi.core.lesson_status')
            window.scormStatus.lesson_status = varvalue;
        if (varname == prefix + 'cmi.core.score.raw')
            window.scormStatus.score_raw = varvalue;
        if (varname == prefix + 'cmi.core.score.max')
            window.scormStatus.score_max = varvalue;
        if (varname == prefix + 'cmi.core.score.min')
            window.scormStatus.score_min = varvalue;
        if (varname == prefix + 'cmi.core.session_time')
            window.scormStatus.session_time = varvalue;
        if (varname == prefix + 'cmi.core.student_id')
        window.scormStatus.student_id = varvalue;
        if (varname == prefix + 'cmi.core.student_name')
            window.scormStatus.student_name = varvalue;
        if (varname == prefix + 'cmi.core.success_status')
        window.scormStatus.success_status = varvalue;
        if (varname == prefix + 'cmi.student_data.mastery_score')
        window.scormStatus.mastery_score = varvalue;
        if (varname == prefix + 'cmi.core.lesson_location')
        window.scormStatus.lesson_location = varvalue;
        if (varname == prefix + 'cmi.interactions._count')
        window.scormStatus.intersection = varvalue;


        

        storage.setItem(varname, varvalue);
        console.log('LMSSetValue', varname, '=', varvalue);
    }

    window.API.LMSCommit = function () {
        console.log('LMSCommit');
        //saving to API
       // console.log("window.scormStatus",window.API.toJSON())
        callback(window.scormStatus);
        return true;

    }

    window.API.LMSFinish = function () {
        console.log('LMSFinish');
    }

    window.API.LMSGetLastError = function () 
    {
        console.log('LMSGetLastError');
    }

    window.API.LMSGetErrorString = function () {
        console.log('LMSGetErrorString');
    }

    window.API.LMSGetDiagnostic = function () {
        console.log('LMSGetDiagnostic');
    }

    window.API.GetSessionAccumulatedTime = function () {
        console.log('GetSessionAccumulatedTime called')
    }

}