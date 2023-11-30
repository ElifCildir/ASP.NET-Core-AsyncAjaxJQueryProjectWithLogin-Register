

$(document).ready(function () {
    ShowHotelData();
})


function ShowHotelData() {
    var url = $("#urlHotelData").val();
    $.ajax({
        url: url,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (result, statu, xhr) {
            var object = '';
            $.each(result, function (index, item) {

                object += '<tr>';
                object += '<td>' + item.hotelId + '</td>';
                object += '<td>' + item.hotelName+ '</td>';
                object += '<td>' + item.address + '</td>';
                object += '<td>' + item.pricepernight + '</td>';
                object += '<td>' + item.destinationID + '</td>';
                object += '<td><a href="#" class= "btn btn-primary" onclick= "Edit(' + item.hotelId + ')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.hotelId + ');">Delete</a></td>';
                object += '</tr>';


            });


            $('#table_data').html(object);


        },

        error: function () {
            alert("Data can't get");
        }


    });


};



$('#btnAddHotel').click(function () {
   ClearTextBoxH();
    $('#HotelModal').modal('show');
    $('#htlId').hide();
    $('#AddHotel').css('display', 'block');
    $('#UpdateHotel').css('display', 'none');
    $('#hotelHeading').text('Add Hotel');


})

function ClearTextBoxH() {

    $('#HotelName').val('');
    $('#Address').val('');
    $('#Pricepernight').val('');
    $('#DestinationID').val('');

}

function AddHotel() {
    var objData = {

        HotelName: $('#HotelName').val(),
        Address: $('#Address').val(),
        Pricepernight: $('#Pricepernight').val(),
        DestinationID: $('#DestinationID').val(),
    }

    $.ajax({

        url: '/Hotel/Create',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',

        success: function () {
            alert('Data Added');
            ClearTextBoxH();
            ShowHotelData();
            HideModalPopUpH();

        },

        error: function () {
            alert("Data Couldn't Add");
        }

    })

}

function HideModalPopUpH() {

    $('#HotelModal').modal('hide');
}

function Delete(id) {

    if (confirm('Are you sure you want to delete?')) {
        $.ajax({

            url: '/Hotel/Delete?id=' + id,
            success: function () {
                alert("Deleted");
                ShowHotelData();
            },

            error: function () {
                alert("Failed to delete")
            }


        })


    }

}

function Edit(id) {
    $.ajax({

        url: '/Hotel/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#HotelModal').modal('show');
            $('#HotelId').val(response.hotelId);
            $('#HotelName').val(response.hotelName);
            $('#Address').val(response.address);
            $('#Pricepernight').val(response.pricepernight);
            $('#DestinationID').val(response.destinationID);
            $('#AddHotel').css('display', 'none');
            $('#UpdateHotel').css('display', 'block');
            $('#hotelHeading').text('Update Hotel Page');




        },

        error: function () {

            alert("Data not found")
        }


    })



}
function UpdateHotel() {
    var objdata = {
        HotelId: $('#HotelId').val(),
        HotelName: $('#HotelName').val(),
        Address: $('#Address').val(),
        Pricepernight: $('#Pricepernight').val(),
        DestinationID: $('#DestinationID').val(),

    }
    $.ajax({
        url: '/Hotel/Update',
        type: 'Post',
        data: objdata,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        datatype: 'json',
        success: function () {
            alert('Data Updated');
            ShowHotelData();
            ClearTextBoxH();
            HideModalPopUpH();

        },
        error: function () {
            alert("Update Failed");
        }
    })



}

