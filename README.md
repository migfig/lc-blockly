# LangChain AI Blockly 

[react.js](https://reactjs.org/) sample with Google [Blockly](https://github.com/google/blockly)

Configures LangChain custom blocks to build simple LangChain python applications thru a python [FastAPI](https://fastapi.tiangolo.com) Api.

You can save/edit/remove your applications locally (localStore). Once you save your application, the python LangChain code is automatically generated & downloaded, ready to be executed via python command line.

### Installation/Setup
Run the following commands directly in the root folder of this project.

```
npm install
```

Make sure you install python before (in case you don't have it)

Create a python env for installing/running the FastAPI Api. If you are a python developer, conda or miniconda is recommended, but if you only need that setup for this app, then just setup an environment directly with python as follows:
```
python -m venv env
source ./env/bin/activate
```

install packages with:
```
(env) $ pip install -r api/python/requirements.txt
```

### Running the app

Make sure the python environment is activated with the source command (as shown above) before running the react app
```
(env) $ npm run start
```

NOTE: will also run the FastAPI Api, due is configured in the package.json scripts, please notice this expects the dev environment to be a linux environment, for Windows you may need to create your own api.bat shell.

### Browse

Open [http://localhost:3000/](http://localhost:3000/)

## Features
- Local implementation, no need to setup anything else, but a simple dev environment with the following:
  - node not newer than v16.20.1 (you can use nvm to install/use that LTS version)
  - python 3.11 or newer and a few packages to be installled by using the requirements.txt file (shown above)
- Drag & Drop for the blocks (provided by Blockly) 
- Block properties are configured via json file definitions
- FastAPI Api runs via json configuration file

## Limitations

- This is a very quick & run sample app, where the main focus is NOT on well organized/optimized/up-to-date code, but in the configuration part (as you will notice by looking at the json config files -for blocks and for api-)
- Some errors may arise as you use the app, due has not been fully tested. Also no Tests had been created to ensure proper quality of the code.
- No validations are set in place for the blocks & its contents, so you can drop fields where is not expected you do that. Extra effort is required to accomplish that.
- Although the react app performs well (is fast), the inner savings of data in the blocks, need some adjustments to avoid saving the whole json definition, but only the strictly needed parts
- The configured npm packages are a outdated, some extra effort is required to upgrade to later versions, including some refactor for theming (dark/light, etc.)
- API is unprotected, i.e. does not implement any authentication/authorization schema, due is just a very simple example

### Very Important Note:
Due the json configuration for the python Api only has templates for a few/the most common sections, when the python code is generated, if you used a non common section your code will be empty. To properly generate code for the sections you need/want, make sure you configure those templates. Use the [LangChain-documentation](https://langchain.readthedocs.io/en/latest/?) as guide.