class CreateRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :requests do |t|
      t.string :name
      t.text :content 
      t.boolean :accepted, default: false
      t.timestamps
    end
  end
end
