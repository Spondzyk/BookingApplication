set MYSQL_EXE="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
set USERNAME=root
set PASSWORD=root
set DATABASE=booking_test
set BACKUP_FILE=C:\Users\mikol\Desktop\SEMESTR_5\PO\backup.sql


%MYSQL_EXE% -u %USERNAME% -p%PASSWORD% -e "DROP DATABASE IF EXISTS %DATABASE%; CREATE DATABASE %DATABASE%;"
%MYSQL_EXE% -u %USERNAME% -p%PASSWORD% %DATABASE% < %BACKUP_FILE%