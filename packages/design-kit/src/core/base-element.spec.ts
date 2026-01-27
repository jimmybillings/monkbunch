import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import { MonkBaseElement } from './base-element.js';

// Create a test element that extends MonkBaseElement
@customElement('test-base-element')
class TestBaseElement extends MonkBaseElement {
  // Expose protected methods for testing
  public testIsFocusable(element: HTMLElement): boolean {
    return this.isFocusable(element);
  }

  public testEmitEvent<T>(
    eventName: string,
    detail?: T,
    options?: Partial<CustomEventInit<T>>
  ): boolean {
    return this.emitEvent(eventName, detail, options);
  }
}

describe('MonkBaseElement', () => {
  describe('Hidden Property', () => {
    it('can be hidden', async () => {
      const el = await fixture<TestBaseElement>(html`
        <test-base-element hidden></test-base-element>
      `);
      expect(el.hidden).to.be.true;
      expect(el.hasAttribute('hidden')).to.be.true;
    });

    it('is visible by default', async () => {
      const el = await fixture<TestBaseElement>(html`
        <test-base-element></test-base-element>
      `);
      expect(el.hidden).to.be.false;
    });
  });

  describe('emitEvent Helper', () => {
    it('emits custom events with default options', async () => {
      const el = await fixture<TestBaseElement>(html`
        <test-base-element></test-base-element>
      `);

      let eventFired = false;
      let eventDetail: unknown = null;

      el.addEventListener('test-event', ((e: CustomEvent) => {
        eventFired = true;
        eventDetail = e.detail;
      }) as EventListener);

      const result = el.testEmitEvent('test-event', { foo: 'bar' });

      expect(result).to.be.true;
      expect(eventFired).to.be.true;
      expect(eventDetail).to.deep.equal({ foo: 'bar' });
    });

    it('emits events with custom options', async () => {
      const el = await fixture<TestBaseElement>(html`
        <test-base-element></test-base-element>
      `);

      let eventBubbled = false;
      let eventComposed = false;
      let eventCancelable = false;

      el.addEventListener('custom-event', ((e: CustomEvent) => {
        eventBubbled = e.bubbles;
        eventComposed = e.composed;
        eventCancelable = e.cancelable;
      }) as EventListener);

      el.testEmitEvent('custom-event', { test: true }, {
        bubbles: false,
        composed: false,
        cancelable: true,
      });

      expect(eventBubbled).to.be.false;
      expect(eventComposed).to.be.false;
      expect(eventCancelable).to.be.true;
    });

    it('emits events without detail', async () => {
      const el = await fixture<TestBaseElement>(html`
        <test-base-element></test-base-element>
      `);

      let eventFired = false;
      el.addEventListener('simple-event', () => {
        eventFired = true;
      });

      el.testEmitEvent('simple-event');
      expect(eventFired).to.be.true;
    });
  });

  describe('isFocusable Helper', () => {
    it('identifies disabled elements as not focusable', async () => {
      const el = await fixture<TestBaseElement>(html`
        <test-base-element></test-base-element>
      `);

      const button = document.createElement('button');
      button.setAttribute('disabled', '');

      expect(el.testIsFocusable(button)).to.be.false;
    });

    it('identifies elements with tabindex="-1" as not focusable', async () => {
      const el = await fixture<TestBaseElement>(html`
        <test-base-element></test-base-element>
      `);

      const div = document.createElement('div');
      div.setAttribute('tabindex', '-1');

      expect(el.testIsFocusable(div)).to.be.false;
    });

    it('identifies elements with explicit tabindex as focusable', async () => {
      const el = await fixture<TestBaseElement>(html`
        <test-base-element></test-base-element>
      `);

      const div = document.createElement('div');
      div.setAttribute('tabindex', '0');

      expect(el.testIsFocusable(div)).to.be.true;
    });

    it('identifies natively focusable button as focusable', async () => {
      const el = await fixture<TestBaseElement>(html`
        <test-base-element></test-base-element>
      `);

      const button = document.createElement('button');
      expect(el.testIsFocusable(button)).to.be.true;
    });

    it('identifies natively focusable input as focusable', async () => {
      const el = await fixture<TestBaseElement>(html`
        <test-base-element></test-base-element>
      `);

      const input = document.createElement('input');
      expect(el.testIsFocusable(input)).to.be.true;
    });

    it('identifies natively focusable anchor as focusable', async () => {
      const el = await fixture<TestBaseElement>(html`
        <test-base-element></test-base-element>
      `);

      const anchor = document.createElement('a');
      expect(el.testIsFocusable(anchor)).to.be.true;
    });

    it('identifies natively focusable select as focusable', async () => {
      const el = await fixture<TestBaseElement>(html`
        <test-base-element></test-base-element>
      `);

      const select = document.createElement('select');
      expect(el.testIsFocusable(select)).to.be.true;
    });

    it('identifies natively focusable textarea as focusable', async () => {
      const el = await fixture<TestBaseElement>(html`
        <test-base-element></test-base-element>
      `);

      const textarea = document.createElement('textarea');
      expect(el.testIsFocusable(textarea)).to.be.true;
    });

    it('identifies non-focusable div without tabindex as not focusable', async () => {
      const el = await fixture<TestBaseElement>(html`
        <test-base-element></test-base-element>
      `);

      const div = document.createElement('div');
      expect(el.testIsFocusable(div)).to.be.false;
    });
  });
});
