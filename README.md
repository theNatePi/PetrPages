# PetrPages
Welcome, to your home on the internet.

#### What is PetrPages
In our modern era of the web, most social functionality has been consolidated into a few major sites. Text on X, images on Instagram, video on YouTube.
PetrPages beings a new approach to your social expression online -- a single platform where you can define your own style, content, and personality.
Each user gets their own page to customize with text and images, and more formats can be supported soon.

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
