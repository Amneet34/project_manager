class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :description
      t.string :priority_level
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
