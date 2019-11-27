import React from 'react';
import { useClassNameMapper } from './ThemeProvider';

export default className =>
  React.forwardRef((p, ref) => {
    const classNames = useClassNameMapper(p.classNameMap);
    return (
      <div {...p} ref={ref} className={classNames(p.className, className)} />
    );
  });
