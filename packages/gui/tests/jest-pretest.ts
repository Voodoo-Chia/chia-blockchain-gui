import { JSDOM } from 'jsdom';

//destructure window object from JSDOM
const { window } = new JSDOM(
  '<!DOCTYPE html><html><head></head><body></body></html>',
);

import jquery from 'jquery';

const $ = jquery(window as any, true);

global.window = window as any;
global.document = window.document;

// @ts-ignore
global.jQuery = $;
// @ts-ignore
global.$ = $;
