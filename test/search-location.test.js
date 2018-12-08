require('chromedriver');

import test from 'ava';

const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const width = 1024;
const height = 768;
const url = 'https://mayo.hngr.co/';
const location = 'Evanston, IL 60202';
const fullLocation = location + ', USA';

test.before(async t => {
  t.context.driver = await new Builder().forBrowser('chrome').setChromeOptions(
    new chrome.Options()
      .addArguments([ '--no-sandbox' ])
      .headless()
      .windowSize({width, height}))
      .build();
});

test('Search location by zip code', async t => {
  const { driver } = t.context;

  t.log('Opening url: ' + url + '...')
  await driver.get(url);
  t.log('Typing text: ' + '60202' + '...')
  await driver.findElement(By.className('location-search-input')).sendKeys('60202', Key.RETURN);
  t.log('Checking that dropdown element appeared')
  const itemEl = await driver.wait(until.elementLocated(By.xpath('//div[@class="autocomplete-dropdown-container"]//span[contains(text(),"' + location + '")]/..')), 1000);
  t.log('Clicking on dropdown element')
  await itemEl.click();
  t.log('Checking that dropdown element appeared in search input:')
  t.log(' 1. Finding search input')
  const el = await driver.findElement(By.xpath('//div[@class="autocompleteContainer"]//input'));

  t.log(' 2. Getting text from search input')
  const elText = await el.getAttribute('value');

  t.log(' 3. Checking that text in search input = expected location ' + location)
  t.is(elText, fullLocation);
});
