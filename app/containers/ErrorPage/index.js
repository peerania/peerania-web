/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import commonMessages from 'common-messages';
import * as routes from 'routes-config';
import { LINK_COLOR } from 'style-constants';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import errorImage from 'images/oops.svg?inline';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import notFoundPageMessages from 'containers/NotFoundPage/messages';
import { Box } from 'containers/NotFoundPage';

import A, { ADefault } from 'components/A';
import P from 'components/P';
import Seo from 'components/Seo';
import Span from 'components/Span';

import errorPageMessages from './messages';

const single = isSingleCommunityWebsite();

const NotFound = ({ locale, withSeo = true }) => (
  <React.Fragment>
    {withSeo && (
      <Seo
        title={translationMessages[locale][errorPageMessages.title.id]}
        description={
          translationMessages[locale][errorPageMessages.description.id]
        }
        language={locale}
        index={false}
      />
    )}

    <Box>
      <div>
        <Span fontSize="24" bold>
          <FormattedMessage {...errorPageMessages.weAreSorry} />
        </Span>
      </div>

      <div>
        <img src={errorImage} alt="404 page" />
      </div>

      <div>
        <P className="text-center mb-1">
          <FormattedMessage
            id={notFoundPageMessages.tryToBrowse.id}
            values={{
              value: (
                <A className="text-lowercase" to={routes.questions()}>
                  <Span color={LINK_COLOR}>
                    <FormattedMessage {...commonMessages.questions} />
                  </Span>
                </A>
              ),
            }}
          />
        </P>
        <P className="text-center mb-1">
          <FormattedMessage
            id={notFoundPageMessages.browseOurPopular.id}
            values={{
              value: (
                <ADefault
                  href={`${
                    single ? process.env.APP_LOCATION : ''
                  }${routes.communities()}`}
                  className="text-lowercase"
                >
                  <Span color={LINK_COLOR}>
                    <FormattedMessage {...commonMessages.communities} />
                  </Span>
                </ADefault>
              ),
            }}
          />
        </P>
        <P className="text-center mb-1">
          <FormattedMessage
            id={notFoundPageMessages.ifYouFeelSomething.id}
            values={{
              value: (
                <A className="text-lowercase" to={routes.support()}>
                  <Span color={LINK_COLOR}>
                    <FormattedMessage {...commonMessages.contactUs} />
                  </Span>
                </A>
              ),
            }}
          />
        </P>
      </div>
    </Box>
  </React.Fragment>
);

NotFound.propTypes = {
  locale: PropTypes.string,
  withSeo: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export default connect(
  mapStateToProps,
  null,
)(NotFound);
