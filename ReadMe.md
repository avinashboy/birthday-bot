# Timer


### Important notes
- if you enable two factor authentication just go to the <a href="https://accounts.google.com/signin/v2/challenge/pwd?continue=https%3A%2F%2Fmyaccount.google.com%2Fapppasswords&service=accountsettings&osid=1&rart=ANgoxceliHH3i_yNpwxnNB7Ssvy8wRprr4l6VYxYl77f123oW1xGZMWIvqLUE8VZufTeofV_pfb4kZzinEu37maKdDx4hzl-DQ&TL=AM3QAYYePb_smzztW-pnHuNmNY59Qx4wEO6qehioGMNtHUPW-Vr0qGHaLoOldIsv&flowName=GlifWebSignIn&cid=1&flowEntry=ServiceLogin">Google app password</a>. 

### Feature
- In admin page you should login first in return it will give json web token (JWT).With this token create, read and delete. 
- Every month of the first day you will be receiving a mail (At 07:30 AM on day-of-month 1) with your friend's birthday list.


### tech stack
- HTML, CSS and JS - frontend.
- NODE JS - backend.
- MONGO DB - database.

#### PROCEDURE:
- Download the zip folder from Github and unzip it
Here is the link to download zip 👉
<a href='https://github.com/avinashboy/timer'>HERE</a>
- create an account in <a href="https://www.mongodb.com/try">Mongodb Atlas</a> and create clusters.
- after create clusters click collect and choose **connect your application** copy the db url
- This your db url `mongodb+srv://<Name>:<password>@cluster0.qsj4t.mongodb.net/<Dbname>?retryWrites=true&w=majority`
- create file in the this dir  *cd timer/ && makdir .evn* .
- In .evn file you have type 7 fields check env-txt file
- Open the folder in VS Code
- RUN <code>npm install</code> , this command pulls out all the require node modules
- RUN <code>npm start</code>, this command will start your server in localhost <a href="http://localhost:3333">http://localhost:3333</a>

## Screenshots:
*./ui/view page/index*
### view page
![view page](/screenshot/1.png)

### admin page
*./ui/admin/index*
![admin page](/screenshot/2.png)


---

#### This is project collaboration with <a href="https://github.com/NarutoNaresh">NarutoNaresh</a>
