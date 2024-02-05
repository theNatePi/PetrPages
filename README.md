# PetrPages
Welcome, to your home on the internet.

##### Disclaimer
This project was built for the [IrvineHacks](https://irvinehacks.com/) 2024 hackathon and was built in 48 hours

#### What is PetrPages
In our modern era of the web, most social functionality has been consolidated into a few major sites. Text on X, images on Instagram, video on YouTube.
PetrPages beings a new approach to your social expression online -- a single platform where you can define your own style, content, and personality.

Each user gets their own page to customize with text and images, and more formats can be supported soon. No posts, no feed, no followers. Just you and what you want to put out there -- all on your PetrPage.

#### Technologies Used
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> Python and FastAPI for backend

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> React and Chakra UI for frontend

<img src="https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg" alt="sqlite" width="40" height="40"/> SQLite3 for database queries in Python

#### Images
![image](https://github.com/theNatePi/PetrPages/assets/78774649/bcc271bf-d2ea-4963-9654-edb77dea7f77)
![image](https://github.com/theNatePi/PetrPages/assets/78774649/847918e4-d04e-4e19-931a-ca78f0d94b3b)


#### How to run
##### Install dependencies
###### Backend
```
pip install fastapi
pip install uvicorn
pip install pydantic
```

###### Frontend
```
npm install lodash
yarn add @editorjs/header
npm i @editorjs/editorjs --save
yarn add @editorjs/simple-image
yarn add @editorjs/list
yarn add @editorjs/raw
yarn add @editorjs/paragraph
```

##### Run backend
`uvicorn endpoints:app --reload`

##### Run frontend
`npm start`
