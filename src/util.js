const moment = require('moment');
const config = require('config');
const { execSync } = require('child_process');

// 检查配置
const checkConfig = function () {
  // 矩阵
  const matrix = config.get('matrix');
  if (!matrix || !Array.isArray(matrix) || matrix.length !== 7) {
    throw new Error('配置有误 matrix');
  }
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    if (row.length !== matrix[0].length) throw new Error('配置有误 matrix');
    for (let j = 0; j < row.length; j++) {
      const col = row[j];
      if (typeof col !== 'number') throw new Error('配置有误 matrix');
    }
  }

  // 纪念日
  const specialDate = config.get('specialDate');
  if (!specialDate || !moment(specialDate).isValid()) {
    throw new Error('配置有误 specialDate');
  }

  // 忽略的日期
  const ignore = config.get('ignore');
  if (!ignore || !Array.isArray(ignore)) {
    throw new Error('配置有误 ignore');
  }
  for (let i = 0; i < ignore.length; i++) {
    const item = ignore[i];
    if (!item || !moment(item).isValid()) throw new Error('配置有误 ignore');
  }
};

// 统一日期时间
const unifiedTime = function (datetime) {
  if (!moment(datetime).isValid()) throw new Error(`时间有误 ${datetime}`);

  // 统一时间和时区
  return moment(moment(datetime).format('YYYY-MM-DDT00:00:00+00:00'));
};

// 执行 GIT 提交命令
const gitCommit = function (params = {}) {
  const { date, message = '520711314' } = params;
  const cmd = `git commit ./LICENSE --allow-empty -m "${message}"`;

  if (date) {
    const dateStr = unifiedTime(date).format();
    console.log(`开始提交 ${dateStr}`);
    execSync(`set GIT_AUTHOR_DATE="${dateStr}" && set GIT_COMMITTER_DATE="${dateStr}" && ${cmd}`);
  } else {
    execSync(cmd);
  }
};

// 执行 GIT 推送命令
const gitPush = function () {
  execSync('git push');
};

// 判断指定日期是否需要提交
const whetherCommit = function (date) {
  // 矩阵
  const matrix = config.get('matrix');

  // 目标日期
  const targetDate = unifiedTime(date);
  // 矩阵开始的日期
  const matrixStart = unifiedTime(config.get('specialDate'));
  matrixStart.year(targetDate.year()); // 定位到目标日期所在年份
  matrixStart.day('Sunday'); // 对齐到周日（即贡献图列的第一格）
  // 矩阵结束的日期
  const matrixEnd = unifiedTime(matrixStart).add(matrix[0].length, 'week').subtract(1, 'day');

  // 跳过忽略的日期
  if (config.get('ignore').includes(targetDate.format('YYYY-MM-DD'))) return false;
  // 跳过矩阵外的日期
  if (targetDate.isBefore(matrixStart) || targetDate.isAfter(matrixEnd)) return false;

  // 遍历矩阵
  for (let r = 0; r < matrix.length; r += 1) {
    const row = matrix[r];
    for (let c = 0; c < row.length; c += 1) {
      // 所在格子对应的日期
      const date = unifiedTime(matrixStart);
      if (c > 0) date.add(c * 7, 'day');
      if (r > 0) date.add(r, 'day');

      // 目标日期等于当前格子对应的日期时
      if (date.diff(targetDate, 'days') == 0) {
        return !!row[c];
      }
    }
  }

  throw new Error(`日期未命中 ${targetDate.format('YYYY-MM-DD')}`);
};

module.exports = {
  checkConfig,
  unifiedTime,
  gitCommit,
  gitPush,
  whetherCommit,
};
