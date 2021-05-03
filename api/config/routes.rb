# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :v1, constraints: {format: :json} do
    get "/", to: "health_check#health_check", as: :index, only: [:get]
    get "/healthcheck", to: "health_check#health_check", as: :healthcheck, only: [:get]

    resources :items
    resources :recipes
  end
end
