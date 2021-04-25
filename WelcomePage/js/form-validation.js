jQuery.validator.addMethod("lettersonly", function(value, element) {
	return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Letters only please");

jQuery.validator.addMethod("lettersAndNubersOnly", function(value, element) {
	return this.optional(element) || /^[a-z0-9]+$/i.test(value);
}, "must have letters and numbers only please");

jQuery.validator.addMethod("usernameExist", function(value, element) {
	return this.optional(element) || true; // need to add connection to main Users Array
}, "username already exist");

jQuery.validator.addMethod("passwordCurrect", function(value, element) {
	return this.optional(element) || true; // need to add connection to main Users Array and check password
}, "password incorrect");


$(document).ready(function() {
  $('#signupForm').validate({
    rules: {
      userSignup: {
          required: true,
          usernameExist: false
      },
      nameSignup: {
        required: true,
        lettersonly: true
      },
      passwordSubmit: {
        minlength: 6,
        required: true,
        lettersAndNubersOnly: true
      },
      emailSignup: {
        required: true,
        email: true
      },
      dateSignup: {
        required: true
      }
    },
    submitHandler: function (form) { 
      alert('valid form submitted'); 
      $('#signupPage').css('display', 'none');
      $('#welcomePage').css('display', 'block');
      return false; 
  },    
  });

  $('#loginForm').validate({
    rules: {
      userLogin: {
          required: true,
          usernameExist: true
      },
      passwordLogin: {
        required: true,
        passwordCurrect: true
      },
    },
    submitHandler: function (form) { 
      // alert('valid form submitted'); 
      // $('#loginPage').css('display', 'none');
      // $('#settingPage').css('display', 'block');
      return false; 
  },    
  });
})