class User < ApplicationRecord
    has_many :tasks
    has_many :requests 
    has_many :projects, through: :tasks
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }
end
