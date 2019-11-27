import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import BreadcrumbItem from './BreadcrumbItem';

const propTypes = {
  /**
   * @default 'breadcrumb'
   */
  bsPrefix: PropTypes.string,
  /**
   * ClassName mapping
   */
  classNameMap: PropTypes.object,
  /**
   * ARIA label for the nav element
   * https://www.w3.org/TR/wai-aria-practices/#breadcrumb
   */
  label: PropTypes.string,
  /**
   * Additional props passed as-is to the underlying `<ul>` element
   */
  listProps: PropTypes.object,

  as: PropTypes.elementType,
};

const defaultProps = {
  label: 'breadcrumb',
  listProps: {},
};

const Breadcrumb = React.forwardRef(
  (
    {
      bsPrefix,
      className,
      classNameMap,
      listProps,
      children,
      label,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'nav',
      ...props
    },
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb');
    const classNames = useClassNameMapper(classNameMap);

    return (
      <Component
        aria-label={label}
        className={classNames(className)}
        ref={ref}
        {...props}
      >
        <ol {...listProps} className={classNames(prefix, listProps.className)}>
          {children}
        </ol>
      </Component>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
