const express =require ('express');
const {AddEmployees,countByAge,countByAgeGreaterThan,getEmployeeSortedByName}=require ('../Controllers/employeeController')

const employeeRouter=express.Router();


employeeRouter.post('/',AddEmployees);

employeeRouter.get('/countByAge',countByAge);
employeeRouter.get('/countByAgeGreaterThan/:age',countByAgeGreaterThan);
employeeRouter.get('/getEmployeesSortedByName',getEmployeeSortedByName)





module.exports= employeeRouter