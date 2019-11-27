import PropTypes from 'prop-types';
import React from 'react';
import { useClassNameMapper } from './ThemeProvider';

const propTypes = {
  /**
   * ClassName mapping
   */
  classNameMap: PropTypes.object,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const defaultProps = {
  label: 'Close',
};

const CloseButton = React.forwardRef(
  ({ classNameMap, label, onClick, className, ...props }, ref) => {
    const classNames = useClassNameMapper(classNameMap);
    return (
      <button
        ref={ref}
        type="button"
        className={classNames('close', className)}
        onClick={onClick}
        {...props}
      >
        <span aria-hidden="true">&times;</span>
        <span className={classNames('sr-only')}>{label}</span>
      </button>
    );
  },
);

CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;

export default CloseButton;
