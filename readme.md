# Squad Hackathon 2015

### Getting started

#### Django setup

 - Download and install Python 3 from python.org
 - Use pip to install the dependencies (`pip install -r requirements.txt`)
 - Clone this repo.
 - Test that it works (`python manage.py runserver`)

#### Database setup

 - Migrate the database (`python manage.py migrate`)
 - Load existing data (`python manage.py loaddata data.json`)
 - Navigate to http://127.0.0.1:8000/admin
 - Login as admin (user/pass: admin)


#### Inspiration

Coming into this event, we didn't know a whole lot about personal finance. We were essentially builing a project for students like ourselves. We intially thought about ways that we enjoy learning and how we could incorporate them into this project.

#### What it does

Future First provides helpful insight for people who are just starting to learn about personal finance. The main tools for providing insight are various calculators that students can use to see what types of loans they can afford, what return they will get for investments, and the return on IRAs or 401(k)s.

#### How We Built it

We built this using mostly JavaScript. We used Knockout.js for two-way data binding for updating models based on data changes on the page and used Morris.js for a graphing library. The system runs on a simple Python server.

#### Challenges We Ran Into

We weren't sure what to build initially. We were trying to think of what tools students would be most likely to use to learn. We knew that we couldn't expect to just be able to put static text on a page for them to read. Instead, we wanted to create an interactive web application that students could use more than once.

Another issue we ran into was correctly implementing the complex formulas used for financial calculations. Specifically, we struggled with calculating the time it would take to pay back a loan at a certain rate due to the complexity of the equation. We eventually figured out how to correctly implement the equations after many attempts.

#### Accomplishments that We're Proud of

A major accomplishment we are proud of is the incorporation of the complex financial equations with live-updating graphs. These were very complicated to get working correctly, especially graphs that featured multiple lines for different periods of time.

#### What we Learned

We learned a lot about using Knockout.js to create responsive web applications. Coming into the competition, only one member of our team had experience with Knockout. Now, each team member feels confident using Knockout.

We also learned how difficult product development can be. It is easy to try to add too many features to a project, and it can be even more difficult to decide on the correct project in the first place. It is especially hard to create a product that people want to use and will benefit from using.
