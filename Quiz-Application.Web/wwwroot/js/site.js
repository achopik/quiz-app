// // Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// // for details on configuring this project to bundle and minify static web assets.
// // Write your JavaScript code.
//
// $(document).ready(function () {
//    
//     var ExmID = 0;
//     var Score = null;
//     var Status = null;
//     var QuestionID = 0;
//     var AnswerID = 0;
//     var Duration = 0;
//     var index = 0;
//     var qIndex = 0;
//     var objData = [];
//     var result = [];
//     var checkTime = [];
//     var objReport = null;
//
//     var constraints = { audio: true, video: { width: { min: 640, ideal: 640, max: 640 }, height: { min: 480, ideal: 480, max: 480 }, framerate: 60 } };
//     var recBtn = document.querySelector('button#btnStart');
//     var stopBtn = document.querySelector('button#btnSubmit');
//     var liveVideoElement = document.querySelector('#gum');   
//
//     $('#ddlExam').prop('disabled', false);
//     $('#btnStart').prop('disabled', false);
//     $('#btnSubmit').prop('disabled', false);
//     $('#btnSave').prop('disabled', true);
//     $('#eqMain button.w3-left').prop('disabled', true);
//     $('#eqMain button.w3-right').prop('disabled', true);
//     $("#eqReport").children().prop('disabled', true);
//     $('#eqReport a').removeAttr("href");
//     $('#eqReport i').addClass("w3-opacity-max");
//     $("#eqScore").children().prop('disabled', true);    
//
//     var mediaRecorder;
//     var chunks = [];
//     var count = 0;
//     var localStream = null;
//     var soundMeter = null;
//     var containerType = "video/webm"; //defaults to webm but we switch to mp4 on Safari 14.0.2+
//
//     $.ajax({
//         type: "GET",
//         url: "/api/Exams",
//         data: "{}",
//         success: function (data) {
//            var string = '<option value="-1">--- Please Select ---</option>';
//            for (var i = 0; i < data.length; i++) { string += '<option value="' + data[i].examID + '">' + data[i].name + '</option>'; }
//             $("#ddlExam").html(string);
//         }
//     });
//
//     //Start the Exam
//     $('#btnStart').click(function () {
//         if ($("#ddlExam").val() > 0) {
//            $('#ddlExam').prop('disabled', true);
//            $('#btnStart').prop('disabled', true);
//            $('#btnSave').prop('disabled', false);
//            ExmID = $("#ddlExam").val();
//            $.get('/api/Exam/', { ExamID: ExmID },
//                function (data) {
//                    Duration = data.duration;
//                    PopulateQuestions(ExmID);                   
//             });
//         }
//         else           
//             $.alert({
//                 icon: 'fa fa-warning',
//                 type: 'orange',
//                 title: 'Select Skill',
//                 content: 'Please select your skill !',
//                 boxWidth: '40%',
//                 useBootstrap: false,
//                 closeIcon: true,
//                 closeIconClass: 'fa fa-close'
//             });
//     });
//
//     $('#btnPrev').click(function () {
//         QuestionID = 0;
//         AnswerID = 0;
//         //console.log(index);
//         index = (index - 1) % qIndex;
//         var count = index + 1;
//         //console.log(objData.questions[index]);
//         if (index <= qIndex - 1) {
//             $('div#eqMain p').empty();
//             var Ostring = "<div style='padding: 5px;' id='eqOption'>";
//             $('#eqCount').html("(" + count + " of " + qIndex + ")");
//             $('div#eqMain h3').html(objData.exam + " Quiz");
//             $('div#eqMain h4').html("Question " + count + " : " + objData.questions[index].questionText);
//             QuestionID = objData.questions[index].questionID;
//             AnswerID = objData.questions[index].answer.optionID;
//             let obj = result.find(o => o.QuestionID === QuestionID);                         
//             //console.log(obj.SelectedOption);
//             for (var i in objData.questions[index].options) {
//                 if (!$.isEmptyObject(obj)) {
//                     if (obj.SelectedOption == objData.questions[index].options[i].optionID) {
//                         Ostring = Ostring + "<input class='w3-radio' type='radio' name='option' value='" + objData.questions[index].options[i].optionID + "' checked><label> " + objData.questions[index].options[i].option + "</label><br/>";
//                     }
//                     else {
//                         Ostring = Ostring + "<input class='w3-radio' type='radio' name='option' value='" + objData.questions[index].options[i].optionID + "'><label> " + objData.questions[index].options[i].option + "</label><br/>";
//                     }
//                 }
//                 else {
//                     Ostring = Ostring + "<input class='w3-radio' type='radio' name='option' value='" + objData.questions[index].options[i].optionID + "'><label> " + objData.questions[index].options[i].option + "</label><br/>";
//                 }
//             }
//             Ostring = Ostring + "</div>";
//             //console.log(Ostring);
//             $('div#eqMain p').append(Ostring);
//             $('#eqMain button.w3-right').prop('disabled', false);
//             if (index == 0) {
//                 $('#eqMain button.w3-left').prop('disabled', true);
//             }
//         }
//     });
//
//     $('#btnNext').click(function () {
//         QuestionID = 0;
//         AnswerID = 0;
//         //console.log(index);
//         index = (index + 1) % qIndex;
//         var count = index + 1;
//         if (index <= qIndex - 1) {
//             //console.log(objData.questions[index]);
//             $('div#eqMain p').empty();
//             var Ostring = "<div style='padding: 5px;' id='eqOption'>";
//             $('#eqCount').html("(" + count + " of " + qIndex + ")");
//             $('div#eqMain h3').html(objData.exam + " Quiz");
//             $('div#eqMain h4').html("Question " + count + " : " + objData.questions[index].questionText);
//             QuestionID = objData.questions[index].questionID;
//             AnswerID = objData.questions[index].answer.optionID;
//             let obj = result.find(o => o.QuestionID === QuestionID);
//             //console.log(obj);
//             for (var i in objData.questions[index].options) {
//                 //console.log(i, data.questions[0].options[i]);   
//                 if (!$.isEmptyObject(obj)) {
//                     if (obj.SelectedOption == objData.questions[index].options[i].optionID) {
//                         Ostring = Ostring + "<input class='w3-radio' type='radio' name='option' value='" + objData.questions[index].options[i].optionID + "' checked><label> " + objData.questions[index].options[i].option + "</label><br/>";
//                     }
//                     else {
//                         Ostring = Ostring + "<input class='w3-radio' type='radio' name='option' value='" + objData.questions[index].options[i].optionID + "'><label> " + objData.questions[index].options[i].option + "</label><br/>";
//                     }
//                 }
//                 else {
//                     Ostring = Ostring + "<input class='w3-radio' type='radio' name='option' value='" + objData.questions[index].options[i].optionID + "'><label> " + objData.questions[index].options[i].option + "</label><br/>";
//                 }
//             }
//             Ostring = Ostring + "</div>";
//             //console.log(Ostring);
//             $('div#eqMain p').append(Ostring);
//             $('#eqMain button.w3-left').prop('disabled', false);
//             if (index == qIndex - 1) {
//                 $('#eqMain button.w3-right').prop('disabled', true);
//             }
//         }
//     });
//
//     $('#btnSave').click(function () {       
//         var ans = {
//             CandidateID: $('#eqCandidateID').text(),
//             ExamID: ExmID,
//             QuestionID: QuestionID,
//             AnswerID: AnswerID,
//             SelectedOption: $('input[name="option"]:checked').val()           
//         };
//         if (result.some(item => item.QuestionID === QuestionID)) {
//             console.log('EXIST');
//             UpdateItem(QuestionID);
//         }
//         else {
//             result.push(ans);
//         }       
//         //console.log(result);       
//         ans = [];
//     });
//
//     $('#btnSubmit').click(function () {              
//         $.confirm({
//             icon: 'fa fa-warning',
//             title: 'Submit Quiz',
//             content: 'Are you sure you want to submit the quiz ?',
//             type: 'orange',
//             closeIcon: true,
//             closeIconClass: 'fa fa-close',
//             boxWidth: '40%',
//             useBootstrap: false,
//             buttons: {
//                 Submit: {
//                     text: 'Submit',
//                     btnClass: 'btn-red',
//                     action: function () {
//                         $.post('/api/Score/', { objRequest: result },
//                          function (data) {
//                              if (data > 0) {
//                                  stop(checkTime);
//                                  StopRecord();
//                                  $('#btnSubmit').prop('disabled', true);
//                                  $("#eqReport").children().prop('disabled', false);
//                                  $("#eqReport a").attr("href", "/Score/Result");
//                                  $('#eqReport i').removeClass("w3-opacity-max");
//                                  $.alert({
//                                      type: 'green',
//                                      title: 'Success !',
//                                      content: 'Please check the score.',
//                                      boxWidth: '40%',
//                                      useBootstrap: false,
//                                      closeIcon: true,
//                                      closeIconClass: 'fa fa-close'
//                                  });
//                              }
//                              else {
//                                  $('#btnSubmit').prop('disabled', false);
//                                  $("#eqReport").children().prop('disabled', true);
//                                  $('#eqReport a').removeAttr("href");
//                                  $('#eqReport i').addClass("w3-opacity-max");
//                                  $.alert({
//                                      type: 'red',
//                                      title: 'Error !',
//                                      content: 'Please try again.',
//                                      boxWidth: '40%',
//                                      useBootstrap: false,
//                                      closeIcon: true,
//                                      closeIconClass: 'fa fa-close'
//                                  });
//                              }
//                          });
//                     }
//                 },
//                 Cancel: function () {
//                     $(this).remove();
//                 }
//             }
//         });
//     });
//
//     $('.btnScore').click(function () {
//         var request = {
//             ExamID: $(this).closest("tr").find('td:eq(2)').text(),
//             CandidateID: $('#hdnCandidateID').val(),            
//             SessionID: $(this).closest("tr").find('td:eq(1)').text()            
//         };
//         Score = $(this).closest("tr").find('td:eq(4)').text();
//         Status = $(this).closest("tr").find('td:eq(6)').text();
//         // $.post('/api/Report/', { argRpt: request },
//         //     function (data) {
//         //         objReport = data;
//         //         $('div#eqScore h3').html(data[0].exam + ' Test');
//         //         $('div#eqScore .w3-container p:eq(0)').html('<strong>Candidate ID:</strong> ' + data[0].candidateID);
//         //         $('div#eqScore .w3-container h5').html(data[0].message);
//         //         $('div#eqScore .w3-container span').html('<strong>Date:</strong> ' + data[0].date);
//         //         if (Status == "1") {
//         //             $("#eqScore").children().prop('disabled', false);
//         //         }
//         //         else {
//         //             Score = null;
//         //             objReport = null;
//         //             $("#eqScore").children().prop('disabled', true);
//         //         }
//         //     });
//     });
//
//     // $('#btnReport').click(function () {
//     //     //console.log(objReport);
//     //     var scoreFormat = {
//     //         ExamID: objReport[0].examID,
//     //         CandidateID: $('#hdnCandidateID').val(),
//     //         SessionID: objReport[0].sessionID,
//     //         Exam: objReport[0].exam,
//     //         Date: objReport[0].date,
//     //         Score: Score
//     //     };
//     //     //console.log(scoreFormat);
//     //     $.post('/api/CreatePDF/', { argPDFRpt:scoreFormat},
//     //        function (data) {
//     //             //console.log(data);
//     //             if (data.isSuccess = true) { window.open(data.path, '_blank'); }
//     //        });       
//     // });
//
//     // $('#chooseFile').change(function () {
//     //   var file = $('#chooseFile')[0].files[0].name;
//     //   $('#noFile').text(file);
//     // });
//    
//     function UpdateItem(QuestionID) {
//         for (var i in result) {
//             if (result[i].QuestionID == QuestionID) {               
//                 result[i].CandidateID= $('#eqCandidateID').text();
//                 result[i].ExamID= ExmID;
//                 result[i].QuestionID= QuestionID;
//                 result[i].AnswerID= AnswerID;
//                 result[i].SelectedOption= $('input[name="option"]:checked').val();                
//                 break;
//             }
//         }
//     }
//
//     function PopulateQuestions(ExmID) {
//         $.get('/api/Questions', { ExamID: ExmID },
//             function (data) {
//                 QuestionID = 0;
//                 AnswerID = 0;               
//                 objData = data;
//                 //console.log(objData);
//                 var Ostring = "<div style='padding: 5px;' id='eqOption'>";
//                 qIndex = data.questions.length;
//                 $('#eqCount').html("(1" + " of " + qIndex + ")");
//                 $('div#eqMain h3').html(data.exam + " Quiz");
//                 $('div#eqMain h4').html("Question 1 : " + data.questions[0].questionText);
//                 QuestionID = data.questions[0].questionID;
//                 AnswerID = data.questions[0].answer.optionID;
//                 for (var i in data.questions[0].options) {
//                     //console.log(i, data.questions[0].options[i]);
//                     Ostring = Ostring + "<input class='w3-radio' type='radio' name='option' value='" + data.questions[0].options[i].optionID + "'><label> " + data.questions[0].options[i].option + "</label><br/>";
//                 }
//                 Ostring = Ostring + "</div>";
//                 //console.log(Ostring);
//                 $('div#eqMain p').append(Ostring);
//                 $('#eqMain button.w3-right').prop('disabled', false);
//             });
//     }
//
//     function StartTimer(Duration, checkTime) {
//         var deadline = new Date();
//         deadline.setHours(deadline.getHours() + Duration);
//         if (checkTime.length== 0) {
//             var x = setInterval(function () {
//                 var now = new Date().getTime();
//                 var t = deadline.getTime() - now;
//                 var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//                 var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
//                 var seconds = Math.floor((t % (1000 * 60)) / 1000);
//                 document.getElementById("timer").innerHTML = "Time : " + hours + ":" + minutes + ":" + seconds;
//                 if (t < 0) {
//                     clearInterval(x);
//                     document.getElementById("timer").innerHTML = "Time : 00:00:00";
//                 }
//             }, 1000);
//             checkTime.push(x);            
//         }
//     }
//
//     function stop(checkTime) {
//         clearInterval(checkTime[0]);
//         checkTime = [];       
//     }
//
//     //Recording
//     function StartRecord() {
//         if (localStream == null) {
//             alert('Could not get local stream from mic/camera');
//         } else {            
//             chunks = [];
//             /* use the stream */
//             console.log('Start recording...');
//             if (typeof MediaRecorder.isTypeSupported == 'function') {
//                 /*
//                     MediaRecorder.isTypeSupported is a function announced in https://developers.google.com/web/updates/2016/01/mediarecorder and later introduced in the MediaRecorder API spec http://www.w3.org/TR/mediastream-recording/
//                 */
//                 if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
//                     var options = { mimeType: 'video/webm;codecs=vp9' };
//                 } else if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) {
//                     var options = { mimeType: 'video/webm;codecs=h264' };
//                 } else if (MediaRecorder.isTypeSupported('video/webm')) {
//                     var options = { mimeType: 'video/webm' };
//                 } else if (MediaRecorder.isTypeSupported('video/mp4')) {
//                     //Safari 14.0.2 has an EXPERIMENTAL version of MediaRecorder enabled by default
//                     containerType = "video/mp4";
//                     var options = { mimeType: 'video/mp4' };
//                 }
//                 console.log('Using ' + options.mimeType);
//                 mediaRecorder = new MediaRecorder(localStream, options);
//             } else {
//                 console.log('isTypeSupported is not supported, using default codecs for browser');
//                 mediaRecorder = new MediaRecorder(localStream);
//             }
//
//             mediaRecorder.ondataavailable = function (e) {
//                 console.log('mediaRecorder.ondataavailable, e.data.size=' + e.data.size);
//                 if (e.data && e.data.size > 0) {
//                     chunks.push(e.data);
//                 }
//             };
//
//             mediaRecorder.onerror = function (e) {
//                 console.log('mediaRecorder.onerror: ' + e);
//             };
//
//             mediaRecorder.onstart = function () {
//                 console.log('mediaRecorder.onstart, mediaRecorder.state = ' + mediaRecorder.state);
//
//                 localStream.getTracks().forEach(function (track) {
//                     if (track.kind == "audio") {
//                         console.log("onstart - Audio track.readyState=" + track.readyState + ", track.muted=" + track.muted);
//                     }
//                     if (track.kind == "video") {
//                         console.log("onstart - Video track.readyState=" + track.readyState + ", track.muted=" + track.muted);
//                     }
//                 });
//             };
//
//             mediaRecorder.onstop = function () {
//                 console.log('mediaRecorder.onstop, mediaRecorder.state = ' + mediaRecorder.state);
//
//                 //var recording = new Blob(chunks, {type: containerType});
//                 var recording = new Blob(chunks, { type: mediaRecorder.mimeType });
//                 PostBlob(recording);               
//             };
//
//             mediaRecorder.onpause = function () {
//                 console.log('mediaRecorder.onpause, mediaRecorder.state = ' + mediaRecorder.state);
//             }
//
//             mediaRecorder.onresume = function () {
//                 console.log('mediaRecorder.onresume, mediaRecorder.state = ' + mediaRecorder.state);
//             }
//
//             mediaRecorder.onwarning = function (e) {
//                 console.log('mediaRecorder.onwarning: ' + e);
//             };
//           
//             mediaRecorder.start(1000);
//
//             localStream.getTracks().forEach(function (track) {
//                 console.log(track.kind + ":" + JSON.stringify(track.getSettings()));
//                 console.log(track.getSettings());
//             })
//         }
//     }
//
//     function StopRecord() {
//         mediaRecorder.stop();
//         liveVideoElement.srcObject = null;
//     }
//
//     function PostBlob(blob) {
//         var formData = new FormData();
//         formData.append('video-blob', blob);
//         $.ajax({
//             type: 'POST',
//             url: "/Home/SaveRecoredFile",
//             data: formData,
//             cache: false,
//             contentType: false,
//             processData: false,
//             success: function (result) {
//                if (result) {
//                   console.log('Success');
//                }
//             },
//             error: function (result) {
//                 console.log(result);
//             }
//         });
//     }
//
//    
//
// });
//
// //Image Upload Preview  
// function ShowImagePreview(input) {
//    if (input.files && input.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             $('#imgCandidate').prop('src', e.target.result);
//         };
//         reader.readAsDataURL(input.files[0]);
//    }
// }
//
//
//
//
//
//
$(document).ready(function () {
    $("#questionAddButton").click(function () {
        var prevIdx = $(".question-card").last().attr("itemid");
        console.log(prevIdx);
        var nextIdx = prevIdx ? parseInt(prevIdx) + 1 : 0;
        $(".question-add-card").before(
            `
               <br/>
                <div class="w3-card w3-round w3-white w3-margin-bottom w3-margin-top question-card" itemid="${nextIdx}">
    <div class="w3-container w3-button w3-grey remove-question">
          <i class="fa fa-times"></i>
    </div>
    <div class="w3-row">
        <div class="w3-container question-name w3-margin"> 
            <input name="question.${nextIdx}.Text" id="question.${nextIdx}.Text" class="w3-input w3-border" type="text" value="">
        </div>
    </div>
    <hr>
    <div class="w3-row">
        <div class="w3-container">
            <h3>Варианты ответа</h3>
        </div>
    </div>
    <table class="w3-table w3-bordered">
        <tbody>
        <tr>
            <th>Ответ</th>
            <th>Правильный</th>
            <th>Удалить</th>
        </tr>
        </tbody>
    </table>
    <div class="w3-card w3-round w3-white w3-margin-bottom w3-margin-top">
        <button type="button" onclick="addAnswer('${nextIdx}')" class="w3-button w3-block w3-gray answerAddButton"><i class="fa fa-plus"></i> Добавить ответ</button>
    </div>
</div>
     `)
    });

    $("#questionForm").on("click", "div.remove-question", async function () {
        console.log("Removing question");
        const $questionCard = $(this).parents("div.question-card")
        $questionCard.prev("br").remove()
        $questionCard.remove()
        return false;
    });

    $("#questionForm").on("click", "div.remove-answer", function () {
        console.log("Removing answer");
        const $answerRow = $(this).parents("tr")
        $answerRow.remove()
        return false;
    });
    $("#questionForm").on("click", ".boolean-value", function () {
        const $elem = $(this);
        $elem.attr("checked", this.checked)
        $elem.val(Boolean($elem.attr("checked")) ? true : false)
    });

});

function addAnswer(questionIdx) {
    const $table = $(`.question-card[itemid=${questionIdx}] tbody`);
    const idx = $table.children(`tr`).last().attr('itemid');
    const nextIdx = idx ? parseInt(idx) + 1 : 0
    $table.append(`
        <tr itemid="${nextIdx}">       
            <td>
                <input name="question.${questionIdx}.answer.${nextIdx}.Text" id="question.${questionIdx}.answer.${nextIdx}.Text" class="w3-input w3-border valid"
                       type="text" value="" aria-invalid="false">
            </td>
            <td>
                <input name="question.${questionIdx}.answer.${nextIdx}.IsCorrect" id="question.${questionIdx}.answer.${nextIdx}.IsCorrect" class="w3-check boolean-value"
                       type="checkbox" data-val="true" data-val-required="The IsCorrect field is required."
                       value="false">
            </td>
            <td>
                <div class="w3-button w3-block w3-gray remove-answer"><i class="fa fa-times"></i></div>
            </td>
        </tr>
    `);
}

function serializeForm() {
    var elements = document.querySelectorAll('#questionForm input');
    var data = {};
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        var val = el.value;
        if (!val) val = "";
        var fullName = el.getAttribute("name");
        if (!fullName) continue;
        var fullNameParts = fullName.split('.');
        var prefix = '';
        var stack = data;
        for (var k = 0; k < fullNameParts.length - 1; k++) {
            prefix = fullNameParts[k];
            if (!stack[prefix]) {
                stack[prefix] = {};
            }
            stack = stack[prefix];
        }
        prefix = fullNameParts[fullNameParts.length - 1];
        if (stack[prefix]) {

            var newVal = stack[prefix] + ',' + val;
            stack[prefix] += newVal;
        } else {
            stack[prefix] = val;
        }
    }
    var questions = [];
    for (const questionPos in data.question) {
        const q = data.question[questionPos];
        q.answers = []
        for (const a in q.answer) {
            q.answers.push(q.answer[a]);
        }
        delete q.answer;
        questions.push(q);
    }
    data = {
        "questions": questions,
    }
    $.ajax(
        {
            url: `/api/Tests/${document.location.href.split("/").pop()}`,
            method: "PATCH",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function () {
                console.log("Success")
                document.location.reload();
            }
        }
    )
}
