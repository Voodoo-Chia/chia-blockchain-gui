import React from 'react';
import ReactDOM from 'react-dom';
import jsdom from 'jsdom';
import $ from 'jquery';

import Bla from './Bla';

describe('Bla', () => {
  it('should render', () => {
    const dom = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
    const container = dom.window.document.createElement('div');
    dom.window.document.body.appendChild(container);

    const bla = <Bla />;
    ReactDOM.render(bla, container);
    expect($(container).find('div').text()).toEqual('Blaaaaaaaa');
  });
});
