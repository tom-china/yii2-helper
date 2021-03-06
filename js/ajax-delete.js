$(document).on('click', '.ajaxDelete', function() {
    var deleteUrl = $(this).attr('delete-url');
    var pjaxContainer = $(this).attr('pjax-container');
    if ($(this).attr('confirm-text')) {
        var confirmText = $(this).attr('confirm-text');
    } else {
        var confirmText = "You will not be able to undo this!";
    }

    swal({
        title: "Are you sure?",
        text: confirmText,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true,
    }, function() {
        $.ajax({
            url: deleteUrl,
            type: "post",
            dataType: 'json',
            error: function(xhr, status, error) {
            alert('There was an error with your request.' + xhr.responseText);
            }
        }).done(function(data) {
            $.pjax.reload({container: '#' + $.trim(pjaxContainer), async:false});
            pjaxReloadMessage();
        });
    });
});

function pjaxReloadMessage() {

    var id = "#pjax-message";
    if ($(id).length !== 0){
        $.pjax.reload({container: id, async:false});
    };
}
