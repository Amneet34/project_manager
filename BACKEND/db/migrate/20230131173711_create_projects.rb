class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :floor_plan
      t.integer :priority_level

      t.timestamps
    end
  end
end
