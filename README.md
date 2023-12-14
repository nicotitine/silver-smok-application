
# Silver-Smok application

This app is a basic contact management app. It does not include features such as Login as user.




## Database setup
This project was developed and tested using a MySQL 8.0 database.
You will find the file `data.sql` containing SQL instruction in order to populate your database. 

The data has been generated using ChatGPT and hopefully does not match with any real person. 
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
DB_HOST = your_db_hostname
DB_USER = your_db_username
DB_PASSWORD = your_db_password
DB_DATABASE = your_db_database_name
```


## Run Locally

Clone the project

```bash
  git clone https:/github.com/nicotitine/silver-smok-application
```

Go to the project directory

```bash
  cd silver-smok-application
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

