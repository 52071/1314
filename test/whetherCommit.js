const config = require('config');
const { beforeAll, describe, test, expect } = require('@jest/globals');
const { whetherCommit, checkConfig } = require('../src/util');

// 通用执行
const run = function (cases) {
  for (let i = 0; i < cases.length; i++) {
    cases[i].result = whetherCommit(cases[i].date);
  }
};

// 通用断言
const assert = function (cases) {
  for (let i = 0; i < cases.length; i++) {
    const { correct, result } = cases[i];
    expect(result).toBe(correct);
  }
};

// 文件内所有测试开始前执行的钩子函数
beforeAll(async () => {
  // 检查配置
  checkConfig();
});

describe('测试whetherCommit方法', () => {
  test('忽略的日期，应该都得到false', async () => {
    // 1. 配置
    const cases = ['2017-02-20', '2023-03-08'];
    const ignore = config.get('ignore');
    for (let i = 0; i < ignore.length; i++) {
      cases.push({ date: ignore[i], correct: false });
    }

    // 2. 执行
    run(cases);

    // 3. 断言
    assert(cases);
  });

  test('矩阵之外的日期，应该都得到false', async () => {
    // 1. 配置
    const cases = [
      // 矩阵左边
      { date: '2017-02-18', correct: false },
      { date: '2017-02-17', correct: false },
      { date: '2017-02-16', correct: false },
      { date: '2017-02-15', correct: false },
      { date: '2017-02-14', correct: false },
      { date: '2017-02-13', correct: false },
      { date: '2017-02-12', correct: false },
      { date: '2017-02-11', correct: false },
      { date: '2017-02-10', correct: false },
      { date: '2017-02-09', correct: false },
      { date: '2017-02-08', correct: false },
      { date: '2017-02-07', correct: false },
      { date: '2017-02-06', correct: false },
      { date: '2017-02-05', correct: false },
      { date: '2020-02-15', correct: false },
      { date: '2020-02-14', correct: false },
      { date: '2020-02-13', correct: false },
      { date: '2020-02-12', correct: false },
      { date: '2020-02-11', correct: false },
      { date: '2020-02-10', correct: false },
      { date: '2020-02-09', correct: false },
      { date: '2020-02-08', correct: false },
      { date: '2020-02-07', correct: false },
      { date: '2020-02-06', correct: false },
      { date: '2020-02-05', correct: false },
      { date: '2020-02-04', correct: false },
      { date: '2020-02-03', correct: false },
      { date: '2020-02-02', correct: false },

      // 矩阵右边
      { date: '2017-10-22', correct: false },
      { date: '2017-10-23', correct: false },
      { date: '2017-10-24', correct: false },
      { date: '2017-10-25', correct: false },
      { date: '2017-10-26', correct: false },
      { date: '2017-10-27', correct: false },
      { date: '2017-10-28', correct: false },
      { date: '2017-10-29', correct: false },
      { date: '2017-10-30', correct: false },
      { date: '2017-10-31', correct: false },
      { date: '2017-11-01', correct: false },
      { date: '2017-11-02', correct: false },
      { date: '2017-11-03', correct: false },
      { date: '2017-11-04', correct: false },
      { date: '2020-10-18', correct: false },
      { date: '2020-10-19', correct: false },
      { date: '2020-10-20', correct: false },
      { date: '2020-10-21', correct: false },
      { date: '2020-10-22', correct: false },
      { date: '2020-10-23', correct: false },
      { date: '2020-10-24', correct: false },
      { date: '2020-10-25', correct: false },
      { date: '2020-10-26', correct: false },
      { date: '2020-10-27', correct: false },
      { date: '2020-10-28', correct: false },
      { date: '2020-10-29', correct: false },
      { date: '2020-10-30', correct: false },
      { date: '2020-10-31', correct: false },

      // 年初
      { date: '2017-01-01', correct: false },
      { date: '2017-01-02', correct: false },
      { date: '2017-01-03', correct: false },
      { date: '2017-01-04', correct: false },
      { date: '2017-01-05', correct: false },
      { date: '2017-01-06', correct: false },
      { date: '2017-01-07', correct: false },
      { date: '2020-01-01', correct: false },
      { date: '2020-01-02', correct: false },
      { date: '2020-01-03', correct: false },
      { date: '2020-01-04', correct: false },
      { date: '2020-01-05', correct: false },
      { date: '2020-01-06', correct: false },
      { date: '2020-01-07', correct: false },

      // 年末
      { date: '2017-12-31', correct: false },
      { date: '2017-12-30', correct: false },
      { date: '2017-12-29', correct: false },
      { date: '2017-12-28', correct: false },
      { date: '2017-12-27', correct: false },
      { date: '2017-12-26', correct: false },
      { date: '2017-12-25', correct: false },
      { date: '2020-12-31', correct: false },
      { date: '2020-12-30', correct: false },
      { date: '2020-12-29', correct: false },
      { date: '2020-12-28', correct: false },
      { date: '2020-12-27', correct: false },
      { date: '2020-12-26', correct: false },
      { date: '2020-12-25', correct: false },
    ];

    // 2. 执行
    run(cases);

    // 3. 断言
    assert(cases);
  });

  test('矩阵之内的日期，应该得到指定的结果', async () => {
    // 1. 配置
    const cases = [
      // 左边临界点
      { date: '2017-02-19', correct: false },
      { date: '2017-02-20', correct: false },
      { date: '2017-02-21', correct: false },
      { date: '2017-02-22', correct: true },
      { date: '2017-02-23', correct: false },
      { date: '2017-02-24', correct: true },
      { date: '2017-02-25', correct: false },
      { date: '2017-02-26', correct: false },
      { date: '2017-02-27', correct: true },
      { date: '2017-02-28', correct: false },
      { date: '2017-03-01', correct: true },
      { date: '2017-03-02', correct: false },
      { date: '2017-03-03', correct: true },
      { date: '2017-03-04', correct: false },
      { date: '2020-02-16', correct: false },
      { date: '2020-02-17', correct: true },
      { date: '2020-02-18', correct: true },
      { date: '2020-02-19', correct: true },
      { date: '2020-02-20', correct: false },
      { date: '2020-02-21', correct: true },
      { date: '2020-02-22', correct: false },
      { date: '2020-02-23', correct: false },
      { date: '2020-02-24', correct: true },
      { date: '2020-02-25', correct: false },
      { date: '2020-02-26', correct: true },
      { date: '2020-02-27', correct: false },
      { date: '2020-02-28', correct: true },
      { date: '2020-02-29', correct: false },

      // 右边临界点
      { date: '2017-10-08', correct: false },
      { date: '2017-10-09', correct: false },
      { date: '2017-10-10', correct: false },
      { date: '2017-10-11', correct: true },
      { date: '2017-10-12', correct: false },
      { date: '2017-10-13', correct: false },
      { date: '2017-10-14', correct: false },
      { date: '2017-10-15', correct: false },
      { date: '2017-10-16', correct: true },
      { date: '2017-10-17', correct: true },
      { date: '2017-10-18', correct: true },
      { date: '2017-10-19', correct: true },
      { date: '2017-10-20', correct: true },
      { date: '2017-10-21', correct: false },
      { date: '2020-10-04', correct: false },
      { date: '2020-10-05', correct: false },
      { date: '2020-10-06', correct: false },
      { date: '2020-10-07', correct: true },
      { date: '2020-10-08', correct: false },
      { date: '2020-10-09', correct: false },
      { date: '2020-10-10', correct: false },
      { date: '2020-10-11', correct: false },
      { date: '2020-10-12', correct: true },
      { date: '2020-10-13', correct: true },
      { date: '2020-10-14', correct: true },
      { date: '2020-10-15', correct: true },
      { date: '2020-10-16', correct: true },
      { date: '2020-10-17', correct: false },

      // 中间
      { date: '2017-06-18', correct: false },
      { date: '2017-06-19', correct: true },
      { date: '2017-06-20', correct: false },
      { date: '2017-06-21', correct: false },
      { date: '2017-06-22', correct: false },
      { date: '2017-06-23', correct: false },
      { date: '2017-06-24', correct: false },
      { date: '2017-06-25', correct: false },
      { date: '2017-06-26', correct: true },
      { date: '2017-06-27', correct: true },
      { date: '2017-06-28', correct: true },
      { date: '2017-06-29', correct: true },
      { date: '2017-06-30', correct: true },
      { date: '2017-07-01', correct: false },
      { date: '2020-06-14', correct: false },
      { date: '2020-06-15', correct: true },
      { date: '2020-06-16', correct: false },
      { date: '2020-06-17', correct: false },
      { date: '2020-06-18', correct: false },
      { date: '2020-06-19', correct: false },
      { date: '2020-06-20', correct: false },
      { date: '2020-06-21', correct: false },
      { date: '2020-06-22', correct: true },
      { date: '2020-06-23', correct: true },
      { date: '2020-06-24', correct: true },
      { date: '2020-06-25', correct: true },
      { date: '2020-06-26', correct: true },
      { date: '2020-06-27', correct: false },
    ];

    // 2. 执行
    run(cases);

    // 3. 断言
    assert(cases);
  });
});
