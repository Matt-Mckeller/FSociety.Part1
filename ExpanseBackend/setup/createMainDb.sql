-- Run from root user on db(s)
-- UPDATE PASSWORD FIELDS WITH A PASSWORD OF YOUR CHOOSING WHEN RUNNING THE SCRIPT
CREATE database expanseMain;

-- Create app user
CREATE USER 
    'expanseApplicationBackend'@'localhost'  
    IDENTIFIED WITH caching_sha2_password
    BY 'password-goes-here';

GRANT ALL ON expanseMain.* TO 'expanseApplicationBackend'@'localhost';

-- Create Migration user
CREATE USER 
    'mainMigrator'@'localhost'  
    IDENTIFIED WITH caching_sha2_password
    BY 'password-goes-here';

GRANT ALL ON expanseMain.* TO 'mainMigrator'@'localhost';