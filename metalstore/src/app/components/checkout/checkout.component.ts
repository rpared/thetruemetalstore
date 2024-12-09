import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutDataService } from '../../services/checkout-data.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'

})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup | undefined;
  countries: string[] = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 
    'Germany', 'Ecuador', 'France', 'Japan', 'Brazil', 'India', 'Other'
  ];


  constructor(private fb: FormBuilder, private checkoutDataService: CheckoutDataService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.checkoutForm = this.fb.group({
      fullName: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      country: ['', Validators.required],
      state: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50)
      ]],
      city: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50)
      ]],
      address: ['', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(100)
      ]],
      zipCode: ['', [
        Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(10)
      ]]
    });
  }

  onSubmit(): void {
    if (this.checkoutForm?.valid) {
      this.checkoutDataService.setData(this.checkoutForm.value);
      this.router.navigate(['/payment']);
    } else {
      this.markFormGroupTouched(this.checkoutForm!);
    }
  }

  



  

  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Getter methods for easy access in template
  get fullName() { return this.checkoutForm!.get('fullName'); }
  get email() { return this.checkoutForm!.get('email'); }
  get country() { return this.checkoutForm!.get('country'); }
  get state() { return this.checkoutForm!.get('state'); }
  get city() { return this.checkoutForm!.get('city'); }
  get address() { return this.checkoutForm!.get('address'); }
  get zipCode() { return this.checkoutForm!.get('zipCode'); }
}