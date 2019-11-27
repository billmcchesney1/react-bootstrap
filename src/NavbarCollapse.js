import React from 'react';
import PropTypes from 'prop-types';

import Collapse from './Collapse';
import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import NavbarContext from './NavbarContext';

const propTypes = {
  /** @default 'navbar-collapse' */
  bsPrefix: PropTypes.string,

  /**
   * ClassName mapping
   */
  classNameMap: PropTypes.object,
};

const NavbarCollapse = React.forwardRef(
  ({ children, bsPrefix, classNameMap, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-collapse');
    const classNames = useClassNameMapper(classNameMap);
    return (
      <NavbarContext.Consumer>
        {context => (
          <Collapse in={!!(context && context.expanded)} {...props}>
            <div ref={ref} className={classNames(bsPrefix)}>
              {children}
            </div>
          </Collapse>
        )}
      </NavbarContext.Consumer>
    );
  },
);

NavbarCollapse.displayName = 'NavbarCollapse';
NavbarCollapse.propTypes = propTypes;

export default NavbarCollapse;
