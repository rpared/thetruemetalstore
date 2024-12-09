import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlbumService } from '../../services/album.service';
import { IAlbum } from '../album-list/album-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutDataService } from '../../services/checkout-data.service';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  cartItems: IAlbum[] = [];
  total: number = 0;
  paymentForm!: FormGroup;
  checkoutData: any;
  subTotal: number= 0;
  hst: number= 0;

  // Payment method options
  paymentMethods = [
    'Credit Card', 
    'Debit Card', 
    'PayPal', 
    'Bank Transfer'
  ];
  

  constructor(
    private albumService: AlbumService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private checkoutDataService: CheckoutDataService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    console.log('Retrieved Cart Items:', this.cartItems);
    this.initializePaymentForm();
    // this.retrieveCheckoutData();
    this.checkoutData = this.checkoutDataService.getData();
    console.log('Retrieved Checkout Data:', this.checkoutData);
    this.calculateTotal();
    this.calculateSubtotal();
    this.calculateHST();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    console.log('Retrieved Cart Items 1:', this.cartItems);
  }

  getCartItems(): IAlbum[] {
    return this.cartItems;
  }

  calculateSubtotal(): void {
    this.subTotal = this.cartService.getCartTotal();
  }

  calculateHST(): void {
    this.hst = this.cartService.getHST(this.subTotal);
  }

  


  calculateTotal(): void {
    this.total = this.cartService.getTotal();
  }

  initializePaymentForm(): void {
    this.paymentForm = this.fb.group({
      paymentMethod: [{value: '', disabled: true}, Validators.required],
      cardNumber: [{value: '', disabled: true}, [
        Validators.required, 
        Validators.pattern('^[0-9]{16}$')
      ]],
      cardName: [{value: '', disabled: true}, [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      expiryDate: [{value: '', disabled: true}, [
        Validators.required,
        Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$')
      ]],
      cvv: [{value: '', disabled: true}, [
        Validators.required,
        Validators.pattern('^[0-9]{3,4}$')
      ]]
    });
  }

  // retrieveCheckoutData(): void {
  //   const navigation = this.router.getCurrentNavigation();
  //   if (navigation?.extras.state) {
  //     this.checkoutData = navigation.extras.state['formData'];
  //     if (!this.checkoutData) {
  //       console.warn('No formData found in navigation state.');
  //     } else {
  //       console.log('Checkout Data:', this.checkoutData);
  //     }
  //   } else {
  //     console.warn('No navigation state detected.');
  //   }
  // }

  onSubmit(): void {
    if (this.paymentForm && this.paymentForm.valid) {
      console.log('Payment form submitted', this.paymentForm.value);
      // In a real application, process payment here
    }
  }

  alertMessage(message: string): void {
    alert(message);
  }

  // Getters for easy access in template
  get paymentMethod() { return this.paymentForm!.get('paymentMethod'); }
  get cardNumber() { return this.paymentForm!.get('cardNumber'); }
  get cardName() { return this.paymentForm!.get('cardName'); }
  get expiryDate() { return this.paymentForm!.get('expiryDate'); }
  get cvv() { return this.paymentForm!.get('cvv'); }
}