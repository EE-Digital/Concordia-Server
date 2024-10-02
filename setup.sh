#! Run this setup file only once, it will delete all the data in the database if there is one already!

# Load variables from .env
export $(grep -v '^#' .env | xargs)
echo Loaded variables from .env file

# Setup database
SQL_FILE='data.sql'

sudo mariadb -e "CREATE DATABASE IF NOT EXISTS $DB_DATABASE;"
sudo mariadb -e "CREATE USER '$DB_USER'@localhost IDENTIFIED BY '$DB_PASSWORD'"
sudo mariadb -e "GRANT ALL PRIVILEGES ON $DB_DATABASE.* TO '$DB_USER'@localhost"
echo "Database '$DB_DATABASE' created or already exists."
sudo mariadb $DB_DATABASE < "$SQL_FILE"
echo "Sucesfully created tables according to $SQL_FILE"