// @ts-check
const { test } = require('3h-test');

test({
    include: (
        (process.argv.length > 2)
            ? process.argv.slice(2)
            : undefined
    ),
}, {
    intervalPing: require('./intervalPing.cjs'),
    smartPing: require('./smartPing.cjs'),
});
