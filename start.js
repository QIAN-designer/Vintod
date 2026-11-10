const { spawn } = require('child_process');
const path = require('path');

function runProcess(name, color, cwd, args) {
  const proc = spawn('npm', args, {
    cwd,
    shell: true,
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

  proc.on('close', (code) => {
    console.log(`${prefix}Proceso terminado con código ${code}`);
  });

  return proc;
}

console.log('\x1b[33mIniciando Backend y Frontend en la misma terminal...\x1b[0m\n');

const backend = runProcess('BACKEND', '\x1b[36m', path.join(__dirname, 'backend'), ['run', 'dev']);
const frontend = runProcess('FRONTEND', '\x1b[32m', path.join(__dirname, 'frontend'), ['start']);

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});
