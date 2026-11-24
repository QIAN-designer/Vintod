const { spawn } = require('child_process');
const path = require('path');

const isWindows = process.platform === 'win32';

function runProcess(name, color, cwd, args) {
  const command = isWindows ? (process.env.ComSpec || 'cmd.exe') : 'npm';
  const commandArgs = isWindows ? ['/d', '/s', '/c', 'npm', ...args] : args;

  const proc = spawn(command, commandArgs, {
    cwd,
    detached: !isWindows,
    env: { ...process.env, FORCE_COLOR: '1' }
  });

  const prefix = `${color}[${name}]\x1b[0m `;

  proc.stdout.on('data', (data) => {
    const lines = data.toString().split(/\r?\n/);
    lines.forEach((line, index) => {
      if (line || index < lines.length - 1) {
        process.stdout.write(`${prefix}${line}\n`);
      }
    });
  });

  proc.stderr.on('data', (data) => {
    const lines = data.toString().split(/\r?\n/);
    lines.forEach((line, index) => {
      if (line || index < lines.length - 1) {
        process.stderr.write(`${prefix}${line}\n`);
      }
    });
  });

  proc.on('error', (err) => {
    console.error(`${prefix}Error al iniciar el proceso: ${err.message}`);
  });

  proc.on('close', (code) => {
    console.log(`${prefix}Proceso terminado con código ${code}`);
  });

  return proc;
}

function stopProcess(proc) {
  if (!proc || proc.killed || !proc.pid) return;

  try {
    if (isWindows) {
      spawn('taskkill', ['/pid', String(proc.pid), '/T', '/F'], { stdio: 'ignore' });
    } else {
      // Mata todo el grupo de procesos en Linux/macOS para no dejar procesos huérfanos
      process.kill(-proc.pid, 'SIGTERM');
    }
  } catch (err) {
    if (err.code !== 'ESRCH') {
      try {
        proc.kill('SIGTERM');
      } catch (_) {}
    }
  }
}

console.log('\x1b[33mIniciando Backend, BackendIA y Frontend en la misma terminal...\x1b[0m\n');

const processes = [
  runProcess('BACKEND', '\x1b[36m', path.join(__dirname, 'backend'), ['run', 'dev']),
  runProcess('BACKEND_IA', '\x1b[35m', path.join(__dirname, 'backendIA'), ['run', 'dev']),
  runProcess('FRONTEND', '\x1b[32m', path.join(__dirname, 'frontend'), ['start'])
];

let shuttingDown = false;
function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log('\n\x1b[33mDeteniendo servicios...\x1b[0m');
  processes.forEach(stopProcess);
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
