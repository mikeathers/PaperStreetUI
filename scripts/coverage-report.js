const {
  access,
  constants: { F_OK, R_OK },
} = require('fs');
const { exec } = require('child_process');
const { platform } = require('os');

const COVERAGE_REPORT = 'coverage/lcov-report/index.html';

access(
  COVERAGE_REPORT,
  F_OK | R_OK,
  (error) =>
    !error &&
    exec(`${platform() === 'win32' ? 'start' : 'open'} ${COVERAGE_REPORT}`),
);
