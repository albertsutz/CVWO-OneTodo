# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


categories = Category.create([
    {
        name: "School"
    },
    {
        name: "Personal"
    },
    {
        name: "Misc"
    }
])

tasks = Task.create([
    {
        title: "CVWO",
        description: "Make a good todo-list project",
        category: categories.first,
    },
    {
        title: "RC4 eportal",
        description: "Learn how to use the calendar thingy",
        category: categories.first,
    }
])