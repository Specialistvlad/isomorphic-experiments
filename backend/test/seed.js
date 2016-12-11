Promise.all([
	require('../modules/extensions/seed')()
])
.then(console.log)
.catch(console.error)
.then(() => process.exit(0));
