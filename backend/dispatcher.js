const path = require("path");
const logger = require("./logger");

async function dispatchCalls(calls) {
  const results = [];

  for (const call of calls) {
    try {
      const servicePath = path.join(__dirname, "apis", `${call.service}.js`);
      const service = require(servicePath);
      const result = await service[call.method](...call.params);
      results.push(result);
      logger.log(`Success: ${call.service}.${call.method}`);
    } catch (error) {
      results.push({ error: error.message });
      logger.log(`Error in ${call.service}.${call.method}: ${error.message}`);
    }
  }

  return results;
}

module.exports = { dispatchCalls };
