import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface DepartmentRecord {
  department: string;
  percentage: number;
  admissionType: 'Management' | 'Counselling';
}

@Component({
  selector: 'app-college-form',
  standalone: false,
  templateUrl: './college-form.component.html',
  styleUrl: './college-form.component.scss'
})
export class CollegeFormComponent {
  collegeForm: FormGroup;
  departmentForm: FormGroup;

  departmentsList: DepartmentRecord[] = [];

  // Student pools
  totalStudents = 0;
  counsellingStudents = 0;
  managementStudents = 0;

  // Percentages left to deduct
  remainingManagementPercentage = 100;
  remainingCounsellingPercentage = 100;

  saveEnabled = false;

  departmentOptions = ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Maths'];

  constructor(private fb: FormBuilder) {
    // Overall college form
    this.collegeForm = this.fb.group({
      collegeName: ['', Validators.required],
      location: ['', Validators.required],
      totalStudents: [0, [Validators.required, Validators.min(1)]],
      counsellingStudents: [0, [Validators.required, Validators.min(0)]]
    });

    // Department entry form
    this.departmentForm = this.fb.group({
      department: ['', Validators.required],
      percentage: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      admissionType: ['Management', Validators.required]
    });
  }

  ngOnInit(): void {
    // Watch totalStudents and counsellingStudents to calculate managementStudents
    this.collegeForm.valueChanges.subscribe(value => {
      this.totalStudents = +value.totalStudents || 0;
      this.counsellingStudents = +value.counsellingStudents || 0;
      this.managementStudents = this.totalStudents - this.counsellingStudents;

      // Reset remaining percentages on base data change
      this.remainingManagementPercentage = 100;
      this.remainingCounsellingPercentage = 100;
      this.departmentsList = [];
      this.saveEnabled = false;
    });
  }

  addDepartment() {
    if (this.departmentForm.invalid) return;

    const { department, percentage, admissionType } = this.departmentForm.value;

    // Check if deduction is possible
    if (admissionType === 'Management' && percentage > this.remainingManagementPercentage) {
      alert('Percentage exceeds remaining management percentage.');
      return;
    }
    if (admissionType === 'Counselling' && percentage > this.remainingCounsellingPercentage) {
      alert('Percentage exceeds remaining counselling percentage.');
      return;
    }

    // Deduct percentage
    if (admissionType === 'Management') {
      this.remainingManagementPercentage -= percentage;
    } else {
      this.remainingCounsellingPercentage -= percentage;
    }

    // Add to list
    this.departmentsList.push({ department, percentage, admissionType });

    // Reset department form for next entry
    this.departmentForm.reset({
      department: '',
      percentage: 0,
      admissionType: 'Management'
    });

    // Enable save only when both deductions have reached zero or below (allow minor floating point tolerance)
    if (this.remainingManagementPercentage <= 0 && this.remainingCounsellingPercentage <= 0) {
      this.remainingManagementPercentage = 0; // avoid negative display
      this.remainingCounsellingPercentage = 0;
      this.saveEnabled = true;
    }
  }

  deleteDepartment(index: number) {
    const record = this.departmentsList[index];
    // Restore percentage
    if (record.admissionType === 'Management') {
      this.remainingManagementPercentage += record.percentage;
    } else {
      this.remainingCounsellingPercentage += record.percentage;
    }
    this.departmentsList.splice(index, 1);
    this.saveEnabled = false;
  }

  editDepartment(index: number) {
    const record = this.departmentsList[index];
    // Restore percentage before editing
    if (record.admissionType === 'Management') {
      this.remainingManagementPercentage += record.percentage;
    } else {
      this.remainingCounsellingPercentage += record.percentage;
    }
    // Set form with editable values
    this.departmentForm.setValue({
      department: record.department,
      percentage: record.percentage,
      admissionType: record.admissionType
    });
    // Remove from list for update
    this.departmentsList.splice(index, 1);
    this.saveEnabled = false;
  }

  saveForm() {
    if (!this.saveEnabled) {
      alert('Please complete percentage deductions first.');
      return;
    }
    if (this.collegeForm.invalid) {
      alert('Please fill all mandatory college form fields.');
      return;
    }
    if (this.departmentsList.length === 0) {
      alert('Add department records before saving.');
      return;
    }

    const finalData = {
      collegeInfo: this.collegeForm.value,
      departments: this.departmentsList
    };

    console.log('Final Form Data:', finalData);
    alert('Form submitted successfully!');

    // Reset everything
    this.collegeForm.reset();
    this.departmentForm.reset({ admissionType: 'Management' });
    this.departmentsList = [];
    this.saveEnabled = false;
    this.remainingManagementPercentage = 100;
    this.remainingCounsellingPercentage = 100;
  }
}
