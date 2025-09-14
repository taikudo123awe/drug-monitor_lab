//let url = location.host;//so it works locally and online
let baseUrl = window.location.protocol + "//" + window.location.host; 

$("table").rtResponsiveTables();//for the responsive tables plugin

$("#add_drug").submit(function(event){
    event.preventDefault(); // chặn submit mặc định

    var formData = $(this).serialize();

    $.ajax({
        url: `${baseUrl}/api/drugs`,
        method: "POST",
        data: formData,
        success: function(response){
            alert("Drug added successfully!");
            window.location.href = "/manage";
        },
        error: function(xhr){
            // Nếu server gửi lỗi (validateDrug fail) -> hiện alert lỗi
            const errorMsg = xhr.responseJSON?.error || xhr.responseJSON?.message || "There was an error while adding the drug";
            alert(errorMsg);
        }
    });
});



$("#update_drug").submit(function(event){// on clicking submit
    event.preventDefault();//prevent default submit behaviour

    //var unindexed_array = $("#update_drug");
    var unindexed_array = $(this).serializeArray();//grab data from form
    var data = {}

    $.map(unindexed_array, function(n, i){//assign keys and values from form data
        data[n['name']] = n['value']
    })


    var request = {//use a put API request to use data from above to replace what's on database
    "url" : `${baseUrl}/api/drugs/${data.id}`,
    "method" : "PUT",
    "data" : data
}

$.ajax(request).done(function(response){
    alert(data.name + " Updated Successfully!");
		window.location.href = "/manage";//redirects to index after alert is closed
    })

})
//delete
if(window.location.pathname == "/manage"){//since items are listed on manage
    $ondelete = $("table tbody td a.delete"); //select the anchor with class delete
    $ondelete.click(function(){//add click event listener
        let id = $(this).attr("data-id") // pick the value from the data-id

        let request = {//save API request in variable
            "url" : `${baseUrl}/api/drugs/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this drug?")){// bring out confirm box
            $.ajax(request).done(function(response){// if confirmed, send API request
                alert("Drug deleted Successfully!");//show an alert that it'    s done
                location.reload();//reload the page
            })
        }

    })
}

if(window.location.pathname == "/purchase"){
//$("#purchase_table").hide();

$("#drug_days").submit(function(event){//on a submit event on the element with id add_drug
    event.preventDefault();//prevent default submit behaviour
    $("#purchase_table").show();
    days = +$("#days").val();
    alert("Drugs for " + days + " days!");//alert this in the browser
})

}
