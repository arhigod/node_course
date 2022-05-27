process.stdin.on('data', data => {
  process.stdout.write([...data.toString().trim()].reverse().join('') + '\n\n');
});
