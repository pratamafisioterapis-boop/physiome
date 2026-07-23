import React, { useEffect, useRef, useState } from 'react';
import { Loader2, VideoOff } from 'lucide-react';

// Embedded telehealth video room using Jitsi's external API.
// Keyless (no account/credentials needed) — both parties join the same
// `roomName`, so we derive it from a shared id (e.g. an appointment id).
const JITSI_DOMAIN = 'meet.jit.si';
const SCRIPT_SRC = `https://${JITSI_DOMAIN}/external_api.js`;

let scriptPromise = null;
function loadJitsiScript() {
  if (window.JitsiMeetExternalAPI) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => { scriptPromise = null; reject(new Error('Failed to load video engine')); };
    document.body.appendChild(s);
  });
  return scriptPromise;
}

const JitsiRoom = ({ roomName, displayName, onLeave }) => {
  const containerRef = useRef(null);
  const apiRef = useRef(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    let cancelled = false;

    loadJitsiScript()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        // Namespaced room so different Physiome sessions never collide on the
        // shared public server.
        const api = new window.JitsiMeetExternalAPI(JITSI_DOMAIN, {
          roomName: `physiome-${roomName}`,
          parentNode: containerRef.current,
          width: '100%',
          height: '100%',
          userInfo: { displayName: displayName || 'Physiome user' },
          configOverwrite: {
            prejoinPageEnabled: true,
            disableDeepLinking: true,
            startWithAudioMuted: false,
            startWithVideoMuted: false,
          },
          interfaceConfigOverwrite: {
            MOBILE_APP_PROMO: false,
            SHOW_JITSI_WATERMARK: false,
            SHOW_CHROME_EXTENSION_BANNER: false,
          },
        });
        apiRef.current = api;
        setStatus('ready');
        api.addListener('videoConferenceLeft', () => { onLeave?.(); });
        api.addListener('readyToClose', () => { onLeave?.(); });
      })
      .catch(() => { if (!cancelled) setStatus('error'); });

    return () => {
      cancelled = true;
      try { apiRef.current?.dispose(); } catch { /* noop */ }
      apiRef.current = null;
    };
  }, [roomName, displayName, onLeave]);

  if (status === 'error') {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center gap-3 text-muted-foreground bg-muted/30 rounded-2xl">
        <VideoOff className="w-10 h-10" />
        <p className="text-sm">Couldn’t start the video session. Check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-black">
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center text-white/80 z-10">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default JitsiRoom;
