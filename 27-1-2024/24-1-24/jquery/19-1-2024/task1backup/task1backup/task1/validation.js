function Validate(parentContainer) {
  let checkValid = true;
  const inputControls = $(parentContainer).find(".nat-requrid");
  const inputEmail = $(parentContainer).find(".nat-email");
  const error2 = $(inputEmail).attr("errorMessage2");
  inputControls.each(function (index, controls) {
    const inputType = $(inputControls).attr("type");
    if (inputType == "text" ||inputType == "file" || inputType == "date" ||inputType == "select") {
        const error = $(controls).attr("errorMessage");
        if(!checkValue(controls,error)){
            checkValid = false;
        }
        if(!checkkeyup(controls,error)){
            checkValid = false;
        }
        if(!checkchange(controls,error)){
            checkValid = false;
        }
    }
  });
  $(inputEmail).on("keyup", function () {
    $(this).next("span").remove();
    if (!EmailCheck($(inputEmail).val())) {
    checkValid = false;
      showError(inputEmail, error2);
    }
   else {
      $(this).next("span").remove();
    }
  });
  return checkValid;
}
function EmailCheck(email){
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function checkValue(controls,error){
      if ($(controls).val() == "") {
        showError(controls,error);
        return false;
      }
      return true;
}
function checkKeyup(controls,error){
    $(controls).keyup(function () { 
         $(this).next("span").remove();
        if ($(controls).val() == "") {
          showError(controls, error);
          return false;
        }
        return true;
    });
}
function checkChange(controls,error){
    $(controls).change(function () { 
        $(this).next("span").remove();
        if ($(controls).val() == "") {
          showError(controls, error);
          return false;
        }
        return true;   
    });
}
function showError(controls, errors) {
    $(controls).after(function () {
      return '<span class="errrorValidation errormsg">' + errors + "</span>";
    });
  }
  