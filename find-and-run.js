const fs = require('fs');
const { exec } = require('child_process');

const findandrun = () => {
  const files = fs.readdirSync('./').filter(file => file.endsWith('collection.json'));

  if (files.length > 0) {
    const collectionfile = files[0];
    const command = `newman run ${collectionfile} -e env.json`;

    const childProcess = exec(command);

    childProcess.stdout.on('data', data => {
      console.log(data); // Вывод результата тестов в консоль
    });

    childProcess.stderr.on('data', data => {
      console.error(data); // Вывод ошибок в консоль
    });

    childProcess.on('close', code => {
      if (code !== 0) {
        console.error(`command failed: ${command}`);
      }
    });
  } else {
    console.error('no collection files found.');
  }
};

findandrun();