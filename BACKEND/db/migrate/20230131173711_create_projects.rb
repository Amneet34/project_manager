class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :description
      t.string :image
      t.string :name

      t.timestamps
    end
  end
end
