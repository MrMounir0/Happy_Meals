$(document).ready(function () {

    $("input.in1").change(function () {

        var row = $(this).closest("tr");
        var details = row.next("tr.TT");

        if ($(this).is(":checked")) {
            details.slideDown();
        } else {
            details.slideUp();
        }
    });
    $("input.in2").change(function () {

        if ($("input.in2:checked").length > 0) {
            $("#in3").fadeIn();
        } else {
            $("#in3").fadeOut();
        }
    });
    $("#in3").click(function () {
        $("#fi").slideDown();
    });
    $("#fi").submit(function (e) {
        e.preventDefault();

        let name = $("#name").val().trim();
        let nid = $("#ID").val().trim();
        let birth = $("#birthDate").val().trim();
        let mobile = $("#mobile").val().trim();
        let email = $("#email").val().trim();

 
        let nameRegex = /^[\u0600-\u06FF ]+$/;

  
        let nidRegex = /^[0-9]{11}$/;


        let mobileRegex = /^(09[3-8][0-9]{7})$/;


        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!nameRegex.test(name)) {
            alert("الاسم يجب أن يكون باللغة العربية فقط");
            return;
        }

        if (!nidRegex.test(nid)) {
            alert("الرقم الوطني يجب أن يكون 11 خانة");
            return;
        }
        if (birth !== "") {

            let parts = birth.split("-");

            if (parts.length !== 3) {
                alert("تاريخ الولادة يجب أن يكون بالشكل dd-mm-yyyy");
                return;
            }

            let day = parseInt(parts[0]);
            let month = parseInt(parts[1]);
            let year = parseInt(parts[2]);

            if (isNaN(day) || isNaN(month) || isNaN(year)) {
                alert("تاريخ الولادة يحتوي على قيم غير صالحة");
                return;
            }

            if (day < 1 || day > 31) {
                alert("اليوم يجب أن يكون بين 1 و 31");
                return;
            }

            if (month < 1 || month > 12) {
                alert("الشهر يجب أن يكون بين 1 و 12");
                return;
            }

            if (year < 1940 || year > 2026) {
                alert("السنة يجب أن تكون بين 1940 و 2026");
                return;
            }
        }
        if (mobile !== "" && !mobileRegex.test(mobile)) {
            alert("رقم الموبايل غير صحيح");
            return;
        }


        if (email !== "" && !emailRegex.test(email)) {
            alert("الإيميل غير صحيح");
            return;
        }

        let selectedMeals = [];
        let total = 0;

        $("input.in2:checked").each(function () {

            let row = $(this).closest("tr");

            let code = row.find("td:eq(0)").text();
            let name = row.find("td:eq(1)").text();
            let priceText = row.find("td:eq(2)").text();

            let price = parseInt(priceText.replace(/\D/g, ""));

            selectedMeals.push({
                code: code,
                name: name,
                price: price
            });

            total += price;
        });

      
        let discount = total * 0.05;
        let finalTotal = total - discount;

    
        let message = "الوجبات التي تم اختيارها:\n\n";

        selectedMeals.forEach(m => {
            message += `الرمز: ${m.code}\n`;
            message += `الوجبة: ${m.name}\n`;
            message += `السعر: ${m.price} ل.س\n\n`;
        });

        message += "-----------------------------\n";
        message += `المجموع قبل الحسم: ${total} ل.س\n`;
        message += `قيمة الحسم (5%): ${discount} ل.س\n`;
        message += `المجموع النهائي: ${finalTotal} ل.س\n`;

  
        alert(message);

    
    });
});
