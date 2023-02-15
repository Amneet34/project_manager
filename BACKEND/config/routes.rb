Rails.application.routes.draw do
  resources :users
  resources :requests
  resources :tasks
  resources :projects
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
   root to: 'users#index'
  get '/me', to: 'users#me'
  get '/users', to: 'users#index'
  post '/login', to: 'users#login'
  post '/signup', to: 'users#create'
  get '/users/:id', to: 'users#show'
end
