$(document).ready(function () {
    ShowDestinationData();
})


function ShowDestinationData() {
    var url = $("#urlDestinationData").val();
    $.ajax({
        url: url,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (result, statu, xhr) {
            var object = '';
            $.each(result, function (index, item) {

                object += '<tr>';
                object += '<td>' + item.destinationId + '</td>';
                object += '<td>' + item.destinationName + '</td>';
                object += '<td>' + item.country + '</td>';
                object += '<td>' + item.averageRating + '</td>';
                object += '<td><a href="#" class= "btn btn-primary" onclick= "Edit(' + item.destinationId + ')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.destinationId + ');">Delete</a></td>';
                object += '</tr>';


            });


            $('#table_data').html(object);


        },

        error: function () {
            alert("Data can't get");
        }


    });


};




$('#btnAddDestination').click(function () {
    $('#DestinationMadal').modal('show');
    $('#desId').hide();
    $('#AddDestination').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#destinationHeading').text('Add Destination');


})

function AddDestination() {
    var objData = {

        DestinationName: $('#DestinationName').val(),
        Country: $('#Country').val(),
        AverageRating: $('#AverageRating').val(),
    }

    $.ajax({

        url: '/Destination/AddDestination',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',

        success: function () {
            alert('Data Added');
            ClearTextBox();
            ShowDestinationData();
            HideModalPopUp();

        },

        error: function () {
            alert("Data Couldn't Add");
        }

    })
}

function ClearTextBox() {
    $('#DestinationName').val('');
    $('#Country').val('');
    $('#AverageRating').val('');


}

function HideModalPopUp() {

    $('#DestinationMadal').modal('hide');
}

function Delete(id) {

    if (confirm('Are you sure you want to delete?')) {
        $.ajax({

            url: '/Destination/Delete?id=' + id,
            success: function () {
                alert("Deleted");
                ShowDestinationData();
            },

            error: function () {
                alert("Failed to delete")
            }


        })


    }

}

function Edit(id) {
    $.ajax({

        url: '/Destination/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#DestinationMadal').modal('show');
            $('#DestinationId').val(response.destinationId);
            $('#DestinationName').val(response.destinationName);
            $('#Country').val(response.country);
            $('#AverageRating').val(response.averageRating);
            $('#AddDestination').css('display', 'none');
            $('#btnUpdate').css('display', 'block');
            $('#destinationHeading').text('Update Destination Page');




        },

        error: function () {

            alert("Data not found")
        }


    })



}
function UpdateDestination()

{
    var objdata = {
        DestinationId: $('#DestinationId').val(),
        DestinationName: $('#DestinationName').val(),
        Country: $('#Country').val(),
        AverageRating: $('#AverageRating').val(),
       
    }
    $.ajax({
        url: '/Destination/Update',
        type: 'Post',
        data: objdata,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        datatype: 'json',
        success: function () {
            alert('Data Updated');
            ShowDestinationData();
            ClearTextBox();
            HideModalPopUp();
           
        },
        error: function () {
            alert("Update Failed");
        }
    })



}


//function UpdateDestination() {

//    var objdata = {

//        DestinationId: $('#DestinationId').val(),
//        DestinationName: $('#DestinationName').val(),
//        Country: $('#Country').val(),
//        AverageRating: $('#AverageRating').val()

//    }

//    $.ajax({

//        url: '/Destination/Update',
//        type: 'Post',
//        data: objdata,
//        contentType:'application/x-www-form-urlencouded; charset=utf-8;',
//        dataType: 'json',


//        success: function () {

//            alert('Data Updated');
//            ShowDestinationData();
//            ClearTextBox();
//            HideModalPopUp();

//        },

//        error: function () {
//            alert("Update Failed")
//        }

//    })
//}

