import { init, post, text, button, image } from '@farcaster/frame-sdk';
import { useEffect, useState } from 'react';

let isInitialized = false;

export function useFarcasterFrame() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) {
      setInitialized(true);
      return;
    }

    try {
      init({
        initialState: () =>
          post(
            image({
              src: 'https://dummyimage.com/1200x630/0f1420/10b981&text=PredictCast',
              aspectRatio: '1.91:1',
            }),
            text('🔮 Make predictions on future events and earn rewards!'),
            button({
              label: 'Open App',
              onClick: ({ state }) => ({ ...state, open: true }),
            })
          ),
      });
      isInitialized = true;
      setInitialized(true);
    } catch (error) {
      console.error('Failed to initialize Farcaster Frame:', error);
    }
  }, []);

  return { initialized };
}

