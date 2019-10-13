class LimitedLiFoQueue<T> {
  readonly size: number;

  private storage: Array<T> = [];

  constructor(size: number) {
    this.size = size;
  }

  push(value: T) {
    this.storage.unshift(value);
    this.storage.splice(this.size, Infinity);
  }

  pop(): T | undefined {
    return this.storage.shift();
  }
}

type TrackJSInstallOptions = { capture?: boolean, size?: number };

export class TrackJS {
  private static capture = true;

  private static queue?: LimitedLiFoQueue<string>;

  static install({ capture = true, size = 10 } : TrackJSInstallOptions) {
    TrackJS.capture = capture;

    if (capture) {
      TrackJS.sendUsage();
    } else {
      TrackJS.queue = new LimitedLiFoQueue<string>(size)
    }
  }

  private static sendError(error: string) {
    console.error(error);
  }

  private static sendUsage() {
    console.log('usage call');
  }

  static onError(error: string) {
    if (TrackJS.capture) {
      TrackJS.sendError(error);
    } else if (TrackJS.queue != null) {
      TrackJS.queue.push(error)
    }
  }

  static enable() {
    if (TrackJS.capture) {
      return;
    }

    TrackJS.capture = true;

    TrackJS.sendUsage();

    if (TrackJS.queue == null) {
      return;
    }

    let error;

    while ((error = TrackJS.queue.pop()) != null) {
      TrackJS.sendError(error);
    }
  }
}
