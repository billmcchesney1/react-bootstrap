import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import classnames from 'classnames/bind';

function buildClassNameMapper(globalClassNameMap, localClassNameMap) {
  return classnames.bind({
    ...globalClassNameMap,
    ...localClassNameMap,
  });
}

const ClassNameContext = React.createContext({
  createClassNameMapper: localClassNameMap =>
    buildClassNameMapper({}, localClassNameMap),
});

const { Consumer, Provider } = ClassNameContext;

function ClassNameProvider({ classNameMap, children }) {
  const globalClassNameMap = useMemo(() => ({ ...classNameMap }), [
    classNameMap,
  ]);

  const createClassNameMapper = localClassNameMap =>
    buildClassNameMapper(globalClassNameMap, localClassNameMap);

  return (
    <Provider
      value={{
        createClassNameMapper,
      }}
    >
      {children}
    </Provider>
  );
}

ClassNameProvider.propTypes = {
  classNameMap: PropTypes.object,
};

export function useClassNameMapper(localClassNameMap) {
  const { createClassNameMapper } = useContext(ClassNameContext);
  return createClassNameMapper(localClassNameMap);
}

export { Consumer as ClassNameConsumer, ClassNameContext };
export default ClassNameProvider;
