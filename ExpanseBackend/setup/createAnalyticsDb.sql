CREATE database expanseAnalytics;

-- UPDATE PASSWORD FIELD WITH A PASSWORD OF YOUR CHOOSING WHEN RUNNING THE SCRIPT
CREATE USER 
    'analyticsUser'@'localhost'  
    IDENTIFIED WITH caching_sha2_password
    BY 'password-goes-here';

GRANT ALL ON expanseAnalytics.* TO 'analyticsUser'@'localhost';