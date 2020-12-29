class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :decription
      t.date :deadline
      t.belongs_to :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
