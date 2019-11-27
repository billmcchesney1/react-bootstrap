import PropTypes from 'prop-types';
import React from 'react';

import createWithBsPrefix from './createWithBsPrefix';
import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'media'
   */
  bsPrefix: PropTypes.string,

  /**
   * ClassName mapping
   */
  classNameMap: PropTypes.object,

  as: PropTypes.elementType,
};

const Media = React.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  (
    { bsPrefix, className, classNameMap, as: Component = 'div', ...props },
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'media');
    const classNames = useClassNameMapper(classNameMap);

    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(className, prefix)}
      />
    );
  },
);

Media.displayName = 'Media';
Media.propTypes = propTypes;

Media.Body = createWithBsPrefix('media-body');

export default Media;
