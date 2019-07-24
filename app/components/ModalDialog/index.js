/**
 *
 * ModalDialog
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ModalStyled from './ModalStyled';
import Blanket from './Blanket';

const modalRoot = document.getElementById('modal');

export class ModalDialog extends React.PureComponent {
  componentWillMount() /* istanbul ignore next */ {
    this.el = document.createElement('div');
  }

  /* eslint no-unused-expressions: 0 */
  componentWillReceiveProps(nextProps) /* istanbul ignore next */ {
    if (nextProps.show !== this.props.show) {
      try {
        nextProps.show
          ? modalRoot.appendChild(this.el)
          : modalRoot.removeChild(this.el);
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() /* istanbul ignore next */ {
    const { closeModal, children } = this.props;

    return ReactDOM.createPortal(
      <React.Fragment>
        <ModalStyled>{children}</ModalStyled>
        <Blanket onClick={closeModal} />
      </React.Fragment>,
      this.el,
    );
  }
}

ModalDialog.propTypes = {
  show: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.any,
};

export default React.memo(ModalDialog);
