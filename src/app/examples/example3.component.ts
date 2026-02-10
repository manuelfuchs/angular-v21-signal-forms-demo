// import { JsonPipe } from '@angular/common';
// import { Component, effect, inject, signal } from '@angular/core';
// import {
//   debounce,
//   email,
//   form,
//   FormField,
//   max,
//   required,
//   validate,
//   ValidationResult,
// } from '@angular/forms/signals';
// import { DatePickerComponent } from '../shared/date-picker.component';
// import { FormControl, NonNullableFormBuilder } from '@angular/forms';
// import { compatForm } from '@angular/forms/signals/compat';

// interface LoginData {
//   email: string;
//   password: string;
//   dateOfBirth: Date | null;
// }

// @Component({
//   selector: 'app-example2',
//   imports: [JsonPipe, FormField, DatePickerComponent],
//   template: `
//     <div class="flex flex-col gap-7 max-w-250 mx-auto">
//       <h1 class="text-2xl">Field Tree and Validation</h1>

//       <form class="flex flex-col gap-2">
//         <div class="flex flex-col">
//           <label for="email">Email:</label>
//           <input id="email" type="email" class="border rounded-sm" [formField]="loginForm.email" />

//           @if (loginForm.email().touched() && loginForm.email().invalid()) {
//             <ul>
//               @for (error of loginForm.email().errors(); track error) {
//                 <li class=" text-sm text-red-500">{{ error.message ?? error.kind }}</li>
//               }
//             </ul>
//           }
//         </div>

//         <div class="flex flex-col">
//           <label for="password">Password:</label>
//           <input
//             id="password"
//             type="password"
//             class="border rounded-sm"
//             [formField]="loginForm.password"
//           />
//           <span class="text-gray-500 text-sm"
//             >Password length: {{ loginForm.password().value().length }}</span
//           >
//         </div>

//         <div class="flex flex-col">
//           <label for="dateOfBirth">Date of Birth:</label>
//           <app-date-picker id="dateOfBirth" [formField]="loginForm.dateOfBirth" />
//           @if (loginForm.dateOfBirth().touched() && loginForm.dateOfBirth().invalid()) {
//             <ul>
//               @for (error of loginForm.dateOfBirth().errors(); track error) {
//                 <li class=" text-sm text-red-500">{{ error.message ?? error.kind }}</li>
//               }
//             </ul>
//           }
//         </div>

//         <button
//           type="submit"
//           class="border rounded-sm text-white bg-black"
//           (click)="handleSubmit()"
//         >
//           Submit
//         </button>
//       </form>

//       <hr />

//       <div class="flex flex-col gap-2">
//         <button (click)="updateFormModel()" class="border rounded-sm text-white bg-black">
//           Update form model
//         </button>
//         <button (click)="updateForm()" class="border rounded-sm text-white bg-black">
//           Update form
//         </button>
//       </div>

//       <hr />

//       <div class="flex flex-col gap-1">
//         <h2 class="text-lg">Date of birth field state:</h2>
//         <span class="text-sm text-gray-700">Valid: {{ loginForm.dateOfBirth().valid() }}</span>
//         <span class="text-sm text-gray-700">Touched: {{ loginForm.dateOfBirth().touched() }}</span>
//         <span class="text-sm text-gray-700">Dirty: {{ loginForm.dateOfBirth().dirty() }}</span>
//         <span class="text-sm text-gray-700"
//           >Disabled: {{ loginForm.dateOfBirth().disabled() }}</span
//         >
//         <span class="text-sm text-gray-700"
//           >Errors: {{ loginForm.dateOfBirth().errors() | json }}</span
//         >
//       </div>
//     </div>
//   `,
// })
// export default class Example2Component {
//   private readonly fb = inject(NonNullableFormBuilder);

//   private readonly loginModel = signal<LoginData>({
//     email: '',
//     password: '',
//     dateOfBirth: null,
//   });

//   private ageThreshold = new Date(2000, 0, 0);
//   protected readonly loginForm = compatForm(this.loginModel, (schemaPath) => {
//     debounce(schemaPath.email, 500);
//     required(schemaPath.email, { message: 'Email is required' });
//     email(schemaPath.email, { message: 'Email is not valid' });

//     validate(schemaPath.dateOfBirth, ({ value }) => {
//       const dateValue = value();
//       if (dateValue !== null && dateValue > this.ageThreshold) {
//         return {
//           kind: 'tooYoung',
//           message: 'You are too young',
//         } satisfies ValidationResult;
//       }

//       return null;
//     });
//   });

//   constructor() {
//     effect(() => console.log(this.loginForm.password().value()));
//   }

//   protected handleSubmit(): void {
//     alert(JSON.stringify(this.loginModel()));
//   }

//   protected updateFormModel(): void {
//     this.loginModel.update((v) => ({ ...v, email: 'form-model-update@test.com' }));
//   }

//   protected updateForm(): void {
//     this.loginForm.email().value.set('form-update@test.com');
//   }
// }
