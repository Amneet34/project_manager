class Project < ApplicationRecord
    include ImageProcessing::MiniMagick
    has_many :tasks
    has_many :requests 
    has_many :users, through: :tasks
    has_one_attached :image
end
