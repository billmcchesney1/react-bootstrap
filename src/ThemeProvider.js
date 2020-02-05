import PropTypes from 'prop-types';
import forwardRef from '@restart/context/forwardRef';
import React, { useContext, useMemo } from 'react';
import classNames from './createClassNames';

const ThemeContext = React.createContext({
  prefixes: {},
  classNameMap: {},
  createClassNameMapper: classMap => classNames(classMap, item => item),
});
const { Consumer, Provider } = ThemeContext;

function ThemeProvider({
  prefixes,
  classNameMap,
  classNameConverter,
  children,
}) {
  const copiedPrefixes = useMemo(() => ({ ...prefixes }), [prefixes]);
  const globalClassNameMap = useMemo(() => ({ ...classNameMap }), [
    classNameMap,
  ]);

  const createClassNameMapper = localClassNameMap =>
    classNames(
      {
        ...globalClassNameMap,
        ...localClassNameMap,
      },
      classNameConverter,
    );

  return (
    <Provider
      value={{
        prefixes: copiedPrefixes,
        classNameMap: globalClassNameMap,
        createClassNameMapper,
      }}
    >
      {children}
    </Provider>
  );
}

ThemeProvider.propTypes = {
  prefixes: PropTypes.object,
  /**
   * A map of class names. The key's of the map should be
   * the Bootstrap class names used by the react-bootstrap components.
   * The value of the map record should be class name that will
   * be provided to the className attribute.
   */
  classNameMap: PropTypes.object,
  /**
   * Allows for a callback converter to be called on each
   * class name before it is looked up in the `classNameMap`. This
   * is to allow support for environments where the css-loader is
   * set to convert the class names to `camelCaseOnly`.
   */
  classNameConverter: PropTypes.func,
};

export function useBootstrapPrefix(prefix, defaultPrefix) {
  const { prefixes } = useContext(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}

export function useClassNameMapper(localClassNameMap) {
  const { createClassNameMapper } = useContext(ThemeContext);
  return createClassNameMapper(localClassNameMap);
}

function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = { prefix: opts };
  const isClassy = Component.prototype && Component.prototype.isReactComponent;
  // If it's a functional component make sure we don't break it with a ref
  const { prefix, forwardRefAs = isClassy ? 'ref' : 'innerRef' } = opts;

  return forwardRef(
    ({ ...props }, ref) => {
      props[forwardRefAs] = ref;
      // eslint-disable-next-line react/prop-types
      const bsPrefix = useBootstrapPrefix(props.bsPrefix, prefix);
      const { classNameMap } = useContext(ThemeContext);
      return (
        <Component {...props} bsPrefix={bsPrefix} classNameMap={classNameMap} />
      );
    },
    { displayName: `Bootstrap(${Component.displayName || Component.name})` },
  );
}

export { createBootstrapComponent, Consumer as ThemeConsumer };
export default ThemeProvider;
