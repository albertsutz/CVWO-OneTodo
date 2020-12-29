class RenameDecriptionToDescription < ActiveRecord::Migration[6.1]
  def change
    rename_column :tasks, :decription, :description
  end
end
