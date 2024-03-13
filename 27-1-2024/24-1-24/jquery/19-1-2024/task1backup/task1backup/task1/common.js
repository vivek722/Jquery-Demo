$(document).ready(function(){
  
  $("#openModel").click(function(){
    $("#myModal").show();
    cleanData();
  });

  $(".close").click(function(){
    $("#myModal").hide();
    cleanData();
  });


//image preview
  $("#uploadedImage").change(function() {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    }
  }); 
});

//insert data success msg
function insertUserData(){
  Swal.fire({
     title: "Good job!",
     text: "Your Data is Insert SuccessFully!",
     icon: "success"
   });
  }

// //delete data data confrim msg
function onDeleteDialog(userId,callback){
Swal.fire({
   title: "Are you sure?",
   text: "You won't be able to revert this!",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#3085d6",
   cancelButtonColor: "#d33",
   confirmButtonText: "Yes, delete it!"
 }).then((result) => {
   if (result.isConfirmed) {
     Swal.fire({
       title: "Deleted!",
       text: "Your file has been deleted.",
       icon: "success"
     });
     callback(userId)
   }
 });  
}
