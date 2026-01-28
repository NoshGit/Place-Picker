export function log(message, level = 0, type = 'log') {
  let styling = 'padding: 0.15rem; background: #047cd2; color: #fcfabd';

  if (type === 'other') {
    styling = 'padding: 0.15rem; background: #d0c1f2; color: #161615';
  }

  if (type === 'error') {
    styling = 'padding: 0.15rem; background: #c70404; color: #fcfcfb';
  }

  const indent = '- '.repeat(level);

  // For non-primitive types (objects, arrays), log them separately for proper inspection
  if (typeof message === 'object' && message !== null) {
    console.log('%c' + indent, styling, message);
  } else {
    console.log('%c' + indent + message, styling);
  }
}
