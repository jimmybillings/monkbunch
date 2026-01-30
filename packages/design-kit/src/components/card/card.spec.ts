import { expect, fixture, html } from '@open-wc/testing';
import { MonkCard } from './card.js';

describe('MonkCard', () => {
  it('should be defined', () => {
    const element = document.createElement('monk-card');
    expect(element).to.be.instanceOf(MonkCard);
  });

  it('should render with default properties', async () => {
    const element = await fixture<MonkCard>(html`<monk-card></monk-card>`);

    expect(element.variant).to.equal('elevated');
    expect(element.interactive).to.be.false;
    expect(element.radius).to.equal('md');
    expect(element.padding).to.be.undefined;
    expect(element.shadow).to.be.undefined;
    expect(element.bg).to.be.undefined;
  });

  describe('Variants', () => {
    it('should render elevated variant', async () => {
      const element = await fixture<MonkCard>(html`<monk-card variant="elevated"></monk-card>`);

      expect(element.variant).to.equal('elevated');
      expect(element.getAttribute('variant')).to.equal('elevated');
    });

    it('should render outline variant', async () => {
      const element = await fixture<MonkCard>(html`<monk-card variant="outline"></monk-card>`);

      expect(element.variant).to.equal('outline');
      expect(element.getAttribute('variant')).to.equal('outline');
    });

    it('should render filled variant', async () => {
      const element = await fixture<MonkCard>(html`<monk-card variant="filled"></monk-card>`);

      expect(element.variant).to.equal('filled');
      expect(element.getAttribute('variant')).to.equal('filled');
    });
  });

  describe('Interactive', () => {
    it('should render non-interactive by default', async () => {
      const element = await fixture<MonkCard>(html`<monk-card></monk-card>`);

      expect(element.interactive).to.be.false;
      expect(element.hasAttribute('interactive')).to.be.false;

      const card = element.shadowRoot?.querySelector('.card');
      expect(card?.getAttribute('role')).to.equal('article');
      expect(card?.hasAttribute('tabindex')).to.be.false;
    });

    it('should render interactive card', async () => {
      const element = await fixture<MonkCard>(html`<monk-card interactive></monk-card>`);

      expect(element.interactive).to.be.true;
      expect(element.hasAttribute('interactive')).to.be.true;

      const card = element.shadowRoot?.querySelector('.card');
      expect(card?.getAttribute('role')).to.equal('button');
      expect(card?.getAttribute('tabindex')).to.equal('0');
    });

    it('should emit card-click event on click', async () => {
      const element = await fixture<MonkCard>(html`<monk-card interactive></monk-card>`);

      let clicked = false;
      element.addEventListener('card-click', () => {
        clicked = true;
      });

      const card = element.shadowRoot?.querySelector('.card') as HTMLElement;
      card?.click();

      expect(clicked).to.be.true;
    });

    it('should emit card-click event on Enter key', async () => {
      const element = await fixture<MonkCard>(html`<monk-card interactive></monk-card>`);

      let clicked = false;
      element.addEventListener('card-click', () => {
        clicked = true;
      });

      const card = element.shadowRoot?.querySelector('.card') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      card?.dispatchEvent(event);

      expect(clicked).to.be.true;
    });

    it('should emit card-click event on Space key', async () => {
      const element = await fixture<MonkCard>(html`<monk-card interactive></monk-card>`);

      let clicked = false;
      element.addEventListener('card-click', () => {
        clicked = true;
      });

      const card = element.shadowRoot?.querySelector('.card') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: ' ' });
      card?.dispatchEvent(event);

      expect(clicked).to.be.true;
    });

    it('should not emit card-click when not interactive', async () => {
      const element = await fixture<MonkCard>(html`<monk-card></monk-card>`);

      let clicked = false;
      element.addEventListener('card-click', () => {
        clicked = true;
      });

      const card = element.shadowRoot?.querySelector('.card') as HTMLElement;
      card?.click();

      expect(clicked).to.be.false;
    });
  });

  describe('Padding', () => {
    it('should apply custom padding', async () => {
      const element = await fixture<MonkCard>(html`<monk-card padding="4"></monk-card>`);

      expect(element.padding).to.equal('4');
      expect(element.getAttribute('padding')).to.equal('4');
    });

    it('should support padding scale values', async () => {
      const values = ['0', '2', '4', '6', '8', '10', '12', '16'];

      for (const value of values) {
        const element = await fixture<MonkCard>(
          html`<monk-card padding="${value}"></monk-card>`
        );
        expect(element.padding).to.equal(value);
      }
    });
  });

  describe('Radius', () => {
    it('should apply border radius', async () => {
      const element = await fixture<MonkCard>(html`<monk-card radius="lg"></monk-card>`);

      expect(element.radius).to.equal('lg');
      expect(element.getAttribute('radius')).to.equal('lg');
    });

    it('should support radius scale values', async () => {
      const values = ['none', 'sm', 'md', 'lg', 'xl'];

      for (const value of values) {
        const element = await fixture<MonkCard>(html`<monk-card radius="${value}"></monk-card>`);
        expect(element.radius).to.equal(value);
      }
    });
  });

  describe('Shadow', () => {
    it('should apply custom shadow', async () => {
      const element = await fixture<MonkCard>(html`<monk-card shadow="lg"></monk-card>`);

      expect(element.shadow).to.equal('lg');
      expect(element.getAttribute('shadow')).to.equal('lg');
    });

    it('should support shadow scale values', async () => {
      const values = ['none', 'sm', 'md', 'lg', 'xl', '2xl'];

      for (const value of values) {
        const element = await fixture<MonkCard>(html`<monk-card shadow="${value}"></monk-card>`);
        expect(element.shadow).to.equal(value);
      }
    });
  });

  describe('Custom Background', () => {
    it('should apply custom background color', async () => {
      const element = await fixture<MonkCard>(html`<monk-card bg="#ff6b6b"></monk-card>`);

      expect(element.bg).to.equal('#ff6b6b');
      expect(element.getAttribute('bg')).to.equal('#ff6b6b');

      const card = element.shadowRoot?.querySelector('.card') as HTMLElement;
      // Browsers normalize hex colors to RGB format
      expect(card.style.background).to.equal('rgb(255, 107, 107)');
    });

    it('should support RGB color values', async () => {
      const element = await fixture<MonkCard>(html`
        <monk-card bg="rgb(255, 107, 107)"></monk-card>
      `);

      expect(element.bg).to.equal('rgb(255, 107, 107)');

      const card = element.shadowRoot?.querySelector('.card') as HTMLElement;
      expect(card.style.background).to.equal('rgb(255, 107, 107)');
    });
  });

  describe('CSS Parts', () => {
    it('should expose card part', async () => {
      const element = await fixture<MonkCard>(html`<monk-card></monk-card>`);

      const card = element.shadowRoot?.querySelector('[part*="card"]');
      expect(card).to.exist;

      const partAttr = card?.getAttribute('part');
      expect(partAttr).to.include('card');
      expect(partAttr).to.include('elevated');
    });

    it('should include variant in part attribute', async () => {
      const outline = await fixture<MonkCard>(html`<monk-card variant="outline"></monk-card>`);
      const filled = await fixture<MonkCard>(html`<monk-card variant="filled"></monk-card>`);

      const outlineCard = outline.shadowRoot?.querySelector('[part*="outline"]');
      const filledCard = filled.shadowRoot?.querySelector('[part*="filled"]');

      expect(outlineCard).to.exist;
      expect(filledCard).to.exist;
    });

    it('should include interactive in part when interactive', async () => {
      const element = await fixture<MonkCard>(html`<monk-card interactive></monk-card>`);

      const card = element.shadowRoot?.querySelector('[part*="interactive"]');
      expect(card).to.exist;
    });
  });

  describe('Accessibility', () => {
    it('should have article role when not interactive', async () => {
      const element = await fixture<MonkCard>(html`<monk-card></monk-card>`);

      const card = element.shadowRoot?.querySelector('[role="article"]');
      expect(card).to.exist;
    });

    it('should have button role when interactive', async () => {
      const element = await fixture<MonkCard>(html`<monk-card interactive></monk-card>`);

      const card = element.shadowRoot?.querySelector('[role="button"]');
      expect(card).to.exist;
    });

    it('should be focusable when interactive', async () => {
      const element = await fixture<MonkCard>(html`<monk-card interactive></monk-card>`);

      const card = element.shadowRoot?.querySelector('.card');
      expect(card?.getAttribute('tabindex')).to.equal('0');
    });

    it('should not be focusable when not interactive', async () => {
      const element = await fixture<MonkCard>(html`<monk-card></monk-card>`);

      const card = element.shadowRoot?.querySelector('.card');
      expect(card?.hasAttribute('tabindex')).to.be.false;
    });
  });

  describe('Content Slotting', () => {
    it('should render slotted content', async () => {
      const element = await fixture<MonkCard>(html`
        <monk-card>
          <h3>Card Title</h3>
          <p>Card content</p>
        </monk-card>
      `);

      const heading = element.querySelector('h3');
      const paragraph = element.querySelector('p');

      expect(heading?.textContent).to.equal('Card Title');
      expect(paragraph?.textContent).to.equal('Card content');
    });
  });

  describe('Property Updates', () => {
    it('should update when variant changes', async () => {
      const element = await fixture<MonkCard>(html`<monk-card variant="elevated"></monk-card>`);

      element.variant = 'outline';
      await element.updateComplete;

      expect(element.getAttribute('variant')).to.equal('outline');
    });

    it('should update when interactive changes', async () => {
      const element = await fixture<MonkCard>(html`<monk-card></monk-card>`);

      element.interactive = true;
      await element.updateComplete;

      expect(element.hasAttribute('interactive')).to.be.true;

      const card = element.shadowRoot?.querySelector('.card');
      expect(card?.getAttribute('role')).to.equal('button');
      expect(card?.getAttribute('tabindex')).to.equal('0');
    });

    it('should update when padding changes', async () => {
      const element = await fixture<MonkCard>(html`<monk-card></monk-card>`);

      element.padding = '8';
      await element.updateComplete;

      expect(element.getAttribute('padding')).to.equal('8');
    });

    it('should update when radius changes', async () => {
      const element = await fixture<MonkCard>(html`<monk-card radius="md"></monk-card>`);

      element.radius = 'lg';
      await element.updateComplete;

      expect(element.getAttribute('radius')).to.equal('lg');
    });
  });
});
