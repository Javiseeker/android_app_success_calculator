import React, { useState, useEffect } from 'react';
import ailab from '../apis/ailab';
const host: string = "www.google.com";

const AiLabConnectionChecker: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState('');
  const [connectionColor, setConnectionColor] = useState('primary');

  useEffect(() => {
    const intervalId = setInterval(async function () {
      try {
        const response = await ailab.get('system/status');
        if (response.status === 200) {
          setConnectionStatus('Online');
          setConnectionColor('green');
        }
      } catch (err) {
        console.log(
          `Error making the Http request to AILab. Error Message: ${err.message}`
        );
        setConnectionStatus('Offline');
        setConnectionColor('red');
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connectionStatus])

  const style = {
    color: connectionColor
  }
  return (
    <span style={style}>{connectionStatus}</span>
  );
}

export default AiLabConnectionChecker;