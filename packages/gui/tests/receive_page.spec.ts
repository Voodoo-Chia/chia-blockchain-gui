import { ElectronApplication, Page, _electron as electron } from 'playwright'
import { test, expect } from '@playwright/test';

let electronApp: ElectronApplication;
let page: Page;


test.beforeAll(async () => {
  electronApp = await electron.launch({ args: ['./build/electron/main.js'] });
  page = await electronApp.firstWindow();
  
});

test.afterAll(async () => {
  await electronApp.close();
});

test.only('Verify that new address creates new address', async () => {
  //const page = await electronApp.firstWindow();
  await page.locator('text=1054108904').click();
  expect(page).toHaveTitle('Chia Blockchain');

  // Click text=Receive
  await page.locator('text=Receive').click();
  // Click text=Receive Address
  await page.locator('text=Receive Address').click();
  
  //Grab the wallet id 
  const wallet_address = await page.locator('text=Receive Address New AddressAddress >> input[type="text"]').inputValue()
  console.log(wallet_address)

  //Click text=New Address
  await page.locator('text=New Address').click();

  //Grab the wallet id 
  const wallet_new = await page.locator('text=Receive Address New AddressAddress >> input[type="text"]').inputValue()
  console.log(wallet_new)

  expect(wallet_address == wallet_new)

});

test('Interact with the Receive Page of 1651231316 ID', async() => {

  // Click div[role="button"]:has-text("Private key with public fingerprint 1651231316Can be backed up to mnemonic seed")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'file:///Users/jahifaw/Documents/Code/Chia-testnet-playwright/chia-blockchain/chia-blockchain-gui/packages/gui/build/renderer/index.html#/dashboard/wallets/1' }*/),
    page.locator('div[role="button"]:has-text("Private key with public fingerprint 1651231316Can be backed up to mnemonic seed")').click()
  ]);

  // Click text=Receive
  await page.locator('text=Receive').click();

  // Click text=Actions
  await page.locator('text=Actions').click();

  // Click div[role="presentation"] div >> nth=0
  await page.locator('div[role="presentation"] div').first().click();

  // Click text=Receive Address New AddressAddress >> button >> nth=1
  await page.locator('text=Receive Address New AddressAddress >> button').nth(1).click();

})