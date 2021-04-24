jQuery.validator.addMethod("lettersonly", function(value, element) {
	return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Letters only please");

jQuery.validator.addMethod("lettersAndNubersOnly", function(value, element) {
	return this.optional(element) || /^[a-z0-9]+$/i.test(value);
}, "must have letters and numbers only please");


$(document).ready(function() {
  $('#form').validate({
    rules: {
      userSignup: {
          required: true
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
    registerHandler: function (form) { 
      alert('valid form submitted'); 
      return false; 
  }
  });
})