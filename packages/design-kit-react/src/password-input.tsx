import * as React from 'react';
import { createComponent, EventName } from '@lit/react';
import { MonkPasswordInput as MonkPasswordInputWC } from '@monkbunch/design-kit';
import type { TextInputProps } from './text-input.js';

/**
 * Props for the PasswordInput component
 */
export interface PasswordInputProps extends TextInputProps {
  /** Whether to show the toggle button for show/hide password */
  showToggle?: boolean;
}

/**
 * PasswordInput component - Password field with show/hide toggle
 *
 * @example
 * ```tsx
 * <PasswordInput label="Password" />
 *
 * <PasswordInput
 *   label="Password"
 *   showToggle
 * />
 *
 * <PasswordInput
 *   label="New Password"
 *   required
 *   maxlength={128}
 *   showCount
 *   showToggle
 *   helperText="Must be at least 8 characters"
 * />
 * ```
 */
export const PasswordInput = createComponent({
  tagName: 'monk-password-input',
  elementClass: MonkPasswordInputWC,
  react: React,
  events: {
    onInputChange: 'input-change' as EventName<CustomEvent>,
    onInputChanged: 'input-changed' as EventName<CustomEvent>,
    onInputFocus: 'input-focus' as EventName<CustomEvent>,
    onInputBlur: 'input-blur' as EventName<CustomEvent>,
    onInputKeydown: 'input-keydown' as EventName<CustomEvent>,
  },
});
