import { Component } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-form',
  standalone: false,
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})

export class EmployeeFormComponent {
  EmployeeFormGroup:FormGroup|any;
  Employeelist:any[]=[];
constructor(private FormBuilder:FormBuilder,private toastr: ToastrService){
  this.EmployeeForm()
}
EmployeeForm(){
  this.EmployeeFormGroup=this.FormBuilder.group({
  txtemployee_name:[null,Validators.required],
  txtemployee_id:[null,Validators.required],
  txtdob:[null],
  txtemail_address:[null,Validators.required],
  txtdesignation:[null],
  txtdoa:[null],
  txtdoj:[null],
  txtproject:[null],
  txtyears:[null],
  txtaddress_type:[null],
  txtaddress_line1:[null],
  txtaddreaa_line2:[null],
  txtpostal_code:[null],
  txtdistrict:[null],
  txtstate:[null],
  txtcountry:[null]
  })
}
ngOnInit(){

}
editIndex: number | null = null; // track which item is being edited

// When user clicks Edit

EmployeeEdit(index: number) {
  this.editIndex = index;

  const emp = this.Employeelist[index];
  this.EmployeeFormGroup.patchValue({
    txtemployee_name: emp.employeename,
    txtemployee_id: emp.employeeid,
    txtdob: emp.dob,
    txtemail_address: emp.email_addreaa,
    txtdoj: emp.doj,
    txtdesignation: emp.designation,
    txtdoa: emp.doa,
    txtaddress_type: emp.address, // you may need to split if you stored full address string
    txtaddress_line1: '',
    txtaddreaa_line2: ''
  });
}
EmployeeAddOrUpdate() {
  const newEmployee = {
    employeename: this.EmployeeFormGroup.value.txtemployee_name,
    employeeid: this.EmployeeFormGroup.value.txtemployee_id,
    dob: this.EmployeeFormGroup.value.txtdob,
    email_addreaa: this.EmployeeFormGroup.value.txtemail_address,
    doj: this.EmployeeFormGroup.value.txtdoj,
    designation: this.EmployeeFormGroup.value.txtdesignation,
    doa: this.EmployeeFormGroup.value.txtdoa,
    address: (this.EmployeeFormGroup.value.txtaddress_type ?? "") +
             (this.EmployeeFormGroup.value.txtaddress_line1 ?? "") +
             (this.EmployeeFormGroup.value.txtaddreaa_line2 ?? "")
  };

  if (this.editIndex !== null) {
    // update existing employee
    this.Employeelist[this.editIndex] = newEmployee;
    this.editIndex = null;
  } else {
    // add new employee
    this.Employeelist = this.Employeelist || [];
    this.Employeelist.push(newEmployee);
  }
  this.EmployeeFormGroup.reset();
}

// Cancel edit
onCancel() {
  this.editIndex = null;
  this.EmployeeFormGroup.reset();
}
EmployeeAdd(){
  this.Employeelist=this.Employeelist||[]
  this.Employeelist.push({
    employeename:this.EmployeeFormGroup.value.txtemployee_name,
    employeeid:this.EmployeeFormGroup.value.txtemployee_id,
    dob:this.EmployeeFormGroup.value.txtdob,
    email_addreaa:this.EmployeeFormGroup.value.txtemail_address,
    doj:this.EmployeeFormGroup.value.txtdoj,
    designation:this.EmployeeFormGroup.value.txtdesignation,
    doa:this.EmployeeFormGroup.value.txtdoa,
    address:this.EmployeeFormGroup.value.txtaddress_type??"" + this.EmployeeFormGroup.value.txtaddress_line1??"" + this.EmployeeFormGroup.value.txtaddreaa_line2??""
  });
  this.EmployeeFormGroup.reset();
}
EmployeeDelete(index:any){
if(index>=0 && index<this.Employeelist.length){
  this.Employeelist.splice(index,1);
}
}
}
