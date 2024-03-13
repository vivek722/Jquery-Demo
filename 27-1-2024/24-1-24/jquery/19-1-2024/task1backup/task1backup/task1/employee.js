

$(document).ready(function () {
//add datalist value 

  $("#btnAddDataList").click(function(){
   let dataList = $("#txtAddDataList").val();
    $('ul').append('<li>'+dataList+'<span><i class="fa-solid fa-xmark" id="deleteIcon" style="color: #000000;"></i></span></li>')
    $("#txtAddDataList").val("");
  })
  $('ul').on("click","span",function(){
    $(this).parent('li').remove();
  });
//insert data
  $("#saveData").click(function () {
   
    let parentContainer = $("#myModal");
    let value = Validate(parentContainer);
    
   if(value)
   {
    let id = $("#hiddenField").val();
    let firestName = $("#txtFirstName").val();
    let lastName = $("#txtLastName").val();
    let emailId = $("#txtEmailId").val();
    let dateOfBirth = $("#dpDateOfBirth").val();
    let dateOfJoining = $("#dpDateOfJoining").val();
    let Designation = $("#optDesignation").val();
    let Description = $("#Description").val();
    let gender = $('input[name="rbtGender"]:checked').val();
    let img = $('#preview').attr('src');
    let ul = $('#skills').children('li');
    let datalist =[]
    for(i=0;i<ul.length;i++)
    {
      datalist.push(ul[i].innerText)
    }
      // img =  $('#preview').attr('src');
      // $("#uploadedImage").attr('src',img);
    const employee = {
      firstname: firestName,
      lastname: lastName,
      emailid: emailId,
      gender: gender,
      dateofbirth: dateOfBirth,
      dateofjoin: dateOfJoining,
      designation: Designation, 
      Image: img,
      description: Description,
       Skills:datalist
    }
    if(hiddenField == "")
    {
      insertUserData()
      addEmployee(employee,0)   
      $("#myModal").hide();
   }
   else
   {
    if(employee.Image == "")
    {
      employee.img = $('#preview').attr('src');
    }
    insertUserData()
    addEmployee(employee,id) 
    $("#myModal").hide();
   } 
   empAllData()
   cleanData()
  }
  });
  empAllData();

//search data
$("#searchUserData").click(function(){
  let searchValue = $("#searchbar").val();
  let sortedList = searchEmployee(searchValue);
  let html =  $("#Crudtable tbody").html("");
         sortedList.forEach(function(emp){
             html +="<tr>";
             html +="<td> "+'<button class="btn"><i class="fa-solid fa-circle-plus" style="color: #000000;"></i></button>'+"</td>";
             html +='<td><img src="'+emp.img+'" alt="image" class="image--cover"></img></td>';
             html +="<td>"+emp.firstname + "  "+emp.lastname+"</td>";
             html +="<td>"+emp.emailid +"</td>";
             html +="<td>"+emp.designation +"</td>";
             html +="<td>"+emp.gender +"</td>";
             html +="<td>"+'<button class="btn"><i class="fa-sharp fa-solid fa-pen" style="color: #fff700;"></i></button> <button class="btn removeData"  id="'+emp.id +'"><i class="fa-sharp fa-solid fa-trash" style="color: #ff0000; margin-left: 20px;"></i></button> '+"</td>";
             html +="</tr>";
 
         }); 
         $("#Crudtable tbody").append(html);
 });


});

//pagination
function pagination(){
  let elist = getAllData();
  $('#paginationtbl').pagination({
    dataSource:elist,
    pageSize: 3,
    pageRange: null,
    showPageNumbers: true,
    callback: function(elist, pagination) {
      let html ="";
      $("#Crudtable tbody").html("");
        $.each(elist, function(index,emp){
          html +='<tr class="rowClass'+emp.id+'">';
          html +="<td> <button type='button' class='btn delete' data-bs-toggle='collapse' data-bs-target='#detail"+emp.id+"' aria-expanded='false' aria-controls='detail"+emp.id+"'><i class='fa-solid fa-circle-plus' style='color: #000000;'></i></button></td>";
          html +='<td><img src="'+emp.Image+'"alt="image" class="image--cover"></img></td>';
          html +="<td>"+emp.firstname + "  "+emp.lastname+"</td>";
          html +="<td>"+emp.emailid +"</td>";
          html +="<td>"+emp.designation +"</td>";
          html +="<td>"+emp.gender +"</td>";
          html +="<td>"+'<button class="btn updateData" value="'+emp.id+'"><span><i class="fa-sharp fa-solid fa-pen" style="color: #fff700;"></i></span><span></button> <button class="btn removeData"><i class="fa-sharp fa-solid fa-trash" style="color: #ff0000; margin-left: 20px;"></i></span></button> '+"</td>";
          html +="</tr>"
          html += '<tr class="collapse" id="detail'+emp.id+'" style="width: 100%;">';
          html += "<td class='col-md-2'></td>";
          html += "<td class='col-md-2'> Date Of Birth:-"+emp.dateofbirth+"</td>";
          html += "<td class='col-md-2'> Date Of Join:-"+emp.dateofjoin+"</td>";
          html += "<td class='col-md-2'> Description:-" +emp.description+"</td>";
          html += "<td class='col-md-2'> Skills:-" +emp.Skills+"</td>";
          html += "</tr>";
    
          $("#btnDeleteUser").click(function(){return this.val()});
    
      });
      $("#Crudtable tbody").append(html);
    }
  })  
  }


//DISPLAY 
function empAllData(){  
  pagination()
}

//delete
$(document).on("click",".removeData",function(){
    let userId = (this.id); 
  onDeleteDialog(userId,finalDeleteData);
  function finalDeleteData(userId)
  {
  
    deleteEmployee(userId); 
  }
});

//update
$(document).on("click",".updateData",function(){
  
    let values = $(this).val();
    let updateData = getEmployeeById(values);
    cleanData();
    $("#hiddenField").val(updateData.id);
    $("#txtFirstName").val(updateData.firstname);
    $("#txtLastName").val(updateData.lastname);
    $("#txtEmailId").val(updateData.emailid);
    $("#dpDateOfBirth").val(updateData.dateofbirth);
    $("#dpDateOfJoining").val(updateData.dateofjoin); 
    $("#optDesignation").val(updateData.designation);
    $("#Description").val(updateData.description);
    $('#preview').attr('src',updateData.Image);
    $('#preview').html(updateData.Image);
    //gender
    if(updateData.gender == "Male")
      {
        $("#rbtGenderMale").prop("checked", "true");
      }
      else
      {
        $("#rbtGenderFemale").prop("checked", "true");
      }
      //skill
      let updateSkills = updateData.Skills;
     for(i=0;i<updateSkills.length;i++) {
     $("#txtAddDataList").val();
      $('ul').append('<li>'+updateSkills[i]+'<span><i class="fa-solid fa-xmark" id="deleteIcon" style="color: #000000;"></i></span></li>')
      $("#txtAddDataList").val("");

     $('ul').on("click","span",function(){
      $(this).parent('li').remove();
    });
  }
    $("#myModal").show();
})

 //clear
 function cleanData(){  
  $("#txtFirstName").val("");
  $("#txtLastName").val("");
  $("#txtEmailId").val("");
  $("#dpDateOfBirth").val("");
  $("#dpDateOfJoining").val("");
  $("#optDesignation").val("");
  $("#Description").val("");
  $('#preview').attr('src',"");
  $('#rbtGenderMale').prop("checked",false);
  $('#rbtGenderFemale').prop("checked",false  ); 
  $("#txtAddDataList").val("");
  $("#skills").text("");
  $(".errrorValidation").remove();
 }
