function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    $.ajax({
        type: "POST",
        data: { email, password },
        dataType: 'json',
        url: host + '/api/v1/admin/auth/login',
    }).done(function (data) {
        // If successful
       localStorage.setItem("name", data._doc.name);
       localStorage.setItem("token", data._doc.token);
       window.location.reload()
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        alert(jqXHR.responseJSON.error)
    });
}
