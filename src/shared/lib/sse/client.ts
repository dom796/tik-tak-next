import { useState, useEffect, useRef } from "react";

const RECONNECT_DELAY_MS = 3000;

export function useEventsSource<T>(url: string, onData?: (data: T) => void) {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown | undefined>();
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let closed = false;

    function connect() {
      if (closed) return;

      const gameEvents = new EventSource(url);

      gameEvents.addEventListener("message", (message) => {
        try {
          const parsed = JSON.parse(message.data);
          setError(undefined);
          setData(parsed);
          onData?.(parsed);
          setIsPending(false);
        } catch (e) {
          setError(e);
        }
      });

      gameEvents.addEventListener("error", (e) => {
        setError(e);
        gameEvents.close();
        if (!closed) {
          reconnectTimer.current = setTimeout(connect, RECONNECT_DELAY_MS);
        }
      });

      return gameEvents;
    }

    const source = connect();

    return () => {
      closed = true;
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
      source?.close();
    };
  }, [url, onData]);

  return {
    dataStream: data,
    error,
    isPending,
  };
}