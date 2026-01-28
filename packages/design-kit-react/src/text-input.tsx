import * as React from 'react';
import { createComponent, EventName } from '@lit/react';
import {
  MonkTextInput as MonkTextInputWC,
  type InputSize,
  type InputVariant,
} from '@monkbunch/design-kit';

/**
 * Props for the TextInput component
 */
export interface TextInputProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Input size */
  size?: InputSize;
  /** Visual style variant */
  variant?: InputVariant;
  /** Input name (for forms) */
  name?: string;
  /** Input value */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Helper text (appears below input) */
  helperText?: string;
  /** Error message (appears below input, replaces helper text) */
  errorMessage?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is readonly */
  readonly?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input is invalid (shows error state) */
  invalid?: boolean;
  /** Autocomplete attribute */
  autocomplete?: string;
  /** Maximum length */
  maxlength?: number;
  /** Whether to show character count */
  showCount?: boolean;
  /** Hidden state */
  hidden?: boolean;
  /** Children content (for slots) */
  children?: React.ReactNode;
  /** Change handler (on input event) */
  onInputChange?: (event: CustomEvent<{ value: string; originalEvent: Event }>) => void;
  /** Changed handler (on change event) */
  onInputChanged?: (event: CustomEvent<{ value: string; originalEvent: Event }>) => void;
  /** Focus handler */
  onInputFocus?: (event: CustomEvent<{ originalEvent: FocusEvent }>) => void;
  /** Blur handler */
  onInputBlur?: (event: CustomEvent<{ originalEvent: FocusEvent }>) => void;
  /** Keydown handler */
  onInputKeydown?: (event: CustomEvent<{ key: string; originalEvent: KeyboardEvent }>) => void;
}

/**
 * TextInput component - Single-line text input field
 *
 * @example
 * ```tsx
 * // Basic text input
 * <TextInput label="Name" placeholder="Enter your name" />
 *
 * // With helper text
 * <TextInput
 *   label="Username"
 *   helperText="Choose a unique username"
 * />
 *
 * // With error
 * <TextInput
 *   label="Email"
 *   invalid
 *   errorMessage="This field is required"
 * />
 *
 * // With prefix/suffix
 * <TextInput label="Website">
 *   <span slot="prefix">https://</span>
 *   <span slot="suffix">.com</span>
 * </TextInput>
 *
 * // With character count
 * <TextInput
 *   label="Bio"
 *   maxlength={100}
 *   showCount
 * />
 *
 * // With change handler
 * <TextInput
 *   label="Search"
 *   onInputChange={(e) => console.log(e.detail.value)}
 * />
 * ```
 */
export const TextInput = createComponent({
  tagName: 'monk-text-input',
  elementClass: MonkTextInputWC,
  react: React,
  events: {
    onInputChange: 'input-change' as EventName<CustomEvent>,
    onInputChanged: 'input-changed' as EventName<CustomEvent>,
    onInputFocus: 'input-focus' as EventName<CustomEvent>,
    onInputBlur: 'input-blur' as EventName<CustomEvent>,
    onInputKeydown: 'input-keydown' as EventName<CustomEvent>,
  },
});

// Re-export types
export type { InputSize, InputVariant };
