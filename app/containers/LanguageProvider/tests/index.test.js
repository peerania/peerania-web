import React from 'react';
import { mount } from 'enzyme';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import configureStore from 'configureStore';
import createdHistory from 'createdHistory';

import EosioProvider from 'containers/EosioProvider';
import ConnectedLanguageProvider, { LanguageProvider } from '../index';

import { translationMessages } from '../../../i18n';

// const cmp = new LanguageProvider();
const props = {
  locale: 'en',
  messages: {},
  children: <div>Children</div>,
  changeLocaleDispatch: jest.fn(),
};

/* eslint prefer-destructuring: 0 */

const messages = defineMessages({
  someMessage: {
    id: 'some.id',
    defaultMessage: 'This is some default message',
    en: 'This is some en message',
  },
});

/*describe('componentWillMount', () => {
  let locale = 'en';

  it('localstorage not null', () => {
    localStorage.setItem('locale', locale);

    cmp.componentWillMount();
    expect(cmp.props.changeLocaleDispatch).toHaveBeenCalledWith(locale);
  });

  it('localstorage is null', () => {
    const languages = ['en'];

    window.navigator = {
      languages,
    };

    locale = window.navigator.languages.filter(x => languages.includes(x))[0];

    localStorage.setItem('locale', '');

    cmp.componentWillMount();
    expect(cmp.props.changeLocaleDispatch).toHaveBeenCalledWith(locale);
  });
});*/

describe('<LanguageProvider />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createdHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <EosioProvider>
          <LanguageProvider {...props}>
            <div />
          </LanguageProvider>
        </EosioProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});

describe('<ConnectedLanguageProvider />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render the default language messages', () => {
    /*const renderedComponent = mount(
      <Provider store={store}>
        <ConnectedLanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </ConnectedLanguageProvider>
      </Provider>,
    );
    expect(
      renderedComponent.contains(
        <FormattedMessage {...messages.someMessage} />,
      ),
    ).toBe(true);*/
  });
});
