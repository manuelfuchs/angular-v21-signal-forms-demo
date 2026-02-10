import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { email, form, FormField, minLength, required, submit } from '@angular/forms/signals';

interface LoginData {
    email: string;
    password: string;
}

@Component({
    selector: 'app-login-example',
    imports: [FormField, JsonPipe],
    template: `
        <div class="mx-auto flex max-w-250 flex-col gap-3 px-5">
            <h1 class="mt-8 mb-4 text-2xl">Login Example</h1>

            <form class="flex flex-col gap-2">
                <div class="flex flex-col">
                    <label for="email">Email:</label>
                    <input id="email" type="email" class="rounded-sm border px-1" [formField]="loginForm.email" />

                    @if (loginForm.email().touched() && loginForm.email().invalid()) {
                        @for (error of loginForm.email().errors(); track error.kind) {
                            <span class="text-sm text-red-500">{{ error.message }}</span>
                        }
                    }
                </div>

                <div class="flex flex-col">
                    <label for="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        class="rounded-sm border px-1"
                        [formField]="loginForm.password"
                    />
                    <span class="text-sm text-gray-500"
                        >Password length: {{ loginForm.password().value().length }}</span
                    >

                    @if (loginForm.password().touched() && loginForm.password().invalid()) {
                        @for (error of loginForm.password().errors(); track error.kind) {
                            <span class="text-sm text-red-500">{{ error.message }}</span>
                        }
                    }
                </div>

                <button
                    type="submit"
                    class="rounded-sm bg-emerald-800 py-1 text-white disabled:opacity-70"
                    (click)="onSubmit($event)"
                    [disabled]="loginForm().invalid()"
                >
                    Submit
                </button>
            </form>

            <hr />

            <!-- Field states -->
            <div class="flex flex-col gap-2">
                <div class="flex flex-col">
                    <h2>Form state:</h2>

                    <span class="text-sm text-gray-700">Valid: {{ loginForm().valid() }}</span>
                    <span class="text-sm text-gray-700">Touched: {{ loginForm().touched() }}</span>
                    <span class="text-sm text-gray-700">Errors: {{ loginForm().errors() | json }}</span>
                </div>

                <div class="flex flex-col">
                    <h2>Email state</h2>

                    <span class="text-sm text-gray-700">Valid: {{ loginForm.email().valid() }}</span>
                    <span class="text-sm text-gray-700">Touched: {{ loginForm.email().touched() }}</span>
                    <span class="text-sm text-gray-700">Errors: {{ loginForm.email().errors() | json }}</span>
                </div>

                <div class="flex flex-col">
                    <h2>Password state</h2>

                    <span class="text-sm text-gray-700">Valid: {{ loginForm.password().valid() }}</span>
                    <span class="text-sm text-gray-700">Touched: {{ loginForm.password().touched() }}</span>
                    <span class="text-sm text-gray-700">Errors: {{ loginForm.password().errors() | json }}</span>
                </div>
            </div>
        </div>
    `,
})
export default class SignupExampleComponent {
    private readonly loginModel = signal<LoginData>({ email: '', password: '' });

    protected readonly loginForm = form(this.loginModel, (schemaPath) => {
        required(schemaPath.email, { message: 'Email is required' });
        email(schemaPath.email, { message: 'Email must be valid' });

        required(schemaPath.password, { message: 'Password is required' });
        minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters' });
    });

    protected async onSubmit(event: Event) {
        event.preventDefault();

        await submit(this.loginForm, async () => {
            const formData = this.loginModel();
            console.log('Submitting: ', formData);

            return {
                kind: 'special-chars',
                fieldTree: this.loginForm.password,
                message: 'Password misses special characteres',
            };
        });
    }
}
