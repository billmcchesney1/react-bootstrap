import PropTypes from 'prop-types';
import React from 'react';
import { useClassNameMapper } from './ThemeProvider';

import Image from './Image';

const propTypes = {
  /**
   * @default 'img'
   */
  bsPrefix: PropTypes.string,

  /**
   * ClassName mapping
   */
  classNameMap: PropTypes.object,

  /**
   * Sets image as fluid image.
   */
  fluid: PropTypes.bool,

  /**
   * Sets image shape as rounded.
   */
  rounded: PropTypes.bool,

  /**
   * Sets image shape as circle.
   */
  roundedCircle: PropTypes.bool,

  /**
   * Sets image shape as thumbnail.
   */
  thumbnail: PropTypes.bool,
};

const defaultProps = { fluid: true };

const FigureImage = React.forwardRef(
  ({ classNameMap, className, ...props }, ref) => (
    <Image
      ref={ref}
      {...props}
      className={useClassNameMapper(classNameMap)(className, 'figure-img')}
    />
  ),
);

FigureImage.displayName = 'FigureImage';
FigureImage.propTypes = propTypes;
FigureImage.defaultProps = defaultProps;

export default FigureImage;
