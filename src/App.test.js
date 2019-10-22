import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import puppeteer from 'puppeteer';
import { store } from './_helpers';
import { Provider } from 'react-redux';

import './App.css';
import './react-calendar-heatmap.css';

let browser
let page

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});


describe('puppeteer - renders heatmap without crashing', () => {
  test(
    'we view the heatmap h1 header',
    async () => {
      browser = await puppeteer.launch({
        headless: true,
      });
      page = await browser.newPage();

      await page.goto('http://localhost:3000');
      await page.waitForSelector('.react-calendar-heatmap');

      const header = await page.$eval('h1', e => e.innerHTML);
      expect(header).toEqual('Heatmap');

      browser.close();
    },
    16000
  );
});
