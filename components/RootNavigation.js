import React from 'react';
import { retryIn } from './utils';

export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.navigate(name, params);
  }
}

export function goBack() {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.goBack()
  }
}

export function getNavigationState() {
  if (isReadyRef.current && navigationRef.current) {
    return navigationRef.current?.getRootState()
  } else {
    return {}
  }
}
