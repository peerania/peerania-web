import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { appLocales } from 'i18n';

import createdHistory from 'createdHistory';
import configureStore from 'configureStore';

import EosioProvider from 'containers/EosioProvider';
import { ChangeLocale } from '../index';
import { Li } from '../Styled';

jest.mock('react-intl', () => ({
  addLocaleData: jest.fn(),
  defineMessages: jest.fn().mockImplementation(() => ({})),
  FormattedMessage: jest.fn().mockImplementation(() => null),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

const localStorage = {
  setItem: jest.fn(),
};

// const setTimeout = jest.fn().mockImplementation(x => x());

// Object.defineProperty(global, 'setTimeout', { value: setTimeout });
Object.defineProperty(global, 'localStorage', { value: localStorage });

const props = {
  changeLocaleDispatch: jest.fn(),
  locale: 'en',
};

describe('ChangeLocale', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createdHistory);
  });

  /*const renderer = shallow(ChangeLocale(props));

  it('click test', () => {
    expect(props.changeLocaleDispatch).toHaveBeenCalledTimes(0);
    expect(global.localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(createdHistory.push).toHaveBeenCalledTimes(0);

    renderer
      .find(Li)
      .first()
      .simulate('click');

    expect(props.changeLocaleDispatch).toHaveBeenCalledWith(appLocales[0]);
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      'locale',
      appLocales[0],
    );
    expect(createdHistory.push).toHaveBeenCalledTimes(2);
  });*/

  it('renders and matches the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <EosioProvider>
          <ChangeLocale {...props} />
        </EosioProvider>
      </Provider>,
    );

    expect(firstChild).toMatchSnapshot();
  });
});
