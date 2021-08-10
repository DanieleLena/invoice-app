# Invoice app


This projects is from a  [Front-end Mentor](https://www.frontendmentor.io/solutions) challenge.

![Invoice app cover](https://user-images.githubusercontent.com/75173681/127357360-77ccb933-0ae3-49d8-8f1b-34731e55ce0b.png)

## Table of contents

- [Overview](#overview)
  - [Intro](#intro)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Features](#features)
  - [Useful resources](#useful-resources)

## Overview

👋 Hello, this is my first time using the MERN stack, because I always focused on the front-end using  React, but this project seemed to be perfect to practice with Express and MongoDB. 
I also decided to use Typescript with React for the frontend that added an extra level of difficulty since I am still practicing this helpful tool.

Overall, the project it's been very funny and interesting and let me with a lot of experience in many different tools.

Since I didn't use any external library to handle the few animations on the app, they are not so smooth and I am working on it! 😄

Any feedback about the app it's more than welcome!

### Intro




![Invoice app design](https://user-images.githubusercontent.com/75173681/127358312-21a49aa1-85b8-4ea1-a3e7-ae599ef99ee3.png)


### Links

- [LIVE PREVIEW](https://invoice-app-daniele.herokuapp.com/) to check my solution.


## My process

### Built with
- MongoDb
- Express
- React
- Node.js
- Typescript
- SCSS
- Hosted on Heroku
 

### Features

- I used Interface instead of Classes in several cases because The TypeScript compiler 
uses interfaces solely for type-checking purposes but neither provides implementation 
nor initialisation for them like classes.
Interface is simply a structural contract that defines what the properties of an 
object should have as a name and as a type. 


- It's possible to filter the invoices by status: "paid" , "pending" and "draft", the property
 "status" of the Invoice interface, infact can accept only these three values.

- Pressing the  'Esc' key or clicking outside a modal ,will close any open modal, I made this feature with useCallback and
useEffect

- I used a custom system to validate the "new Invoice form", with a simple validate function 
that iterate through all the input fields with a data-set of "required"(not the standard
 required attribute). The validate() return true if all the required input are filled.



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

