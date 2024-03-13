
//add employee data in localstorage
function addEmployee(employee,id){
    let employees = getDataFromLocalStorage()
   

    if(id == 0){
        employee.id = getMaxId();
        employees.push(employee);
        setDataToLocalStorage(employees); 
    }
    else 
    {
        let empList = getAllData()
        for(i=0;i<empList.length;i++)
        {
            if(empList[i].id == id)
            {
                employee.id = id;
                empList[i]=employee;
            }
        }
        setDataToLocalStorage(empList)
    }
}

//SET DATA IN LOCAL storage
function setDataToLocalStorage(employees)
{
    localStorage.setItem('EmpData',JSON.stringify(employees))
}

//get DATA IN LOCAL storage
function getDataFromLocalStorage()
{
    const employees = localStorage.getItem('EmpData')
    return employees ? JSON.parse(employees) : [];
}   

//edit employee data in localstorage
function editEmployee(){
    getDataFromLocalStorage()
}

//display all employee data in localstorage
function getAllData(){
    const employees = localStorage.getItem('EmpData')
    return employees ? JSON.parse(employees) : [];
}
//display specific  employee data in localstorage
function getEmployeeById(values){
    let empList = getAllData();
   return empList.find(x => x.id == values);
}

//delete employee data in localstorage
function deleteEmployee(userId){
    let empList = getAllData()
    let index = empList.findIndex(function(emp){
        return emp.id  == userId;
    })

    empList.splice(index,1);
    localStorage.setItem('EmpData',JSON.stringify(empList));
    empAllData();
}
    
//search employee data in localstorage
function searchEmployee(searchValue){
    let searchEmp = searchValue
    let serchList =  getAllData();
    
    return serchList.filter((e)=> e.id == searchEmp || e.firstname == searchEmp ||  e.lastname == searchEmp);
} 

//genrate id autoincrement
function getMaxId(){
    const employees =  getAllData()
   const EmpIds= employees.map((emp)=>{
       return emp.id;
    });

    if(EmpIds.length == 0)
    {
        return 1;
    }
    else
    {     
        return  Math.max.apply(null,EmpIds) + 1;   
    }
}
// function checkkeyup(controls,error){
//     $(controls).keyup(function () { 
//          $(this).next("span").remove();
//         if ($(controls).val() == "") {
//           checkValid = false;
//           showError(controls, error);
//         }
//     });
// }
// function checkchange(controls,error){
//     $(controls).change(function () { 
//         $(this).next("span").remove();
//         if ($(controls).val() == "") {
//           checkValid = false;
//           showError(controls, error);
//         }
        
//     });
// }