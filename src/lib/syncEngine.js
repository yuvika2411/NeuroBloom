/**
 * Real-Time Cross-Tab Telemetry Sync Engine for NeuroBloom
 * Uses BroadcastChannel API with localStorage fallback for 0-latency live sync between Child & Parent Dashboards
 */

const CHANNEL_NAME = 'neurobloom_realtime_sync';

class SyncEngine {
  constructor() {
    this.listeners = new Set();
    this.channel = null;

    if (typeof window !== 'undefined') {
      if ('BroadcastChannel' in window) {
        this.channel = new BroadcastChannel(CHANNEL_NAME);
        this.channel.onmessage = (event) => {
          this.notify(event.data);
        };
      }

      // Fallback & secondary cross-window sync via storage event
      window.addEventListener('storage', (e) => {
        if (e.key === CHANNEL_NAME && e.newValue) {
          try {
            const data = JSON.parse(e.newValue);
            this.notify(data);
          } catch (err) {
            console.error('Storage sync error:', err);
          }
        }
      });
    }
  }

  emit(type, payload = {}) {
    const message = {
      type,
      payload,
      timestamp: Date.now(),
      id: Math.random().toString(36).substring(2, 9)
    };

    // Notify local listeners
    this.notify(message);

    // Broadcast to other tabs via BroadcastChannel
    if (this.channel) {
      try {
        this.channel.postMessage(message);
      } catch (err) {
        console.error('BroadcastChannel emit error:', err);
      }
    }

    // Fallback storage update
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CHANNEL_NAME, JSON.stringify(message));
      } catch (err) {
        // Storage full or unavailable
      }
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  notify(data) {
    this.listeners.forEach((callback) => {
      try {
        callback(data);
      } catch (err) {
        console.error('Error in sync listener:', err);
      }
    });
  }
}

export const syncEngine = new SyncEngine();
