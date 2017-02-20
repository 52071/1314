const { checkConfig, whetherCommit, gitCommit, gitPush } = require('./util');

// 检查配置
checkConfig();

// 今天是否需要提交
if (whetherCommit(Date.now())) {
  // 提交
  gitCommit();
  // 推送
  gitPush();
}
