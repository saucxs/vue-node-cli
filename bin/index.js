console.log(process.argv);

const path = require('path');   //路径
const download = require('download-git-repo');  //下载
const program = require('commander');
const chalk = require('chalk');

const rm = require('rimraf').sync;
const exists = require('fs').existsSync;
const ora = require('ora');    //视觉美化
const inquirer = require('inquirer');   // 交互


//查看版本号
program
  .version('1.0.0')

/*
 * usage & format arguments
 * */
program
    .usage('<template-name> <project-name>')
    .parse(process.argv);


/*
 help
 */
program.on('--help', function () {
    console.log(' Examples:');
    console.log();
    console.log(chalk.gray('    # create a new front-end && back-end frame'))
    console.log(chalk.green('   $ saucxs init website my-project or $ saucxs init vue my-project'))
    console.log()
});


/*
 * hint
 * */
if (program.args.length < 2) return program.help();

/*template name*/
let template = program.args[0];

/*project name*/
let projectName = program.args[1];

/*dist*/
let to = path.resolve(projectName);

console.log();
process.on('exit', function () {
    console.log();
});

/*ask user override?*/
if (exists(to)) {
    inquirer.prompt([{
        type: 'confirm',
        message: '文件夹存在，是否覆盖？',
        name: 'ok'
    }]).then(answers => {
        if (answers.ok) {
            run()
        }
    })
} else {
    run()
}

/*download template*/
function run() {
    const spinner = ora('downloading template')
    if (exists(to)) rm(to);
    spinner.start()
    download(`saucxs/${template}`, to, {clone: false}, function (err) {
        spinner.stop()
        if (err) {
            console.log(chalk.red('download error!'));
            process.exit(1);
        }
        console.log(chalk.green('    download success!'));
        console.log(chalk.green(`    plz cd  ${to}`));
        console.log(chalk.green('    $npm install '));
        console.log(chalk.green('    $npm start '));
    })
}
