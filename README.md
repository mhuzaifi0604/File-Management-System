# File Management System
 This application is based on the concept of uploading your files to a central database like application. Different Features for user attraction and ease have been entered
# A Few Features:<br>
* Format & Password Validation for Login Page
* Total Vendors & Uploaded Files on the File Management system
* Graph representing vendors and their uploaded files
* Vendor ratings for the file Management System
* File upload feature (an obvious one)
* Delete Feature for each file
* Limited no. of results for a single page to prevent a mess on the interface
* Search by Name feature implemented for searching through files.
# Technologies Learned & Implemented
Following are the new react-vite techmologies that i implemented in this project. If I may, these have made my programming of this application easier by 90%.<br>
* Outlets in Routers<br>
*     Login page is the root page.
*     All other i.e., dashboard & file manager are sub routes or childs of root page implemented using outlets.
* React DropZone
*     React dropzone is you can say the easy way out for upload feature i.e., upload from your computer.
* React Pagination
*     If you do not want to create a mess on your site, then it is only sensible to arrange data on multiple pages.
*     I implemented the pagination feature for uploaded files i.e., only 8 items on single page.
# Lets have a look at the Site itself.

!st of all lets have a look at the login page for the application. For the login page i have implemented following checks:
* If there is an '@' missing in the email address then the form will not get submit and will ask the user for the correct email address format. similar will be the case for the '.' in the email address for TDLs.
* For password, there must be atleast 8 characters plus all 8 characters cannot be spaces.
* And last but not the least input fields cannot be left unfilled.
<img src="./pics/Screenshot_1.png" alt="gui"><br>
<br>Next, after clicking sign in, we get traversed to the dashboard of the application. This is the application dashboard interface.<br>
Following are the features implemented in dashboard.
* Flipable pictures for total vendors and their uploaded files.
* Graph representing the uploaded files corresponding their vendors.
* Add Vendor feature for the uploading of new files and vendors.
* All vendors and their ratings for the application<br>
<img src="./pics/Screenshot_2.png" alt="gui"><br>
<br> Now you can click on pics to check the total vendors and their file and you can click on view rating button to see the rating of corresponding vendors.<br><br>
<img src="./pics/Screenshot_3.png" alt="gui"><br>
<br> Below you can see that i am about to add a vendor named NUST with files  equals 20.<br><br>
<img src="./pics/Screenshot_4.png" alt="gui"><br>
<br> And you can see that a list element for NUST has been added, we can see its rating too. Also the total vendors and files have also been updated.<br><br>
<img src="./pics/Screenshot_5.png" alt="gui"><br>
<br>Now, let us take a look at the File Manager Page.<br><br>
<img src="./pics/Screenshot_6.png" alt="gui"><br>
<br> Just click Upload files button and this is the result.<br><br>
<img src="./pics/Screenshot_7.png" alt="gui"><br>
<br>I uploaded some 16 pics and you can see the uploaded filenames, their upload date and a delete button against each file list item.<br>
Also, the total files have also been divided in to 2 pages i.e., result of pagination.<br>
This is 1st Page<br><br>
<img src="./pics/Screenshot_8.png" alt="gui"><br>
<br> This is 2nd page.<br><br>
<img src="./pics/Screenshot_9.png" alt="gui"><br>
<br> Now, if i want to search files based on their names, just type in search bar as follows:<br><br>
<img src="./pics/Screenshot_10.png" alt="gui"><br>