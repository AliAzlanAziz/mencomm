import React from 'react';
import { MainNavigator } from './navigators/stacknavigator'
import { AuthContextProvider } from './context/authContext';

const App = () => {
    return (
        <AuthContextProvider>
            <MainNavigator/>
        </AuthContextProvider>
    )
};

export default App;