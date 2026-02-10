import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormField } from '@angular/forms/signals';

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
                    <input id="email" type="email" class="rounded-sm border px-1" />

                    <!-- Email form errors -->
                </div>

                <div class="flex flex-col">
                    <label for="password">Password:</label>
                    <input id="password" type="password" class="rounded-sm border px-1" />
                    <span class="text-sm text-gray-500">Password length: {{ -1 }}</span>

                    <!-- Password form errors -->
                </div>

                <button type="submit" class="rounded-sm bg-emerald-800 py-1 text-white disabled:opacity-70">
                    Submit
                </button>
            </form>

            <hr />

            <!-- Field states -->
        </div>
    `,
})
export default class SignupExampleComponent {}
