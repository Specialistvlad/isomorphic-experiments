FROM mongo:3.2
CMD ["mongod", "--storageEngine", "wiredTiger"]
