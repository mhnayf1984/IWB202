$(document).ready(function () {
  $("input[name='details']").change(function () {
    var carCode = $(this).val();
    var detailsRow = $("#details-" + carCode);



/* تنفيذ الأوامر بعد تحميل الصفحة */
$(document).ready(function () {

    /* تنفيذ الأوامر عند الضغط على زر متابعة */
    $("#continueButton").click(function () {

        /* إظهار نموذج الحجز */
        $("#booking").show();

        /* الانتقال بسلاسة إلى مكان نموذج الحجز */
        $("#booking").get(0).scrollIntoView({
            behavior: "smooth"
        });

    });

});
    if ($(this).is(":checked")) {
      detailsRow.show();
    } else {
      detailsRow.hide();
    }
  });
});
function submitForm(event) {
  event.preventDefault();
  var validName = checkFullName();
  var validNationalId = checkNationalId();
  var validEndDate = checkEndDate();
  var validMobile = checkMobile();

  if (!validName || !validNationalId || !validEndDate || !validMobile) {
    return;
  }

  alert("تم التحقق من البيانات بنجاح");
}

function checkFullName() {
  var fullName = document.getElementById("full_name");
  var errorFullName = document.getElementById("error_full_name");

  /**
   regixe
   * [\u0621-\u064A\s] يقبل المحارف العربية جميعها مع محارف whitespace \s
   * + يجب أن يكتب محرف واحد على الاقل
   *
   */
  var pos = fullName.value.search(/^[\u0621-\u064A\s]+$/);

  if (pos != 0) {
    setError("الاسم يجب أن يحتوي على أحرف عربية فقط", errorFullName, fullName);
    return;
  }

  errorFullName.textContent = "";
  return true;
}

function checkNationalIdNumber() {
  var nationalIdNumber = document.getElementById("national_id_number");
  var errornationalIdNumber = document.getElementById(
    "error_national_id_number",
  );

  //   التحقق من ان حقل العنوان الوطني يجتوي قيمة
  if (nationalIdNumber.value == "") {
    setError(
      "الرجاء ادخال العنوان الوطني",
      errornationalIdNumber,
      nationalIdNumber,
    );
    return;
  }

  /**
   regixe
   * ^(0[1-9]|1[0-4])   يجب ان يبدأ ب 0 وأي رقم بعده أو 1 وأي رقم بعد لكن لحد رقم 4 
   * \d{9} وبعدها 9 ارقام وبالتالي المجموع يساوي 11
   *
   */

  var pos = nationalIdNumber.value.search(/^(0[1-9]|1[0-4])\d{9}$/);

  if (pos != 0) {
    setError(
      "أول خانتين يجب أن ترمزا إلى المحافظة من 01 إلى 14 ويجب أن لا يقل عن 11 محرف",
      errornationalIdNumber,
      nationalIdNumber,
    );
    return;
  }

  errornationalIdNumber.textContent = "";
  return true;
}

function checkEndDate() {
  var startDate = document.getElementById("start_date");
  var endDate = document.getElementById("end_date");
  var errorEndDate = document.getElementById("error_end_date");

  //   نتحقق من  انه لا يوجود قيمة في حقل تاريخ النهاية
  if (endDate.value === "") {
    errorEndDate.textContent = "";
    return true;
  }

  //   في حال وجد تاريخ نهاية نتحقق من انه يوجد قيمة في حقل تاريخ البداية
  if (startDate.value === "") {
    setError("يجب إدخال تاريخ بداية التأجير أولاً", errorEndDate, endDate);
    return false;
  }
  // تاريخ النهاية يجب أن يكون بعد تاريخ البداية
  if (endDate.value <= startDate.value) {
    setError(
      "تاريخ نهاية التأجير يجب أن يكون لاحقاً لتاريخ البداية",
      errorEndDate,
      endDate,
    );
    return false;
  }

  errorEndDate.textContent = "";
  return true;
}

function checkMobile() {
  var mobile = document.getElementById("mobile");
  var errorMobile = document.getElementById("error_mobile");

  // التحقق من انه يوجد قيمة في حقل الموبايل
  if (mobile.value === "") {
    setError("رقم الموبايل مطلوب", errorMobile, mobile);
    return false;
  }

  /**
   regixe
   * 09  يجب ان يبدأ ب 09 حصرا
   * (3|4|5|6|8|9) يجب أن يجتوي على 3 أو 4 أو 5 أو 6 أو 8 أو 9
   * لان ارقام سيرياتيل 3 أو 8 أو 9
   * و MTN 4 , 5 , 6
   * \d{7} وبعدها 7 ارقام وبالتالي المجموع يساوي 10
   *
   */
  var pos = mobile.value.search(/^09(3|4|5|6|8|9)\d{7}$/);

  if (pos != 0) {
    setError(
      "رقم الموبايل يجب أن يكون رقم Syriatel أو MTN صحيحاً",
      errorMobile,
      mobile,
    );
    return false;
  }

  errorMobile.textContent = "";
  return true;
}

function setError(msg, errorSelector, selecter) {
  errorSelector.textContent = msg;
  selecter.focus();
  selecter.select();
}
