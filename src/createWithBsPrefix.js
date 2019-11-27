import camelize from 'dom-helpers/camelize';
import React from 'react';
import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';

const pascalCase = str => str[0].toUpperCase() + camelize(str).slice(1);

export default function createWithBsPrefix(
  prefix,
  { displayName = pascalCase(prefix), Component = 'div', defaultProps } = {},
) {
  const BsComponent = React.forwardRef(
    (
      // eslint-disable-next-line react/prop-types
      { className, bsPrefix, classNameMap, as: Tag = Component, ...props },
      ref,
    ) => {
      const resolvedPrefix = useBootstrapPrefix(bsPrefix, prefix);
      const classNames = useClassNameMapper(classNameMap);
      return (
        <Tag
          ref={ref}
          className={classNames(className, resolvedPrefix)}
          {...props}
        />
      );
    },
  );
  BsComponent.defaultProps = defaultProps;
  BsComponent.displayName = displayName;
  return BsComponent;
}
