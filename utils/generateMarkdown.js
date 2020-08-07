// function to generate markdown for README
const badges = require('../badgeData')
const inquirer = require('inquirer');
const fs = require('fs');
const { mozilla, boost } = require('../badgeData');
const github = require('../github');

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
      type: 'checkbox',
      message: 'Select Badges',
      name: 'License',
      choices: [
        new inquirer.Separator(' = Choose a license = '),
        {
          name: 'Mozzilla',
        },
        {
          name: 'GitHub',
        },
        {
          name: 'Packagist',
        },
        {
          name: 'Inquirer',
        },
        
  ],
  status: function (choices) {
    return 'Total = ' + _.sum(_.map(choices.where({ checked: true }), 'value'))
  }
}]


  inquirer.prompt(questions).then(answers => {
    //console.log(status('Status')); 
    let badges = '';
    const userAns = answers;
    
    console.log(mozilla);

    const licenses = userAns.License[0];
    const licenseO = userAns.License[1]; 
    const licenseT = userAns.License[2];
    const licenseTh= userAns.License[3];

    if (licenses === 'Mozzilla'){
      badges = mozilla;
    }
    if(licenseO === 'GitHub'){
      badges += boost;
    }else{}
    console.log('badges ' + badges);
    
    
    const readMe = 'README.md';
    const dataToFile = badges +
    'Badges\n'+'==============\n'+ licenses +'\n'+
    'Title:\n'+'==============\n'+answers.Project_title + '\n'+
    'Decription:\n'+'==============\n' + answers.Description + '\n'+
    'Table of Contents:\n'+'==============\n' + answers.tbContents + '\n'+
    'Installation:\n'+'==============\n' + answers.install + '\n'+
    'Usage:\n'+'==============\n' + answers.usage +'\n'+
    "contibutiing:\n"+"==============\n" +'\n'+
    'Testing:\n'+'==============\n' + '' + '\n'+
    'Questions: \n'+'==============\n';
    writeToFile(readMe, dataToFile);


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