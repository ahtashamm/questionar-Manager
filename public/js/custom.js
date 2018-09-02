var Question = function () {

    var settings = {
        API_KEY: "AIzaSyBEbRxE3O1Lj1uWd0mjN1Rv4VgchPhN5ng",
        TYPE: $(".type"),
        mcqPanel: $(".mcqPanel"),
        textQuestionPanel: $(".textQuestionPanel"),
        addQuestion: $("#addQuestion"),
        question: $(".question"),
        deleteQuestion: $(".deleteQuestion"),
        questioncontent: $(".question-content"),
        addMCQ: $(".addMCQ"),
        mcqContent:$(".mcq-content")


    };


    var profileSetup = function (val) {
        console.log(val)
        $.ajax({
            url: val.url,
            type: 'POST',
            data: val.data,
            dataType: 'JSON',
            success: function (data) {
                console.log(data)
                if (data.status) {
                    redirectURL = document.location.origin + '/profile/' + data.userId
                    window.location.replace(redirectURL)
                }

            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });


    }
    var addQuestionText = function () {
        no=$('.question').find('.question-content').length+1;
        var Question='<div class="question-content"><div class="form-group"><div class="row"><div class="col-md-2">Type</div> <div class="col-md-2">' +
            '<select name="question_type" class="form-control type"><option value="text">text</option><option value="mcq">MCQ</option></select></div></div></div>' +
            ' <div class="form-group "><div class="row"><div class="col-md-2">Question</div> <div class="col-md-8">' +
            '<input placeholder="Enter Question title" name="title" type="text" class="form-control"></div> <a href="" class="deleteQuestion">Delete</a></div></div> ' +
            '<div class="textQuestionPanel"><div class="form-group"><div class="row"><div class="col-md-2">Answer</div> <div class="col-md-8">' +
            '<input placeholder="Enter Answer " name="answer" type="text" class="form-control answer"></div></div></div> <hr></div> ' +
            '<div class="mcqPanel" style="display: none;"><div class="mcq-content"><div class="form-group"><div class="row"><div class="col-md-2">Choice 1</div>' +
            ' <div class="col-md-6"><input placeholder="Enter Choice " name="choice" type="text" class="form-control mcq"></div> <div class="col-md-4"><label>' +
            '<input value="1" name=correct'+no+' type="radio" > Correct</label> <a href="" class="deleteMCQ">Delete</a></div></div></div></div> ' +
            '<a class="addMCQ">Add MCQ</a></div></div>';

        settings.question.append(Question)
    }
    var addMCQText = function (elem) {
        no=elem.parent().find('.mcq').length+1;
        Qno=$('.question').find('.question-content').length;
        var Question = '<div class="form-group mcqListing">' +
                    '<div class="row">' +
                    '<div class="col-md-2">Choice '+no+'</div>' +
                    ' <div class="col-md-6"><input placeholder="Enter Choice " name="choice" type="text" class="form-control mcq"></div> ' +
            '<div class="col-md-4"><label><input value='+no+'  name=correct'+Qno+' type="radio" > Correct</label> <a href="" class="deleteMCQ">Delete</a>' +
            '</div></div></div>';
        elem.prev().append(Question)
    }




    var validateForm = function () {
        var errorFlag = false;
        // remove the error class first
        $('.inputerror').removeClass('inputerror');
        if (!settings.FIRSTNAME.val()) {

            settings.FIRSTNAME.addClass('inputerror');
            errorFlag = true;
        }
        return errorFlag;
    }

    return {

        init: function () {
            this.bindUI();
        },
        bindUI: function () {


            var self = this;

            $(document).on('change', '.type', function (e) {
                $(this).parent().parent().parent().parent().find('.textQuestionPanel').toggle('slow');
                $(this).parent().parent().parent().parent().find('.mcqPanel').toggle('slow');

            })

            settings.addQuestion.on('click', function (e) {
                e.preventDefault()
                addQuestionText()
            })
            $(".question").on('click','.addMCQ', function (e) {
                e.preventDefault()
                var elem=$(this)
                addMCQText(elem)
            })


            $(".question").on('click', '.deleteQuestion', function (e) {
                e.preventDefault()
                $(this).closest('.question-content').remove();

            })

            $(".question").on('click', '.deleteMCQ', function (e) {
                e.preventDefault()
                $(this).closest('.form-group').remove();

            })
            $("#questionForm").on('submit',function (e) {
                e.preventDefault();

                var array=[];

                $('.question-content').each( function (index, elem) {
                    $(this).find('select.type').prop('value')
                    data={}
                    data.type=$(this).find('select.type').prop('value')
                    data.title=$(this).find('input[name=title]').val()
                    if (data.type=="text")
                    {
                        data.answer=$(this).find('input[name=answer]').val()
                    }
                    else  if (data.type=="mcq")
                    {

                        var questions=[]
                        $('.mcqListing').each( function (index, elem) {
                            mcq={}

                            var q=$(this).find('input[name=choice]').val()
                            questions.push(q)
                            mcq.questions=questions
                            if (typeof $(this).find('input[type=radio]:checked').val()==="undefined")
                            {
                                console.log('is undefined')
                            }
                            else
                            {
                                mcq.correct=$(this).find('input[type=radio]:checked').val();
                                console.log(mcq.correct)
                            }


                        })

                        data.choise_data=JSON.stringify(mcq)
                    }
                    array.push(data)
                    main={}
                    main.details=array

                })
                console.log(main)


            })


        },

    };
}
var question = new Question();
question.init()