Flipr Assignment-Frontend
This repository contains an application built to showcase Nobel Prize winners over the last 100 years. The app fetches data from the Nobel Prize API (link) and presents it in an organized and user-friendly manner.

Overview
The data retrieved from the Nobel Prize API includes information about prizes awarded, such as:

Year of the prize
Category
Motivation
Laureates (individuals who won the prize, with unique identifiers, first name, and surname)
The app is designed to perform the following tasks:

Fetch Prize Data from the API

Implemented a function to retrieve prize data from the provided URL.
Display Prize Winners

Showcases the prize winners in a list, presenting each prize along with the corresponding laureates. The layout and style have been customized for better readability.
Filtering Functionality

Includes a dropdown feature allowing users to filter prizes by category and year.
Year filters are set between 1900 to 2018, automatically detecting available categories through data iteration.
Special Section for Multiple-time Nobel Prize Winners

A dedicated section in the app displays information about individuals who have won the Nobel Prize more than once.
React Native Expo Application Integration

Integrated the provided JSON URL into an application built using React Native Expo, ensuring seamless access to the Nobel Prize data.
Setup and Usage
To run the application locally using Expo:

Ensure you have Expo installed globally. If not, install it via npm:

bash
Copy code
npm install -g expo-cli
Clone the repository to your local machine:

bash
Copy code
git clone <repository_url>
cd Flipr-Assignment-Frontend
Install necessary dependencies using npm install or yarn install:

bash
Copy code
npm install
Start the Expo development server:

bash
Copy code
expo start
Follow the instructions in the terminal or in the Expo DevTools in your browser to open the app on a physical device or an emulator.

Feel free to explore the code and functionalities to understand how the Nobel Prize winners' data is retrieved, displayed, and filtered within the application.

Technologies Used
React Native
Expo
JavaScript (ES6+)
Credits
This project was created as part of a Flipr assignment and is solely intended for educational and demonstration purposes.
![Screenshot 2023-12-28 082855](https://github.com/justmemohit052002/Flipr_Assignment-Frontend/assets/100300162/59ac6681-f7e3-4dd3-8e28-8ca44aec3a99)

Acknowledgments
Nobel Prize API: Nobel Prize API Documentation
