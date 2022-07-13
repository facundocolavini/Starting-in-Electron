const fs = require('fs');
((path) => {
  if (fs.existsSync(path)) {
    return submenuSession[0];
  } else {
    return submenuSession[1];
  }
})();

/* const checkSession = () => {
  let session = isExistLog(path.join(__dirname, 'log'));
  if (!session) return submenuSession[0];
  else return ;
};
 */
