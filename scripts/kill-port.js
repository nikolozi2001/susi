import { execSync } from 'child_process';

// This script finds and kills any process using port 5000 (or another specified port)
const killPort = (port = 5000) => {
  try {
    console.log(`Attempting to free up port ${port}...`);
    
    // Check if we're on Windows or Unix-like OS
    const isWindows = process.platform === 'win32';
    
    if (isWindows) {
      // Windows command to find and kill process
      const findCommand = `netstat -ano | findstr :${port}`;
      const output = execSync(findCommand, { encoding: 'utf-8' });
      
      if (output) {
        // Parse the output to get the PID
        const lines = output.split('\n');
        for (const line of lines) {
          const match = line.match(/\s+(\d+)$/);
          if (match) {
            const pid = match[1];
            console.log(`Killing process with PID ${pid} using port ${port}`);
            execSync(`taskkill /F /PID ${pid}`);
          }
        }
      }
    } else {
      // Unix-like systems (macOS, Linux)
      const findCommand = `lsof -i :${port} -t`;
      const output = execSync(findCommand, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });
      
      if (output) {
        const pids = output.trim().split('\n');
        for (const pid of pids) {
          if (pid) {
            console.log(`Killing process with PID ${pid} using port ${port}`);
            execSync(`kill -9 ${pid}`);
          }
        }
      }
    }
    
    console.log(`Port ${port} should now be free`);
  } catch (error) {
    console.error(`Failed to kill process on port ${port}: ${error.message}`);
    console.error('You might need administrative privileges to kill certain processes');
  }
};

// Execute for port 5000 by default
killPort();

// You can also specify a different port as a command-line argument
// e.g., node kill-port.js 8080
if (process.argv[2]) {
  killPort(Number(process.argv[2]));
}
