import React, { useRef, useEffect } from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

export function useIsMount () {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

export function getHelperText (fieldMetaData) {
  if (fieldMetaData.validating) {
    return <FormHelperText>Validating...</FormHelperText>;
  } else if (fieldMetaData.error) {
    return <FormHelperText error>{fieldMetaData.error}</FormHelperText>;
  } else {
    return null;
  }
}
