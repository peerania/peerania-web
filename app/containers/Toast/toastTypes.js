import successIcon from 'images/Ok.svg?inline';
import errorIcon from 'images/Error.svg?inline';

const toastTypes = {
  success: {
    color: '#23bc47',
    icon: successIcon,
  },
  info: {
    color: '#3a87ad',
  },
  warning: {
    color: '#c09853',
  },
  error: {
    color: '#f76f60',
    icon: errorIcon,
  },
};

export default toastTypes;
