process.stdin.on('data', data => {
  console.log([...data.toString().trim()].reverse().join('') + '\n');
});
