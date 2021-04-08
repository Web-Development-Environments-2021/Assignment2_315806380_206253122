let Users = ["k"]
let Passwords = ["k"]

// Welcome Page

$(document).ready(function() {
    $('#start').click(function() {
        $('#welcomePage').css('display', 'none');
        $('#loginPage').css('display', 'grid');
    })
})

// End Welcome Page

// Login

$(document).ready(function() {
    $('#login').click(function() {
        if (Users.includes($('#userLogin').val()) && Users.includes($('#passwordLogin').val())) {
            console.log("Horray you are a User!");
        };
    });
});