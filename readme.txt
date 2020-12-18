Backend (backend-adamnasrudin)
Menggunakan express js dengan database mysql, 
data di dapat dari api yang disediakan https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1/movies/.
tampilan Rest API sedikit di modivikasi , terutama bagian get list ditambahkan pagination.
buka file .env untuk mengatur port running dan configure db, default yang disediakan sebagai berikut :
PORT=8000

DB_HOST=127.0.0.1
DB_NAME=movie_db
DB_USERNAME=root
DB_PASSWORD=

sebelum running buatlah database di mysql sesuai db_name yang ada di  .env,
 kemudian running di terminal dengan perintah; nodemon index.js



Frontend (frontend-adamnasrudin)
Menggunakan react js , scss,
baseURL axios terdapat di file frontend-adamnasrudin\src\utils\apiUtils.js ,
dan fetch data autocomplete difile frontend-adamnasrudin\src\pages\Home\index.js 




