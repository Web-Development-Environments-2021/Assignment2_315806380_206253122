// Classes

class User {
    constructor(username, password, fullname, email, birthdate){
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
        this.birthdate = birthdate;
    }
}

User.prototype.equals = function (o) {
    if (o instanceof 'string') {
        return new String(this.username) == o;
    }
    return this.username === o.username;
};

// End Classes

let Users = [new User('k', 'k')]
let Passwords = ["k"]

// Welcome Page

$(document).ready(function() {
    $('#start').click(function() {
        $(this).parent().css('display', 'none');
        $('#loginPage').css('display', 'flex');
        // $('#theme').trigger('play');
    })
})

$(document).ready(function() {
    $('#signup').click(function() {
        $(this).parent().css('display', 'none');
        $('#signupPage').css('display', 'flex');
    })
})

// End Welcome Page

// Login

$(document).ready(function() {
    $('#login').click(function() {
        if (includesIn(Users, $('#userLogin').val())) {
            if (Users.includes($('#passwordLogin').val())) {
                console.log("Horray you are a User!");
            } else {
                $('#userLogin').css('border-color', 'green');
                $('#userLogin').attr("placeholder", "User Name");
                $('#passwordLogin').css('border-color', 'red');
                $('#passwordLogin').attr("placeholder", "Password in wrong!");
                $('#userLogin').val("");
                $('#passwordLogin').val("");
            }
        } else {
            if ($('#userLogin').val() == "") {
                $('#userLogin').css('border-color', 'red');
                $('#userLogin').attr("placeholder", "Username field must be fill.");
                $('#userLogin').val("");
                $('#passwordLogin').val("");
            } else {
                $('#userLogin').css('border-color', 'red');
                $('#userLogin').attr("placeholder", "Username already exists.");
                $('#userLogin').val("");
                $('#passwordLogin').val("");
            }
        };
    });
});


// End Login

// Signup

$(document).ready(function() {
    $('#register').click(function() {
        let username, password, fullname, email, birthdate;
        let issue = false;
        let index = 0;
        $('#form').find('input[type=text]').each(function() {
            if (index == 0){
                if ($(this).val() == ""){
                    $(this).css('border-color', 'red');
                    $(this).attr("placeholder", "Username field must be filled.");
                    let issue = true;
                }
                else if (includesIn(Users, $(this).val())) {
                    $(this).css('border-color', 'red');
                    $(this).attr("placeholder", "Username already exists.");
                    issue = true;
                } else {
                    $(this).css('border-color', 'green');
                    $(this).attr("placeholder", "Username");
                    username = $(this).val();
                }
            } else {
                if ($(this).val() == "") {
                    $(this).css('border-color', 'red');
                    $(this).attr("placeholder", "Full Name field must be filled.");
                    issue = true;
                    // need to add a check here - full name doesn't contain numbers
                } else {
                    $(this).css('border-color', 'green');
                    $(this).attr("placeholder", "Full Name");
                    fullname = $(this).val();
                }
            }
            index ++;
        });
        $('#form').find('input[type=password]').each(function() {
            if ($(this).val() == ""){
                $(this).css('border-color', 'red');
                $(this).attr("placeholder", "Password field must be filled.");
                issue = true;
            }
            else if ($(this).val().length < 6) {
                $(this).css('border-color', 'red');
                $(this).attr("placeholder", "Password length must be at list 6.");
                issue = true;
            }
            else if (!/[a-z]/.test($(this).val()) && !/[0-9]/.test($(this).val())) {
                $(this).css('border-color', 'red');
                $(this).attr("placeholder", "Password must contain letters and numbers.");
                issue = true;
            } else {
                $(this).css('border-color', 'green');
                $(this).attr("placeholder", "Password");
                password = $(this).val();
            }
        });   
        $('#form').find('input[type=email]').each(function() {
            let emailReg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if ($(this).val() == "") {
                $(this).css('border-color', 'red');
                $(this).attr("placeholder", "email address field must be filled.");
                issue = true;
            }
            else if (emailReg.test($(this).val())) {
                $(this).css('border-color', 'red');
                $(this).attr("placeholder", "Email address invalid.");
                issue = true;
            } else {
                $(this).css('border-color', 'green');
                $(this).attr("placeholder", "email address");
                email = $(this).val();
            }
        });
        if (issue){
            document.getElementById("form").reset(); 
        } else {
            Users.push(new User(username, password, fullname, email, birthdate))
        }
    })
})


// End Signup


// Functions

function includesIn(array, object) {
    let result = false;
    array.forEach(element => {
        if (typeof object === 'string') {
            if (element.username === object) {
                result = true;
            };
        } else {
            if (element.username === object.username) {
                result = true;
            }
        }
    });
    return result;
}


// End Functions