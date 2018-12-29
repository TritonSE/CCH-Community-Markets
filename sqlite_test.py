import sqlite3
# Creates connection to local database (creates one if not already created).
connection = sqlite3.connect('test_db.db')

# Allows for row keys to be gotten.
connection.row_factory = sqlite3.Row

# Cursor allows for actions to be applied to database.
cursor = connection.cursor()

"""
This line only needs to be run once to create the table in the db file.
When creating the index for the database, must use INTEGER PRIMARY KEY exactly,
otherwise it will struggle.
"""
# cursor.execute('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)')


"""
Adds the second parameter of execute to the table by replacing the (?, ?),
but this line can only be executed once. When insertion is this specific, giving
both an INTEGER PRIMARY KEY and value, then it will fail if the INTEGER PRIMARY
KEY is already existing in the table.
"""
# cursor.execute('INSERT INTO test VALUES(?, ?)', (0, 'Declan'))


"""
To avoid the issue of needing to increment the INTEGER PRIMARY KEY each time,
you can structure a line like this to add only to the name column in this case,
but will increment the INTEGER PRIMARY KEY by itself, so that the error does not 
occur.

This line can be run as many times as wanted.
"""
cursor.execute('INSERT INTO test(name) VALUES(?)', ('Jason', ))


"""
You can also revert changes made if wanted using rollback. This undoes the most
recent change.

The following lines add Kevin to the database, remove the addition, then only
adds Hannah.
"""
cursor.execute('INSERT INTO test VALUES(?, ?)', (10, 'Kevin'))
connection.rollback()
# cursor.execute('INSERT INTO test VALUES(?, ?)', (11, 'Hannah'))

"""
SQL requests can also be done using sqlite3
"""
cursor.execute('SELECT * FROM test WHERE id=?', (1,)) # Provides a search query.
row = cursor.fetchone() # Gets the next row that was searched for (kind of like .nextLine())
id = row[0] # Gets the first index of the given row, which is the ID.
name = row[1] # Gets the value of the index containing the name.
print(id, name)
print(row.keys()) # This works because of the row_factory line at the top.
# Because the above works, the below works too:
id = row['id']
name = row['name']
print(id, name)


"""
A while loop can be used to get all of the data out one row at a time, similar
to how an iterator would work in Java. OR you can use cursor.fetchall(), which
puts every row into a list, and then allows for that list to be iterated through
to work with each row.
"""



""" This line is required to save changes made to the database. """
connection.commit()


""" This link can be used to view sqlite databases. """
# http://inloop.github.io/sqlite-viewer/

# Awesome video: https://www.youtube.com/watch?v=SQj17D1Q_6s