import { expect, fixture, html } from '@open-wc/testing';
import { MonkDivider } from './divider.js';

describe('MonkDivider', () => {
  it('should be defined', () => {
    const element = document.createElement('monk-divider');
    expect(element).to.be.instanceOf(MonkDivider);
  });

  it('should render with default properties', async () => {
    const element = await fixture<MonkDivider>(html`<monk-divider></monk-divider>`);

    expect(element.orientation).to.equal('horizontal');
    expect(element.variant).to.equal('solid');
    expect(element.thickness).to.equal('medium');
    expect(element.label).to.be.undefined;
    expect(element.color).to.be.undefined;
  });

  describe('Orientation', () => {
    it('should render horizontal orientation', async () => {
      const element = await fixture<MonkDivider>(html`
        <monk-divider orientation="horizontal"></monk-divider>
      `);

      expect(element.orientation).to.equal('horizontal');
      expect(element.getAttribute('orientation')).to.equal('horizontal');

      const separator = element.shadowRoot?.querySelector('[role="separator"]');
      expect(separator?.getAttribute('aria-orientation')).to.equal('horizontal');
    });

    it('should render vertical orientation', async () => {
      const element = await fixture<MonkDivider>(html`
        <monk-divider orientation="vertical"></monk-divider>
      `);

      expect(element.orientation).to.equal('vertical');
      expect(element.getAttribute('orientation')).to.equal('vertical');

      const separator = element.shadowRoot?.querySelector('[role="separator"]');
      expect(separator?.getAttribute('aria-orientation')).to.equal('vertical');
    });
  });

  describe('Variant', () => {
    it('should render solid variant', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider variant="solid"></monk-divider>`);

      expect(element.variant).to.equal('solid');
      expect(element.getAttribute('variant')).to.equal('solid');
    });

    it('should render dashed variant', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider variant="dashed"></monk-divider>`);

      expect(element.variant).to.equal('dashed');
      expect(element.getAttribute('variant')).to.equal('dashed');
    });

    it('should render dotted variant', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider variant="dotted"></monk-divider>`);

      expect(element.variant).to.equal('dotted');
      expect(element.getAttribute('variant')).to.equal('dotted');
    });
  });

  describe('Thickness', () => {
    it('should render thin thickness', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider thickness="thin"></monk-divider>`);

      expect(element.thickness).to.equal('thin');
      expect(element.getAttribute('thickness')).to.equal('thin');
    });

    it('should render medium thickness', async () => {
      const element = await fixture<MonkDivider>(html`
        <monk-divider thickness="medium"></monk-divider>
      `);

      expect(element.thickness).to.equal('medium');
      expect(element.getAttribute('thickness')).to.equal('medium');
    });

    it('should render thick thickness', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider thickness="thick"></monk-divider>`);

      expect(element.thickness).to.equal('thick');
      expect(element.getAttribute('thickness')).to.equal('thick');
    });
  });

  describe('Label', () => {
    it('should render without label by default', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider></monk-divider>`);

      const label = element.shadowRoot?.querySelector('.label');
      expect(label).to.be.null;
    });

    it('should render with label', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider label="OR"></monk-divider>`);

      expect(element.label).to.equal('OR');
      expect(element.getAttribute('label')).to.equal('OR');

      const label = element.shadowRoot?.querySelector('.label');
      expect(label).to.exist;
      expect(label?.textContent).to.equal('OR');
    });

    it('should render two lines when label is present', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider label="OR"></monk-divider>`);

      const lines = element.shadowRoot?.querySelectorAll('.line');
      expect(lines).to.have.length(2);
    });

    it('should only show label on horizontal orientation', async () => {
      const element = await fixture<MonkDivider>(html`
        <monk-divider orientation="vertical" label="OR"></monk-divider>
      `);

      // Label property is set but should not render for vertical
      expect(element.label).to.equal('OR');

      // Should only render one line (no label shown)
      const lines = element.shadowRoot?.querySelectorAll('.line');
      expect(lines).to.have.length(1);
    });
  });

  describe('Custom Color', () => {
    it('should apply custom color via property', async () => {
      const element = await fixture<MonkDivider>(html`
        <monk-divider color="#ff6b6b"></monk-divider>
      `);

      expect(element.color).to.equal('#ff6b6b');
      expect(element.getAttribute('color')).to.equal('#ff6b6b');

      // Check that custom property is set
      const customProp = element.style.getPropertyValue('--divider-color');
      expect(customProp).to.equal('#ff6b6b');
    });

    it('should support RGB color values', async () => {
      const element = await fixture<MonkDivider>(html`
        <monk-divider color="rgb(255, 107, 107)"></monk-divider>
      `);

      expect(element.color).to.equal('rgb(255, 107, 107)');

      const customProp = element.style.getPropertyValue('--divider-color');
      expect(customProp).to.equal('rgb(255, 107, 107)');
    });
  });

  describe('CSS Parts', () => {
    it('should expose divider part', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider></monk-divider>`);

      const divider = element.shadowRoot?.querySelector('[part*="divider"]');
      expect(divider).to.exist;

      const partAttr = divider?.getAttribute('part');
      expect(partAttr).to.include('divider');
      expect(partAttr).to.include('horizontal');
      expect(partAttr).to.include('solid');
      expect(partAttr).to.include('medium');
    });

    it('should expose line part', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider></monk-divider>`);

      const line = element.shadowRoot?.querySelector('[part="line"]');
      expect(line).to.exist;
    });

    it('should expose label part when label is present', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider label="OR"></monk-divider>`);

      const label = element.shadowRoot?.querySelector('[part="label"]');
      expect(label).to.exist;
    });

    it('should include variant in part attribute', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider variant="dashed"></monk-divider>`);

      const divider = element.shadowRoot?.querySelector('[part*="dashed"]');
      expect(divider).to.exist;
    });
  });

  describe('Accessibility', () => {
    it('should have separator role', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider></monk-divider>`);

      const separator = element.shadowRoot?.querySelector('[role="separator"]');
      expect(separator).to.exist;
    });

    it('should have correct aria-orientation', async () => {
      const horizontal = await fixture<MonkDivider>(html`
        <monk-divider orientation="horizontal"></monk-divider>
      `);
      const vertical = await fixture<MonkDivider>(html`
        <monk-divider orientation="vertical"></monk-divider>
      `);

      const horizontalSeparator = horizontal.shadowRoot?.querySelector('[role="separator"]');
      const verticalSeparator = vertical.shadowRoot?.querySelector('[role="separator"]');

      expect(horizontalSeparator?.getAttribute('aria-orientation')).to.equal('horizontal');
      expect(verticalSeparator?.getAttribute('aria-orientation')).to.equal('vertical');
    });

    it('should not be focusable', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider></monk-divider>`);

      // Check that pointer-events: none is set via CSS
      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.pointerEvents).to.equal('none');
    });
  });

  describe('Property Updates', () => {
    it('should update when orientation changes', async () => {
      const element = await fixture<MonkDivider>(html`
        <monk-divider orientation="horizontal"></monk-divider>
      `);

      element.orientation = 'vertical';
      await element.updateComplete;

      expect(element.getAttribute('orientation')).to.equal('vertical');
      const separator = element.shadowRoot?.querySelector('[role="separator"]');
      expect(separator?.getAttribute('aria-orientation')).to.equal('vertical');
    });

    it('should update when variant changes', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider variant="solid"></monk-divider>`);

      element.variant = 'dashed';
      await element.updateComplete;

      expect(element.getAttribute('variant')).to.equal('dashed');
    });

    it('should update when label is added', async () => {
      const element = await fixture<MonkDivider>(html`<monk-divider></monk-divider>`);

      let lines = element.shadowRoot?.querySelectorAll('.line');
      expect(lines).to.have.length(1);

      element.label = 'OR';
      await element.updateComplete;

      lines = element.shadowRoot?.querySelectorAll('.line');
      expect(lines).to.have.length(2);

      const label = element.shadowRoot?.querySelector('.label');
      expect(label?.textContent).to.equal('OR');
    });
  });
});
