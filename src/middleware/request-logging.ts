export type LogFields = Record<string, unknown>;

export interface LogEntry {
  level: 'info' | 'error';
  message: string;
  fields: LogFields;
}

export interface AppLogger {
  info(message: string, fields?: LogFields): void;
  error(message: string, fields?: LogFields): void;
}

type LogWriter = (entry: LogEntry) => void;

export function createLogger(writer: LogWriter = writeToConsole): AppLogger {
  return {
    info(message, fields = {}) {
      writer({ fields, level: 'info', message });
    },
    error(message, fields = {}) {
      writer({ fields, level: 'error', message });
    },
  };
}

function writeToConsole(entry: LogEntry): void {
  console.log(JSON.stringify(entry));
}

let activeLogger = createLogger();

export const logger: AppLogger = {
  info(message, fields) {
    activeLogger.info(message, fields);
  },
  error(message, fields) {
    activeLogger.error(message, fields);
  },
};

export function setLoggerForTests(testLogger: AppLogger): () => void {
  const previousLogger = activeLogger;
  activeLogger = testLogger;
  return () => {
    activeLogger = previousLogger;
  };
}
