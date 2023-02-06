class Project < ApplicationRecord
    has_many :tasks
    has_many :requests 
    has_many :users, through: :tasks
    validates :image, presence: true
end
