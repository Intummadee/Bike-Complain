# Mobile Application Motorcycle
 อินทุมดี It kmitl


คำสั่ง Install ทั้งหมด
```
npx create-expo-app MobileProject 
cd MobileProject 
npx expo install react-native-web@~0.18.10 react-dom@18.2.0 @expo/webpack-config@^18.0.1
npm install --save redux react-redux
npm install react-native-element-dropdown --save
npm install react-native-tab-view
npm install react-native-pager-view
npm install firebase

npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install --save @react-navigation/bottom-tabs
npm install @react-navigation/drawer
npm install react-native-gesture-handler 
npm install react-native-reanimated

npm install react-native-reanimated@2.17.0 
npm install react-native-safe-area-context@4.7.1  
npm install react-native-screens@3.24.0  
npm install react-navigation-header-buttons
npx expo install @react-native-community/datetimepicker
npm install moment --save


แก้ไขในไฟล์ babel.config.js ให้เพิ่มคำว่า plugins: ['@babel/plugin-proposal-export-namespace-from','react-native-reanimated/plugin',],


คำสั่ง start เริ่ม : npx expo start --reset-cache

npx expo install --fix (ถ้ามีขึ้น หลังจากที่ใช้คำสั่ง startไปแล้ว ก็ให้ ctrl + c ออกใช้คำสั่งนี้)```
