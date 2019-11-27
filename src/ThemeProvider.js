import PropTypes from 'prop-types';
import forwardRef from '@restart/context/forwardRef';
import React, { useContext, useMemo } from 'react';
import classNames from 'classnames/bind';

function buildClassNameMapper(globalClassNameMap, localClassNameMap) {
  return classNames.bind({
    ...globalClassNameMap,
    ...localClassNameMap,
  });
}

const ThemeContext = React.createContext({
  prefixes: {},
  classNameMap: {},
  createClassNameMapper: localClassNameMap =>
    buildClassNameMapper({}, localClassNameMap),
});
const { Consumer, Provider } = ThemeContext;

function ThemeProvider({ prefixes, classNameMap, children }) {
  const copiedPrefixes = useMemo(() => ({ ...prefixes }), [prefixes]);
  const globalClassNameMap = useMemo(() => ({ ...classNameMap }), [
    classNameMap,
  ]);

  const createClassNameMapper = localClassNameMap =>
    buildClassNameMapper(globalClassNameMap, localClassNameMap);

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
  prefixes: PropTypes.object.isRequired,
  classNameMap: PropTypes.object,
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
