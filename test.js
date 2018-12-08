require('chromedriver');

const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const width = 640;
const height = 480;
const url = 'https://mayo.hngr.co/';
const location = 'Evanston, IL 60202';

let driver;
async function before() {
  driver = await new Builder().forBrowser('chrome').setChromeOptions(
    new chrome.Options().headless().windowSize({width, height})).build();
}

async function test() {
  console.log('Opening url: ' + url + '...')
  await driver.get(url);
  console.log('Typing text: ' + '60202' + '...')
  await driver.findElement(By.className('location-search-input')).sendKeys('60202', Key.RETURN);
  console.log('Checking that dropdown element appeared')
  const itemEl = await driver.wait(until.elementLocated(By.xpath('//div[@class="autocomplete-dropdown-container"]//span[contains(text(),"' + location + '")]/..')), 1000);
  console.log('Clicking on dropdown element')
  await itemEl.click();
  console.log('Checking that dropdown element appeared in search input:')
  console.log(' 1. Finding search input')
  const el = await driver.findElement(By.xpath('//div[@class="autocompleteContainer"]//input'));
  console.log(' 2. Getting text from search input')
  const elText = el.getText();
  console.log(' 3. Checking that text in search input = expected location ' + location)
  console.log(elText === location);
}

before()
  .then(test)
  .catch(err => {
    console.error(err.stack);
  });
