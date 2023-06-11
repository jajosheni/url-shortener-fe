import { describe, it, expect } from 'vitest';
import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import Shortener from '../Shortener.vue';

describe('Shortener', () => {
  it('renders properly', () => {
    const wrapper = mount(Shortener, { props: { msg: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Shorten');
  });

  it('updates the URL when input value changes', async () => {
    const wrapper = mount(Shortener);
    const input = wrapper.find('input');

    await input.setValue('https://example.com');
    expect(wrapper.vm.url).toBe('https://example.com');
  });

  it('updates the shortenedUrl when form is submitted', async () => {
    const wrapper = mount(Shortener);
    const input = wrapper.find('input');

    await input.setValue('https://example.com');

    // Mock fetch function to return a short URL
    global.fetch = async () => {
      return {
        json: async () => ({ shortUrl: 'http://short.url' }),
      };
    };

    await wrapper.find('form').trigger('submit');

    // Wait for promises to resolve
    await nextTick();

    expect(wrapper.vm.shortenedUrl).toBe('http://short.url');
  });

  it('copies the shortenedUrl to clipboard when copy button is clicked', async () => {
    const clipboardData = ref('');

    // Mock writeText function
    global.navigator.clipboard = {
      writeText: async (text) => {
        clipboardData.value = text;
      },
    };

    const wrapper = mount(Shortener);
    const input = wrapper.find('input');
    const shortenedUrl = 'http://short.url';

    await input.setValue('https://example.com');

    // Mock fetch function to return a short URL
    global.fetch = async () => {
      return {
        json: async () => ({ shortUrl: 'http://short.url' }),
      };
    };

    await wrapper.find('form').trigger('submit');

    // Wait for promises to resolve
    await nextTick();

    await wrapper.find('.copy-button').trigger('click');

    expect(clipboardData.value).toBe(shortenedUrl);
  });
});
