/* eslint-disable react/no-multi-comp */
import PropTypes from 'prop-types';
import React from 'react';

import SafeAnchor from './SafeAnchor';
import { useClassNameMapper } from './ThemeProvider';

const propTypes = {
  /** Disables the PageItem */
  disabled: PropTypes.bool,

  /** Styles PageItem as active, and renders a `<span>` instead of an `<a>`. */
  active: PropTypes.bool,

  /** An accessible label indicating the active state.. */
  activeLabel: PropTypes.string,

  /**
   * ClassName mapping
   */
  classNameMap: PropTypes.object,
};

const defaultProps = {
  active: false,
  disabled: false,
  activeLabel: '(current)',
};

const PageItem = React.forwardRef(
  (
    {
      active,
      disabled,
      className,
      classNameMap,
      style,
      activeLabel,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = active || disabled ? 'span' : SafeAnchor;
    const classNames = useClassNameMapper(classNameMap);
    return (
      <li
        ref={ref}
        style={style}
        className={classNames(className, 'page-item', { active, disabled })}
      >
        <Component
          className={classNames('page-link')}
          disabled={disabled}
          {...props}
        >
          {children}
          {active && activeLabel && (
            <span className={classNames('sr-only')}>{activeLabel}</span>
          )}
        </Component>
      </li>
    );
  },
);

PageItem.propTypes = propTypes;
PageItem.defaultProps = defaultProps;
PageItem.displayName = 'PageItem';

export default PageItem;

function createButton(name, defaultValue, label = name) {
  const Button = ({ classNameMap, children, ...props }) => (
    <PageItem {...props}>
      <span aria-hidden="true">{children || defaultValue}</span>
      <span className={useClassNameMapper(classNameMap)('sr-only')}>
        {label}
      </span>
    </PageItem>
  );

  Button.displayName = name;
  Button.propTypes = {
    /**
     * ClassName mapping
     */
    classNameMap: PropTypes.object,
  };

  return Button;
}

export const First = createButton('First', '«');
export const Prev = createButton('Prev', '‹', 'Previous');
export const Ellipsis = createButton('Ellipsis', '…', 'More');
export const Next = createButton('Next', '›');
export const Last = createButton('Last', '»');
