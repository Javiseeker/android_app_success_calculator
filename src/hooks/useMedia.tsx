import {useState, useEffect} from 'react';

const useMedia = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(
    () => {
      const mediaQuery = window.matchMedia(query);
      // Update the state with the current value
      setMatches(mediaQuery.matches);
      // Create an event listener
      const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
      // Attach the event listener to know when the matches value changes
      mediaQuery.addEventListener('change', handler);
      // Remove the event listener on cleanup
      return () => mediaQuery.removeEventListener('change', handler);
    },
    [query, matches]
  );
  return matches;
}

export default useMedia;