import * as React from 'react';
import { createComponent, EventName } from '@lit/react';
import { MonkEmailInput as MonkEmailInputWC } from '@monkbunch/design-kit';
import type { TextInputProps } from './text-input.js';

/**
 * EmailInput component - Email address input field with validation
 *
 * @example
 * ```tsx
 * <EmailInput label="Email" placeholder="you@example.com" />
 *
 * <EmailInput
 *   label="Email Address"
 *   required
 *   invalid
 *   errorMessage="Please enter a valid email"
 * />
 *
 * <EmailInput label="Email">
 *   <span slot="prefix">📧</span>
 * </EmailInput>
 * ```
 */
export const EmailInput = createComponent({
  tagName: 'monk-email-input',
  elementClass: MonkEmailInputWC,
  react: React,
  events: {
    onInputChange: 'input-change' as EventName<CustomEvent>,
    onInputChanged: 'input-changed' as EventName<CustomEvent>,
    onInputFocus: 'input-focus' as EventName<CustomEvent>,
    onInputBlur: 'input-blur' as EventName<CustomEvent>,
    onInputKeydown: 'input-keydown' as EventName<CustomEvent>,
  },
});

// EmailInput uses the same props as TextInput
export type EmailInputProps = TextInputProps;
