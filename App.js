import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import Routes from './navigation/index';

export default function App() {
  return (
    <RootSiblingParent> 
      <Routes />
    </RootSiblingParent>
  );
}