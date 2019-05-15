const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')

module.exports = function (api, opts) {
    return new Promise(async (resolve, reject) => {
        let from = path.join(__dirname, '../lib/.eslintrc.js')
        let to = path.join(api.resolve('./.eslintrc.js'))
        let questions = [
        {
            type: 'list',
            message: '你想听歌还是看电影?',
            name: 'type',
            choices: [ '听歌', '看电影']
        },
        {
            type: 'input',
            name: 'music',
            message: '你想听的歌曲是?',
            when: function(answer) {
                return answer.type === '听歌'
            }
        },
        {
            type: 'list',
            name: 'movie',
            message: '你看什么类型的电影?',
            choices: ['动画片', '功夫片', '科幻', '魔幻', '扯蛋'],
            when: function(answer) {
                return answer.type === '看电影'
            }
        },
        {
            type: 'confirm',
            name: 'chedan',
            message: '扯蛋?哈哈,你上当了~~~,没有这个电影~~~',
            when: function(answer) {
                return answer.movie === '扯蛋'
            }
        },
        {
            type: 'confirm',
            name: 'otherM',
            message: '现在找不到电影,退出?',
            when: function(answer) {
                return ['动画片', '功夫片', '科幻', '魔幻'].indexOf(answer.movie) > 0
            }
        }
    ]

    let answer = await inquirer.prompt(questions)

    console.log(answer)
    resolve()
        fs.copySync(from, to)
    })
}