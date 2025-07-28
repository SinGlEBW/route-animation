import { execSync } from 'child_process';
const version = process.argv[2];
const commit = process.argv[3];

if (!version) {
  console.error('Please provide a version number');
  process.exit(1);
}
if (!commit) {
  console.error('Please provide a commit message');
  process.exit(1);
}

try {
  execSync('npm run build', { stdio: 'inherit' });
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "${commit}"`, { stdio: 'inherit' });
  execSync(`npm version ${version}`, { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });
  execSync('npm publish', { stdio: 'inherit' });
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}