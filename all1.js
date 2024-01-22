const fs = require('fs');
const { exec } = require('child_process');

const runAll1 = () => {
  const allureResultsPath = 'allure-results';

  // Check if allure-results directory exists, create if not
  if (!fs.existsSync(allureResultsPath)) {
    fs.mkdirSync(allureResultsPath);
  } else {
    // Clear allure-results directory
    fs.readdirSync(allureResultsPath).forEach(file => {
      const filePath = `${allureResultsPath}/${file}`;
      fs.unlinkSync(filePath);
    });
  }

  // Find and run Newman with allure reporting
  const files = fs.readdirSync('./').filter(file => file.endsWith('collection.json'));

  if (files.length > 0) {
    const collectionFile = files[0];
    const command = `newman run ${collectionFile} -e env.json -r allure`;

    const childProcess = exec(command);

    childProcess.stdout.on('data', data => {
      console.log(data); // Вывод результата тестов в консоль
    });

    childProcess.stderr.on('data', data => {
      console.error(data); // Вывод ошибок в консоль
    });

    childProcess.on('close', code => {
      if (code !== 0) {
        console.error(`Tests completed with exit code ${code}`);
      }

      // Serve Allure report regardless of test result
      exec('allure serve allure-results', (serveError, serveStdout, serveStderr) => {
        if (serveError) {
          console.error(`Error serving Allure report: ${serveError.message}`);
        } else {
          console.log(serveStdout);
        }
      });
    });
  } else {
    console.error('No collection files found.');
  }
};

runAll1();