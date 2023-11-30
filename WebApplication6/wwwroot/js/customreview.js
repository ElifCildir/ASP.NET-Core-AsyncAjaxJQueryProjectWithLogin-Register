$(document).ready(function () {

    ShowReviewData();

});

function ShowReviewData()
{

    var url = $('#urlReviewData').val();
    $.ajax({
        url: url,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',

        success: function (result, statu, xhr) {
            var object = '';

            $.each(result, function (index, item) {

                object += '<tr>';
                object += '<td>' + item.reviewID + '</td>';
                object += '<td>' + item.reviewText + '</td>';
                object += '<td>' + item.rating + '</td>';
                object += '<td>' + item.datePosted + '</td>';
                object += '<td>' + item.userrName + '</td>';
                object += '<td>' + item.destinationID + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.reviewID + ')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.reviewID + ');">Delete</a></td>';
                object += '</tr>';

            });

            $('#table_data').html(object);

        },

        error: function () {

            alert("Data can't get");
        }
    });
};

$('#btnAddReview').click(function () {
    ClearTextBoxR();
    $('#ReviewModal').modal("show");
    $('#revId').hide();
    $('#AddReview').css('display', 'block');
    $('#UpdateReview').css('display', 'none');
    $('#revHeader').text("Add Review");

});


function ClearTextBoxR()
{
    $('#ReviewText').val('');
    $('#Rating').val('');
    $('#DatePosted').val('');
    $('#UserrName').val('');
    $('#DestinationID').val('');

}

function AddReview() {
    var objData = {
        ReviewText: $('#ReviewText').val(),
        Raitng: $('#Rating').val(),
        DatePosted: $('#DatePosted').val(),
        UserrName: $('#UserrName').val(),
        DestinationID: $('#DestinationID').val(),

    }
    $.ajax({
        url: '/UserReview/Create',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        datatype: 'json',
        success: function () {
            alert('Data Added');
            ClearTextBoxR();
            ShowReviewData();
            HideModalPopUpR();

        },
        error: function () {
            alert("Data Couldn't Add");
        }
    })
}


function HideModalPopUpR() {
    $('#ReviewModal').modal('hide');
}
function Delete(id) {

    if (confirm('Are you sure you want to delete?')) {
        $.ajax({
            url: '/UserReview/Delete?id=' + id,
            success: function () {
                alert("Deleted");
                ShowReviewData();
            },
            error: function () {
                alert("Failed to Delete")
            }

        })
    }

}

function Edit(id) {

    $.ajax({

        url: '/UserReview/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#ReviewModal').modal('show');
            $('#ReviewID').val(response.reviewID);
            $('#ReviewText').val(response.reviewText);
            $('#Rating').val(response.rating);
            $('#DatePosted').val(response.datePosted);
            $('#UserrName').val(response.userrName);
            $('#DestinationID').val(response.destinationID);
            $('#AddReview').css('display', 'none');
            $('#UpdateReview').css('display', 'block');
            $('#revHeader').text('Update UserReview Page');



        },

        error: function () {
            alert("Data not found");
        }


    })


}


function UpdateReview() {
    var objdata = {
        ReviewID: $('#ReviewID').val(),
        ReviewText: $('#ReviewText').val(),
        Rating: $('#Rating').val(),
        DatePosted: $('#DatePosted').val(),
        UserrName: $('#UserrName').val(),
        DestinationID: $('#DestinationID').val(),
    }
    $.ajax({
        url: '/UserReview/Update',
        type: 'Post',
        data: objdata,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        datatype: 'json',
        success: function () {
            alert('Data Updated');
            ShowReviewData();
            ClearTextBoxR();
            HideModalPopUpR();
        },
        error: function () {
            alert("Update Failed");
        }
    })



}



