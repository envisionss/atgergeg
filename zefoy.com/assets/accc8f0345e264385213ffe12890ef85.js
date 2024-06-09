$(window).on('load', function() {
    loadform();
});

function revStr(str) {
    return str.split('').reverse().join('');
}

function loadform() {
    $('form').submit(function(event) {
        event.preventDefault();
        var post_url = $(this).attr('action');
        var form_data = new FormData(this);
        var disableButton = $('.disableButton');
        disableButton.prop('disabled', true);
        $.ajax({
            url: post_url,
            type: 'POST',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            timeout: 30000
        }).done(function(response) {
            var decodedResponse = decodeURIComponent(revStr(response));
            var decodedResponseBase64 = atob(decodedResponse);
            $('#' + post_url).html(decodedResponseBase64);
            $('form').unbind();
            loadform();
            disableButton.prop('disabled', false);
        }).fail(function(response) {
            disableButton.prop('disabled', false);
            $('.wbutton, .spinner-border, .list-group').addClass('nonec');
            $('.error').removeClass('nonec');
        });
    });
}