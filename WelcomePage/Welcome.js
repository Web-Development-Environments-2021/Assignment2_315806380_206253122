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