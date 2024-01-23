Это малая демка тестирования api. в качестве стенда использован сайт:

---

http://kinotochka.site/api/docs/swagger/

---

это проект для запуска через консоль, с выгрузкой результатов тестирования в allure.

проект ищет коллекцию тестов экспорта из Postman в папке проекта, вида : \*.postman_collection.json. Важно, чтобы в имени файла коллекции не было пробелов. Файл с переменными окружения- env.json
нужен node.js (фреймворк для запуска js в консоли+ менеджер пакетов npm)

после распаковки, запустите консоль в папке с файлами проекта, там где есть package.json файл, пкм->gitBash here
можно ввести
npm install
и подтянутся все компоненты для старта проекта, указанные в package.json

или можно провести установку каждого элемента пошагово:

\*\*\*нужен newman - это приложение, прогоняющее тесты postman-a. устанавливается через

npm install -g newman
и
npm install -g newman-reporter-allure

\*\*\*нужен allure-commandline - обработка репортов и выгрузка в браузер для наглядного анализа.

npm install -g allure-commandline

### ВАЖНО: allure-commandline требует JDK 11, npm не поставит его.

Посетите [официальный сайт Oracle](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) или [OpenJDK](https://adoptopenjdk.net/) и загрузите JDK 11. 2. Установите JDK 11, следуя инструкциям на сайте.

## Настройка переменной окружения JAVA_HOME

После установки JDK 11(+), убедитесь, что переменная окружения JAVA_HOME настроена на директорию, в которой установлен JDK 11(+). Если вы используете Windows,
вам нужно будет добавить путь к JDK 11(+) в переменную JAVA_HOME в системных настройках.
(ПКМ по Мой компьютер, свойства, доп. параметры системы, переменные среды, системные переменные.)
Из-за санкций, возможно придется поискать старый intellij IDEA и уже через него подтянуть необходимый JDK и прописать переменные вручную.

---

Проект запускается, когда консоль открыта в папке с файлами json коллекций.
проект поддерживает следующие команды:

\*\*\*\*npm test
прогоняется одна итерация тестов коллекции, результат выводится в консоль

\*\*\*\*npm run allure-report
прогояется тест в silent-режиме, формируется отчет в папку allure-results. предыдущий отчет при этом будет перезаписан.

\*\*\*\*nmp run all1
прогоняется тест в silent-режиме, формируется отчет в папку allure-results и сразу же выгружается в браузер

\*\*\*\*allure serve
применяется к сформированному отчету в папке allure-results. выгружает отчет в браузер.

\*\*\* скрипты all1.js, run-ad-report.js работают не очень гладко, но с задачей справляются.
