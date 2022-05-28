var isTrue = isCandidateEmail = isCandidateName = false;

$(document).ready(function () {
    var headerHeight = $('.heading__wrapper').innerHeight();
    var formheaderHeight = $('.form__header').innerHeight();
    var totalNonScrollHeight = parseInt(headerHeight + formheaderHeight);

    var windowHeight = parseInt($(window).innerHeight() - totalNonScrollHeight - 70 );
    console.log(windowHeight);
    $('.rating__question__wrapper').css({'max-height': windowHeight});
    // debugger;
    $('.left__col').css({'max-height': windowHeight});
    $('#rating__email').on('input', function (e) {
        var thisValue = $(this).val();
        var resultEmail = thisValue.replace(/[^a-zA-Z0-9._@]/g, '');
        $(this).val(resultEmail);
        var thisValue = $(this).val();
        var eRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        if (thisValue.match(eRegex)) {
            isCandidateEmail = true;
            candidatesValidation();
        } else {
            isCandidateEmail = false;
            candidatesValidation();
        }
    })
    $('#rating__name').on('input', function (e) {
        var thisValue = $(this).val();
        var resultText = thisValue.replace(/[^a-zA-Z. ]/g, '');
        $(this).val(resultText);
        if (thisValue.length > 0) {
            isCandidateName = true;
            candidatesValidation();
        } else {
            isCandidateName = false;
            candidatesValidation();
        }
    });
    $('.rating__question__wrapper .fa-star').on('click', function () {
        var isRatingSet = [];
        var getTotal = 0;
        if ($(this).closest('.rating__question__wrapper').hasClass('valid')) {
            var getVal = $(this).attr('rating-value');
            var getParentID = $(this).parent('.item').attr('id');
            $('#' + getParentID + ' .fa').removeClass('checked');
            $(this).addClass('checked');
            $('#' + getParentID + ' .fa').each(function (index) {
                if (getVal >= index) {
                    $(this).addClass('checked');
                }
            });
            getVal = parseInt(getVal) + 1;
            $('#' + getParentID + ' .hidden__input').val(getVal);
            getVal = 0;
            $('.wrapper__col .item').each(function (index) {
                if ($('.hidden__input', this).val() == null || $('.hidden__input', this).val() == '') {
                    isTrue = false;
                } else {
                    isTrue = true;
                    getTotal = parseInt($('.hidden__input', this).val()) + getTotal;
                    // console.log(getTotal);
                }
                isRatingSet.push(isTrue);
                var finalRating =  parseInt(getTotal) / 15;
                // console.log();
                $('.dynamic__rating').text((Math.round(finalRating * 100) / 100).toFixed(1));
                $('.main__rating').removeClass('d-none');
                $('.rating__star .fa').each(function(index){
                    if(parseInt(finalRating) > index){
                        console.log(index);
                        $(this).addClass('checked');
                    }
                })


            });
            changeButton(isRatingSet);
        } else {
            alert('Please fill your details first');
            $('#rating__name').focus();

        }
    });
    $('.form__submit__cta').on('click', function () {
        var getArr = [];
        // var getTotal = 0;
        $('.wrapper__col .item').each(function (index) {
            getArr.push($('.hidden__input', this).val());
            // getTotal = parseInt($('.hidden__input', this).val()) + getTotal;
        });
        console.log({ getArr });
    })
});

function changeButton(isRatingSet) {
    if (isRatingSet) {
        isRatingSet.includes(false, 0) ? $('.form__submit__cta').prop('disabled', true) : $('.form__submit__cta').prop('disabled', false);
    }
}
function candidatesValidation() {
    changeButton();
    isCandidateEmail && isCandidateName ? $('.rating__question__wrapper').addClass('valid') : $('.rating__question__wrapper').removeClass('valid');
}
// function checkRating() {
//     var getTotal = 0;
//     $('.wrapper__col .item').each(function (index) {
//         getArr.push($('.hidden__input', this).val());
//         getTotal = parseInt($('.hidden__input', this).val()) + getTotal;
//     });
//     getArr.filter(function(){
//         console.log()
//     })
// }