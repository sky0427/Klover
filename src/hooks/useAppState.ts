import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

function useAppState() {
  const appstate = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appstate.current);
  const [isComback, setIsComback] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appstate.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsComback(true);
      }

      if (appstate.current.match(/active/) && nextAppState === 'background') {
        setIsComback(false);
      }

      appstate.current = nextAppState;
      setAppStateVisible(appstate.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {isComback, appStateVisible};
}

export default useAppState;
