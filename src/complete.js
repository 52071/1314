const config = require('config');
const moment = require('moment');
const { checkConfig, unifiedTime, whetherCommit, gitCommit } = require('./util');

// 检查配置
checkConfig();

// 提交时间（默认是最开始的时间）
const commitDate = unifiedTime(config.get('specialDate'));

// 遍历过去的每一天直到今天（包含今天）
while (unifiedTime(moment()).diff(commitDate, 'day') >= 0) {
  // 如果当天需要提交
  if (whetherCommit(commitDate)) {
    // 提交
    gitCommit({ date: commitDate });
  }

  // 累加一天
  commitDate.add(1, 'day');
}
