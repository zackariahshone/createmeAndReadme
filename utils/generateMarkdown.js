// function to generate markdown for README
const inquirer = require('inquirer');
const fs = require('fs');
const Choice = require('inquirer/lib/objects/choice');
const Choices = require('inquirer/lib/objects/choices');

function generateMarkdown() {
  //   
  //  array of questions for user
  const questions = [{
      type: 'input',
      name: 'project_title',
      message: 'What is your Repo name?',
    },
    {
      type: 'input',
      name: 'Description',
      message: 'What Does your repo do?',
      default: function () {
        return 'Left it blank';
      },
    },
    {
      type: 'input',
      name: 'tbContents',
      message: 'Enter the Table of contents/files:',
    },
    {
      type: 'input',
      name: 'install',
      message: 'Steps to install:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Usage: '
    },
    {
      type: 'list',
      name: 'bage',
      message: 'Which license bage?',
      choices: [
        'This one',
        'That one',
        'none one',
        'I dont know what that is'
      ]
    },
    {
      type: 'input',
      name: 'file',
      message: 'What is the name of the file you would like to write/create?'
    },
  ];
  inquirer.prompt(questions).then(answers => {
    // if(answers.choices[1]){
    //   console.log('successfully used choices');
    // }
    const readMe = answers.file;
    const dataToFile = answers.Project_title + 
    '\n==============\n' + answers.Description + 
    '\n==============\n' + answers.tbContents + 
    '\n==============\n' + answers.install + 
    '\n==============\n' + answers.usage +
    "\n==============\n";
    writeToFile(readMe + '.md', dataToFile);


  }).catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
}


function writeToFile(fileName, data) {
  fs.appendFile(fileName, data, 'utf8', function (error) {
    if (error) throw error;
    console.log('File sucessfully written')
  });
}

//module.exports = generateMarkdown;
module.exports = {

  gM: generateMarkdown
}